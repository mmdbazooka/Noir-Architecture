import Link from "next/link";
export default function ConceptPage() {
  return (
    <main
      id="main"
      className={`
      concept-page max-w-[850px] py-[80px] px-[25px] m-auto min-h-[100vh] [&_.eyebrow]:mt-[100px]
      [&_h1]:text-[length:clamp(40px,_7vw,_74px)] [&_h1]:leading-[1.05] [&_h1]:mb-[40px]
      [&>p:not(.eyebrow)]:text-[16px] [&>p:not(.eyebrow)]:text-[var(--muted)] [&>p:not(.eyebrow)]:mb-[25px]
      [&_.button]:mt-[30px]
    `}
    >
      <Link
        href="/"
        className={`
        text-link inline-flex items-center gap-[10px] text-[12px] py-[5px] px-0 [border-bottom:1px_solid_var(--line)]
        bg-[transparent] [transition:gap_0.2s] [&:hover]:gap-[16px]
      `}
      >
        ← Back to NOIR
      </Link>
      <p
        className={`
        eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
        text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
        [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
        [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
      `}
      >
        CONCEPT / SELF-INITIATED PROJECT
      </p>
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
      <Link
        href="/"
        className={`
        button min-h-[49px] py-[15px] px-[22px] inline-flex items-center justify-center gap-[25px] text-[12px]
        font-semibold tracking-[0.015em] [border:1px_solid_var(--line)] bg-[transparent]
        [transition:background_0.2s,_transform_0.2s,_border-color_0.2s] whitespace-nowrap
        [&:hover]:[transform:translateY(-2px)] [&:hover]:[border-color:var(--text)] [&.primary]:bg-[var(--accent)]
        [&.primary]:text-[var(--bg)] [&.primary]:[border-color:var(--accent)]
        [&.primary:hover]:bg-[color-mix(in_srgb,_var(--accent)_82%,_white)]
        [&.primary:hover]:[border-color:transparent] [&.light]:bg-[var(--text)] [&.light]:text-[var(--bg)]
        [&.ghost:hover]:bg-[rgba(255,_255,_255,_0.05)] [@media(max-width:_760px)]:text-[11px]
        [@media(max-width:_760px)]:py-[14px] [@media(max-width:_760px)]:px-[18px] [@media(max-width:_760px)]:gap-[20px]
        primary
      `}
      >
        Explore the concept ↗
      </Link>
    </main>
  );
}
