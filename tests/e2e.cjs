// Browser checks for the demo. Run with the site served on BASE (default http://localhost:3100):
//   node tests/e2e.cjs [screenshotDir]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = process.argv[2] || path.join(__dirname, "..", "screenshots");
const PAGES = ["/", "/diensten", "/over-karin", "/tarieven", "/contact", "/handige-links", "/bestaat-niet"];
const WIDTHS = [375, 768, 1280, 1440];
fs.mkdirSync(OUT, { recursive: true });

const results = [];
// The sticky header covers elements Playwright scrolls to the very top, so centre them first.
const tap = async (loc) => {
  await loc.evaluate((e) => e.scrollIntoView({ block: "center" }));
  await loc.page().waitForTimeout(1100); // let the entrance transition finish
  await loc.click();
};
const ok = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += Math.round(window.innerHeight * 0.6)) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(400);
}

(async () => {
  const browser = await chromium.launch();
  // Smooth scrolling makes Playwright wait for "stable" elements; turn it off for interaction tests.
  const origNewPage = browser.newPage.bind(browser);
  browser.newPage = async (opts) => {
    const pg = await origNewPage(opts);
    await pg.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        const st = document.createElement("style");
        st.textContent = "html{scroll-behavior:auto!important}";
        document.head.appendChild(st);
      });
    });
    return pg;
  };

  // 1. Every page at every width: console errors, overflow, images, screenshot
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && !(p === "/bestaat-niet" && /404/.test(m.text())) && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(String(e)));
      const resp = await page.goto(BASE + p, { waitUntil: "networkidle" });
      await scrollThrough(page);
      const m = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
        h1: document.querySelectorAll("h1").length,
        hidden: [...document.querySelectorAll("[data-reveal]")].filter((e) => !e.classList.contains("is-in")).length,
      }));
      const tag = `${p} @${w}`;
      const expected = p === "/bestaat-niet" ? 404 : 200;
      ok(`${tag} status ${expected}`, resp.status() === expected, String(resp.status()));
      ok(`${tag} no console errors`, errors.length === 0, errors.slice(0, 2).join(" | "));
      ok(`${tag} no horizontal overflow`, m.overflow <= 0, `${m.overflow}px`);
      ok(`${tag} images loaded`, m.broken.length === 0, m.broken.join(", "));
      ok(`${tag} exactly one h1`, m.h1 === 1, String(m.h1));
      ok(`${tag} all reveals shown after scroll`, m.hidden === 0, `${m.hidden} hidden`);
      const name = (p === "/" ? "home" : p.slice(1)) + `-${w}.png`;
      await page.screenshot({ path: path.join(OUT, name), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }

  // 2. Internal links all resolve
  {
    const page = await browser.newPage();
    const hrefs = new Set();
    for (const p of PAGES.slice(0, 6)) {
      await page.goto(BASE + p);
      (await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")))).forEach((h) => hrefs.add(h));
    }
    const internal = [...hrefs].filter((h) => h.startsWith("/"));
    for (const h of internal) {
      const r = await page.request.get(BASE + h.split("#")[0]);
      ok(`link ${h}`, r.status() === 200, String(r.status()));
    }
    const tel = [...hrefs].filter((h) => h.startsWith("tel:"));
    const mail = [...hrefs].filter((h) => h.startsWith("mailto:"));
    ok("tel links use +31634487426", tel.length > 0 && tel.every((h) => h === "tel:+31634487426"), tel.join(","));
    ok("mailto links use Info@kouwenhoven-admin.nl", mail.length > 0 && mail.every((h) => h === "mailto:Info@kouwenhoven-admin.nl"), mail.join(","));
    ok("no dead # links", ![...hrefs].some((h) => h === "#" || h === ""), "");
    await page.close();
  }

  // 3. Desktop navigation + header CTA
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + "/");
    await page.getByRole("navigation", { name: "Hoofdmenu" }).getByRole("link", { name: "Tarieven" }).click();
    await page.waitForURL("**/tarieven");
    ok("desktop nav goes to /tarieven", page.url().endsWith("/tarieven"));
    ok("aria-current on active link", (await page.locator('.nav-links a[aria-current="page"]').textContent()) === "Tarieven");
    await page.getByRole("navigation", { name: "Hoofdmenu" }).getByRole("link", { name: "Plan een kennismaking" }).click();
    await page.waitForURL("**/contact#formulier");
    ok("header CTA goes to contact form", page.url().includes("/contact#formulier"));
    await page.close();
  }

  // 4. Mobile menu: open, keyboard close, navigate
  {
    const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
    await page.goto(BASE + "/");
    const toggle = page.locator(".menu-toggle");
    await toggle.click();
    await page.waitForSelector("#mobiel-menu");
    ok("mobile menu opens", await page.locator("#mobiel-menu").isVisible());
    ok("menu toggle aria-expanded=true", (await toggle.getAttribute("aria-expanded")) === "true");
    await page.screenshot({ path: path.join(OUT, "mobile-menu-375.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    ok("Escape closes menu", (await page.locator("#mobiel-menu").count()) === 0);
    await toggle.click();
    await page.locator("#mobiel-menu").getByRole("link", { name: "Over Karin" }).click();
    await page.waitForURL("**/over-karin");
    await page.waitForTimeout(500);
    ok("mobile menu navigates and closes", page.url().endsWith("/over-karin") && (await page.locator("#mobiel-menu").count()) === 0);
    await page.close();
  }

  // 5. FAQ accordion
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + "/");
    const qs = page.locator(".faq__q");
    ok("first FAQ open on load", (await qs.nth(0).getAttribute("aria-expanded")) === "true");
    await tap(qs.nth(2));
    ok("clicking FAQ 3 opens it", (await qs.nth(2).getAttribute("aria-expanded")) === "true");
    ok("only one FAQ open", (await qs.nth(0).getAttribute("aria-expanded")) === "false");
    await qs.nth(2).focus();
    await page.keyboard.press("Enter");
    ok("FAQ toggles with keyboard", (await qs.nth(2).getAttribute("aria-expanded")) === "false");
    await page.close();
  }

  // 6. The live thing: intake receipt feeds the contact form
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + "/tarieven");
    // a visitor taps the chip (the label), as on a phone
    await tap(page.locator(".intake label.chip", { hasText: "Zzp'er" }));
    await tap(page.locator(".intake label.chip", { hasText: "In een map" }));
    await tap(page.locator(".intake label.chip", { hasText: "Btw-aangifte" }));
    ok("chip toggles its input", await page.locator('.intake input[value="btw"]').isChecked());
    const receipt = await page.locator(".receipt").innerText();
    ok("receipt shows choices", /Zzp'er/.test(receipt) && /In een map/.test(receipt) && /Btw-aangifte/.test(receipt));
    ok("receipt explains map = extra work", /digitaliseren/.test(receipt));
    ok("receipt has no invented price", !/€|\d+,\d{2}/.test(receipt));
    await page.locator(".receipt").scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(OUT, "intake-1280.png") });
    await tap(page.locator(".receipt a"));
    await page.waitForTimeout(600);
    const chosen = await page.locator(".form__chosen").innerText();
    ok("form shows the receipt choices", /Btw-aangifte/.test(chosen), chosen);
    await page.close();
  }

  // 7. Contact form: validation + honest mailto fallback
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 1000 } });
    await page.goto(BASE + "/contact");
    await tap(page.getByRole("button", { name: "Stel je vraag" }));
    const errs = await page.locator(".form__error").count();
    ok("empty submit shows 4 errors", errs === 4, String(errs));
    ok("focus moves to first invalid field", await page.evaluate(() => document.activeElement?.getAttribute("name") === "naam"));
    ok("aria-invalid set", (await page.locator('[name="naam"]').getAttribute("aria-invalid")) === "true");
    await page.fill('[name="naam"]', "Test Persoon");
    await page.fill('[name="email"]', "geen-email");
    await page.fill('[name="vraag"]', "Ik wil graag kennismaken.");
    await page.locator('[name="toestemming"]').evaluate((e) => e.scrollIntoView({ block: "center" }));
    await page.check('[name="toestemming"]');
    await tap(page.getByRole("button", { name: "Stel je vraag" }));
    ok("invalid email is caught", /niet te kloppen/.test(await page.locator(".form__error").first().innerText()));
    await page.fill('[name="email"]', "test@example.com");
    await tap(page.getByRole("button", { name: "Stel je vraag" }));
    await page.waitForTimeout(500);
    const status = await page.locator(".form__status").innerText().catch(() => "");
    ok("valid submit shows honest mail-program message", /e-mailprogramma/.test(status) && !/verzonden|ontvangen/i.test(status), status.slice(0, 80));
    ok("no fake success text", !/(bedankt.*ontvangen|succesvol verzonden)/i.test(await page.content()));
    const fields = await page.$$eval("input, textarea", (els) => els.map((e) => e.name));
    ok("form asks no BSN/IBAN", !fields.some((n) => /bsn|iban|bank/i.test(n)), fields.join(","));
    await page.screenshot({ path: path.join(OUT, "contact-form-768.png"), fullPage: false });
    await page.close();
  }

  // 8. Werkwijze: scroll story advances, buttons work
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + "/");
    const sec = page.locator("#werkwijze");
    const top = await sec.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
    const hgt = await sec.evaluate((e) => e.offsetHeight);
    const pressed = async () => page.locator('.werkwijze__names button[aria-pressed="true"]').innerText();
    await page.evaluate((y) => window.scrollTo(0, y), top + 10);
    await page.waitForTimeout(600);
    const s0 = await pressed();
    await page.evaluate((y) => window.scrollTo(0, y), top + (hgt - 900) * 0.9);
    await page.waitForTimeout(1200);
    const s3 = await pressed();
    ok("scrolling advances the steps", s0.includes("Kennismaken") && s3.includes("Rust en inzicht"), `${s0} → ${s3}`);
    await page.screenshot({ path: path.join(OUT, "werkwijze-step4-1440.png") });
    const page2 = await browser.newPage({ viewport: { width: 375, height: 800 } });
    await page2.goto(BASE + "/");
    await tap(page2.locator(".werkwijze__names button").nth(2));
    ok("tapping a step on mobile selects it", (await page2.locator(".werkwijze__names button").nth(2).getAttribute("aria-pressed")) === "true");
    await page2.close();
    await page.close();
  }

  // 9. Reduced motion: content visible, hero papers rest in final state
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE + "/");
    await page.waitForTimeout(300);
    ok("reduced motion: werkwijze not pinned", (await page.locator(".werkwijze--scroll").count()) === 0);
    ok("reduced motion: hero visible", await page.locator(".hero__title").isVisible());
    await ctx.close();
  }

  // 10. Keyboard: skip link and visible focus
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + "/");
    await page.keyboard.press("Tab");
    ok("first Tab focuses skip link", (await page.evaluate(() => document.activeElement?.textContent)) === "Naar de inhoud");
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    ok("focus is visible", outline !== "none", outline);
    await page.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})();
