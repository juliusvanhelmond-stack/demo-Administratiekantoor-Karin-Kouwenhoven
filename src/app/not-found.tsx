import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-intro">
      <h1>Deze pagina bestaat niet</h1>
      <div>
        <p className="lead">Misschien is hij verplaatst. Je kunt verder via de homepage of direct contact opnemen.</p>
        <p style={{ marginTop: 24, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/" className="btn">
            Naar de homepage
          </Link>
          <Link href="/contact" className="link">
            Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
