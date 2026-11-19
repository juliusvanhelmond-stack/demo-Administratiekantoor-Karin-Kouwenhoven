"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { business, nav } from "@/content/site";
import { Mark } from "./Mark";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label={`${business.name}, naar de homepage`}>
      <Mark className="h-9 w-10" color="var(--green)" bar="var(--ink)" strokeWidth={10} />
      <span>
        <span className="wordmark__name">Karin Kouwenhoven</span>
        <span className="wordmark__sub">Administratiekantoor</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__bar">
        <Wordmark />
        <nav aria-label="Hoofdmenu">
          <ul className="nav-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact#formulier" className="btn btn--small">
                Plan een kennismaking
              </Link>
            </li>
          </ul>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Sluiten" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobiel-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobiel menu">
              <ul>
                {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                      <span className="tri" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/contact#formulier" className="btn">
              Plan een kennismaking
            </Link>
            <div className="mobile-menu__contact">
              <a className="link" href={business.phoneHref}>
                {business.phoneDisplay}
              </a>
              <a className="link" href={business.emailHref}>
                {business.email}
              </a>
              <span className="small" style={{ color: "var(--on-ink-muted)" }}>
                {business.visitNote}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
