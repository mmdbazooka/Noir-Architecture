import Link from "next/link";
export default function ConceptPage() {
  return (
    <main id="main" className="concept-page">
      <Link href="/" className="text-link">
        ← Back to NOIR
      </Link>
      <p className="eyebrow">CONCEPT / SELF-INITIATED PROJECT</p>
      <h1>
        A design exploration.
        <br />
        Made to be explored.
      </h1>
      <p>
        NOIR / Spatial Atelier is a fictional portfolio concept. Names,
        specifications, prices, customer brands, metrics and product claims are
        illustrative. This is not a live commercial service.
      </p>
      <p>
        Forms validate locally in your browser and never transmit or store your
        personal data. There is no authentication, purchase, financial
        transaction or AI API integration. Product and architectural imagery is
        original AI-generated concept artwork; physical designs are
        illustrative.
      </p>
      <Link href="/" className="button primary">
        Explore the concept ↗
      </Link>
    </main>
  );
}
