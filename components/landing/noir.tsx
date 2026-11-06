"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import {
  SiteHeader,
  ScrollEffects,
  Arrow,
  ContactModal,
  Dialog,
  Footer,
} from "@/components/ui/shared";
import { projects, type Project } from "@/data/projects";

function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / 1100, 1);
            el.textContent = String(
              Math.round(value * (1 - Math.pow(1 - t, 3))),
            ).padStart(2, "0");
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{String(value).padStart(2, "0")}</span>;
}
function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <article
      className={`
      project [&:where(.project-0)]:col-span-full [&:where(.project-0)_.project-image]:aspect-[2.05]
      [&:where(.project-1)_.project-image]:aspect-[0.86] [&:where(.project-2)]:pt-[130px]
      [&:where(.project-2)_.project-image]:aspect-[1.05] [@media(max-width:_760px)]:pt-0
      [@media(max-width:_760px)]:mb-[50px]
      [@media(max-width:_760px)]:[&:where(.project-0)_.project-image]:aspect-[1.2]
      [@media(max-width:_760px)]:[&:where(.project-1)_.project-image]:aspect-[1]
      [@media(max-width:_760px)]:[&:where(.project-2)_.project-image]:aspect-[1.2] project-${index} reveal-block`}
    >
      <button
        className={`
          project-image relative block w-full overflow-hidden bg-[#171717] text-left aspect-[1.5] [&_img]:object-cover
          [&_img]:[transition:filter_0.5s] [&:hover_.view-project]:opacity-[1]
          [&:hover_.view-project]:[transform:translate(-50%,_-50%)] [&:focus-visible_.view-project]:opacity-[1]
          [&:focus-visible_.view-project]:[transform:translate(-50%,_-50%)]
        `}
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title}`}
      >
        <Image
          src={`/assets/architecture/${project.image}`}
          alt={project.alt}
          fill
          sizes={index === 0 ? "90vw" : "(max-width: 760px) 90vw, 46vw"}
          className={`parallax-image [@media(prefers-reduced-motion:_reduce)]:[transform:none]!`}
        />
        <span
          className={`
          project-number absolute left-[23px] top-[23px] text-[9px] tracking-[0.1em] py-[8px] px-[10px] bg-[#0b0c0d77]
          [backdrop-filter:blur(5px)] [@media(max-width:_760px)]:left-[15px] [@media(max-width:_760px)]:top-[15px]
          [@media(max-width:_760px)]:text-[8px]
        `}
        >
          N° / {project.number}
        </span>
        <span
          className={`
          view-project absolute top-[50%] left-[50%] [transform:translate(-50%,_-45%)] h-[110px] w-[110px] rounded-full
          bg-[var(--text)] text-[var(--bg)] flex items-center justify-center leading-[1.35] gap-[8px] text-[10px]
          uppercase opacity-0 [transition:opacity_0.3s,_transform_0.3s]
        `}
        >
          View
          <br />
          project
          <ArrowUpRight size={23} />
        </span>
        <span
          className={`
          project-open absolute bottom-[20px] right-[20px] w-[38px] h-[38px] [border:1px_solid_#ffffff55] grid
          place-items-center bg-[#0003]
        `}
        >
          <Plus size={22} />
        </span>
      </button>
      <div
        className={`
        project-caption flex items-center justify-between gap-[20px] pt-[23px] [&_.micro]:text-[8px]
        [&_.micro]:text-[var(--muted)] [&_.micro]:leading-[1.8] [&>p]:text-right [&_h3]:text-[27px] [&_h3]:mt-[7px]
        [&_h3]:tracking-[-0.04em] [&_h3_button]:p-0 [&_h3_button]:bg-[transparent] [&_h3_button]:[font:inherit]
        [&_h3_button]:text-left [@media(max-width:_760px)]:[&_h3]:text-[23px]
        [@media(max-width:_760px)]:[&_.micro]:text-[7px] [@media(max-width:_760px)]:pt-[16px]
      `}
      >
        <div>
          <p
            className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
          >
            {project.type}
          </p>
          <h3>
            <button onClick={() => onSelect(project)}>{project.title}</button>
          </h3>
        </div>
        <p
          className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
        >
          {project.location}
          <br />
          {project.year}
        </p>
      </div>
    </article>
  );
}

export default function NoirLanding() {
  const [inquiry, setInquiry] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <>
      <ScrollEffects />
      <SiteHeader
        brand="noir"
        links={[
          { label: "STUDIO", href: "#studio" },
          { label: "SELECTED WORK", href: "#projects" },
          { label: "PHILOSOPHY", href: "#philosophy" },
        ]}
        action="START A PROJECT"
        onAction={() => setInquiry(true)}
      />
      <main id="main">
        <section
          className={`
          noir-hero relative min-h-[900px] h-[100svh] max-h-[1200px] overflow-hidden
          [@media(max-width:_1100px)]:min-h-[820px] [@media(max-width:_760px)]:h-auto
          [@media(max-width:_760px)]:min-h-[900px] [@media(max-width:_760px)]:max-h-none
        `}
        >
          <div
            className={`
            noir-hero-image absolute right-0 top-0 w-[78%] h-full [&_img]:object-cover [&_img]:[object-position:60%_center]
            [@media(max-width:_760px)]:top-[320px] [@media(max-width:_760px)]:w-full [@media(max-width:_760px)]:h-[500px]
            [@media(max-width:_760px)]:[&_img]:[object-position:65%_center]
          `}
          >
            <Image
              src="/assets/architecture/monolith.webp"
              alt="A monumental concrete residence overlooking a rugged landscape at dusk"
              fill
              priority
              sizes="(max-width:760px) 100vw, 76vw"
              className={`parallax-image [@media(prefers-reduced-motion:_reduce)]:[transform:none]!`}
            />
          </div>
          <div
            className={`
            hero-shade absolute inset-0
            bg-[image:linear-gradient(_90deg,_#0b0c0d_0%,_#0b0c0dce_19%,_#0b0c0d38_48%,_transparent_75%_),_linear-gradient(0deg,_#0b0c0d_0%,_transparent_30%,_#0b0c0d35_80%)]
            [@media(max-width:_760px)]:bg-[image:linear-gradient(_0deg,_#0b0c0d_4%,_transparent_35%,_#0b0c0d11_50%,_#0b0c0d_76%_)]
          `}
          />
          <div
            className={`
            hero-content relative z-[2] pt-[170px] px-[var(--gutter)] pb-[140px] [&_.eyebrow]:text-[9px]
            [&_.eyebrow]:tracking-[0.16em] [&_.eyebrow]:mb-[40px] [&_h1]:text-[length:clamp(95px,_10.1vw,_170px)]
            [&_h1]:leading-[0.88] [&_h1]:tracking-[-0.075em] [&_h1]:font-medium [&_h1>span]:text-[var(--accent)]
            [@media(min-width:_1700px)]:max-w-[1680px] [@media(min-width:_1700px)]:m-auto
            [@media(max-width:_1100px)]:pt-[180px] [@media(max-width:_1100px)]:[&_h1]:text-[length:12vw]
            [@media(max-width:_760px)]:pt-[125px] [@media(max-width:_760px)]:pb-[60px]
            [@media(max-width:_760px)]:[&_.eyebrow]:text-[7px] [@media(max-width:_760px)]:[&_.eyebrow]:tracking-[0.09em]
            [@media(max-width:_760px)]:[&_.eyebrow]:max-w-[280px] [@media(max-width:_760px)]:[&_.eyebrow]:gap-[8px]
            [@media(max-width:_760px)]:[&_.eyebrow]:mb-[28px] [@media(max-width:_760px)]:[&_h1]:text-[length:22vw]
            [@media(max-width:_760px)]:[&_h1]:leading-[0.88]
          `}
          >
            <p
              className={`
              eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
              text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
              [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
              [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
            `}
            >
              <span className="dot" />
              INDEPENDENT ARCHITECTURE PRACTICE — EST. 2016
            </p>
            <h1>
              SPACES
              <br />
              THAT
              <br />
              ENDURE<span>.</span>
            </h1>
            <div
              className={`
              hero-lower mt-[35px] flex items-center gap-[50px] [&>p]:text-[13px] [&>p]:text-[#c1beb7] [&>p]:leading-[1.6]
              [&_.button]:text-[9px] [&_.button]:tracking-[0.08em] [&_.button]:bg-[#0b0c0d44]
              [@media(max-width:_1100px)]:gap-[25px] [@media(max-width:_760px)]:mt-[30px] [@media(max-width:_760px)]:block
              [@media(max-width:_760px)]:[&>p]:text-[12px] [@media(max-width:_760px)]:[&_.button]:mt-[20px]
              [@media(max-width:_760px)]:[&_.button]:bg-[#0b0c0da0]
            `}
            >
              <p>
                Architecture that moves you.
                <br />
                Places that stay with you.
              </p>
              <a
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
                ghost
              `}
                href="#projects"
              >
                EXPLORE OUR WORK
                <Arrow />
              </a>
            </div>
          </div>
          <span
            className={`
            hero-coordinate absolute right-[24px] top-[40%] [writing-mode:vertical-rl] text-[8px] text-[#c3beb5]
            [@media(max-width:_760px)]:top-[auto] [@media(max-width:_760px)]:bottom-[160px]
            [@media(max-width:_760px)]:right-[15px] [@media(max-width:_760px)]:text-[7px] micro font-medium
            tracking-[0.15em] uppercase leading-[1.6]
          `}
          >
            33°55′31.0″S 18°25′26.0″E / A STUDY IN STILLNESS
          </span>
          <div
            className={`
            noir-hero-bottom absolute bottom-0 left-[var(--gutter)] right-[var(--gutter)] flex items-center justify-between
            [border-top:1px_solid_var(--line)] h-[95px] z-[3] [&>p]:ml-auto [&>p]:mr-[40px] [&>p]:text-[9px]
            [&>p]:leading-[1.9] [&>p_span]:block [&>p_span]:text-[var(--muted)] [&>p_span]:text-[8px]
            [@media(min-width:_1700px)]:max-w-[1504px] [@media(min-width:_1700px)]:m-auto
            [@media(max-width:_760px)]:h-[77px] [@media(max-width:_760px)]:[&>p]:text-[7px]
            [@media(max-width:_760px)]:[&>p]:mr-0 [@media(max-width:_760px)]:[&>p]:text-right
            [@media(max-width:_760px)]:[&>p_span]:text-[6px]
          `}
          >
            <a
              href="#studio"
              className={`
              scroll-note flex items-center gap-[15px] text-[9px] [&_svg]:text-[var(--accent)]
              [@media(max-width:_760px)]:text-[7px] [@media(max-width:_760px)]:gap-[8px] micro font-medium tracking-[0.15em]
              uppercase leading-[1.6]
            `}
            >
              <ArrowDown size={16} />
              SCROLL TO DISCOVER
            </a>
            <p
              className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
            >
              <span>FEATURED CONCEPT / 001</span>THE MONOLITH RESIDENCE
            </p>
            <a
              href="#projects"
              className={`
                circle-arrow grid place-items-center w-[40px] h-[40px] [border:1px_solid_var(--line)] rounded-full
                [@media(max-width:_760px)]:hidden
              `}
              aria-label="Explore selected projects"
            >
              <Arrow size={20} />
            </a>
          </div>
        </section>
        <section
          id="studio"
          className={`
          section py-[110px] px-[var(--gutter)] max-w-[1680px] m-auto statement grid [grid-template-columns:1fr_3fr]
          gap-[50px] pt-[140px] pb-[140px] [border-bottom:1px_solid_var(--line)]
          [&_h2]:text-[length:clamp(35px,_4.8vw,_76px)] [&_h2]:leading-[1.18] [&_h2]:tracking-[-0.045em]
          [&_h2_span]:text-[#6c6e6e] [@media(max-width:_1100px)]:[grid-template-columns:1fr_3.5fr]
          [@media(max-width:_1100px)]:gap-[25px] [@media(max-width:_760px)]:block [@media(max-width:_760px)]:pt-[65px]
          [@media(max-width:_760px)]:pb-[65px] [@media(max-width:_760px)]:[&_h2]:text-[length:8.5vw]
          [@media(max-width:_760px)]:[&_h2]:leading-[1.22]
        `}
        >
          <p
            className={`
            eyebrow font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px] text-[var(--muted)]
            mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block [&_.dot]:bg-[var(--accent)]
            [&_.dot]:rounded-full [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
            section-index mt-[10px] text-[9px] [@media(max-width:_760px)]:mb-[30px]
          `}
          >
            01 / THE ATELIER
          </p>
          <div>
            <h2 className="reveal-block">
              We design the space
              <br />
              between what exists
              <br />
              and <span>what is possible.</span>
            </h2>
            <div
              className={`
              statement-bottom mt-[50px] flex justify-between items-end gap-[40px] [&>p]:max-w-[410px]
              [&>p]:text-[var(--muted)] [&>p]:text-[13px] [&_.text-link]:text-[9px] [&_.text-link]:tracking-[0.07em]
              [&_.text-link]:whitespace-nowrap [@media(max-width:_1100px)]:block
              [@media(max-width:_1100px)]:[&_.text-link]:mt-[25px] [@media(max-width:_760px)]:mt-[28px]
              [@media(max-width:_760px)]:[&>p]:text-[12px] [@media(max-width:_760px)]:[&_.text-link]:text-[8px]
            `}
            >
              <p>
                We are an independent spatial atelier. Our work begins with
                listening — to a landscape, to a material, to the way you want
                to live. What follows is architecture with a reason to exist.
              </p>
              <a
                className={`
                text-link inline-flex items-center gap-[10px] text-[12px] py-[5px] px-0 [border-bottom:1px_solid_var(--line)]
                bg-[transparent] [transition:gap_0.2s] [&:hover]:gap-[16px]
              `}
                href="#philosophy"
              >
                MEET OUR WAY OF THINKING
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section
          id="projects"
          className={`
          section py-[110px] px-[var(--gutter)] max-w-[1680px] m-auto selected-work pt-[125px] pb-[130px]
          [&_.section-head]:mb-[65px] [&_.section-head_h2]:text-[60px] [&_.section-head>p]:text-[12px]
          [@media(max-width:_760px)]:[&_.section-head_h2]:text-[42px]
          [@media(max-width:_760px)]:[&_.section-head]:mb-[35px] [@media(max-width:_760px)]:pb-[20px]
        `}
        >
          <div
            className={`
            section-head flex items-end justify-between gap-[35px] mb-[50px] [&_h2]:text-[length:clamp(38px,_4.5vw,_68px)]
            [&_h2]:leading-[1.08] [&>p]:text-[var(--muted)] [&>p]:max-w-[340px] [&>p]:text-[14px] [&_.eyebrow]:mb-[18px]
            [@media(max-width:_1000px)]:gap-[25px] [@media(max-width:_1000px)]:[&>p]:max-w-[270px]
            [@media(max-width:_760px)]:block [@media(max-width:_760px)]:mb-[35px]
            [@media(max-width:_760px)]:[&>p]:mt-[22px] [@media(max-width:_760px)]:[&>p]:max-w-[400px]
          `}
          >
            <div>
              <p
                className={`
                eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
                text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
                [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
                [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
              `}
              >
                02 / SELECTED WORK — 2025–2026
              </p>
              <h2>A sense of place.</h2>
            </div>
            <p>
              Considered spaces. Distinct perspectives.
              <br />A selection of architectural concepts.
            </p>
          </div>
          <div
            className={`project-layout grid [grid-template-columns:1.15fr_1fr] [gap:100px_8%] [@media(max-width:_760px)]:block`}
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.number}
                project={p}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </div>
        </section>
        <section
          id="philosophy"
          className={`
          manifesto relative isolate min-h-[770px] overflow-hidden [&>img]:object-cover [&>img]:object-[center]
          [&>img]:[filter:grayscale(1)_brightness(0.45)] [&>img]:z-[-2] [@media(max-width:_760px)]:min-h-[880px]
        `}
        >
          <Image
            src="/assets/architecture/light-house.webp"
            alt="Sunlight traces a circular opening in a stone courtyard"
            fill
            sizes="100vw"
            className={`parallax-image [@media(prefers-reduced-motion:_reduce)]:[transform:none]!`}
          />
          <div
            className={`
            manifesto-shade absolute inset-0 bg-[image:linear-gradient(0deg,_#0b0c0d_0%,_#0b0c0d66_65%,_#0b0c0d33)] z-[-1]
          `}
          />
          <span
            className={`
            manifesto-outline absolute top-[35px] left-[var(--gutter)] font-[family-name:var(--font-display),_sans-serif]
            text-[length:clamp(80px,_13vw,_220px)] leading-[0.9] text-[transparent] [-webkit-text-stroke:1px_#e8e5dd1f]
            tracking-[-0.05em] z-[-1] [@media(max-width:_760px)]:text-[length:19vw] [@media(max-width:_760px)]:top-[40px]
          `}
            aria-hidden="true"
          >
            LESS, BUT
            <br />
            MEANINGFUL.
          </span>
          <div
            className={`
            manifesto-content pt-[230px] px-[var(--gutter)] pb-[70px] max-w-[1680px] m-auto
            [&>h2]:text-[length:clamp(43px,_5vw,_76px)] [&>h2]:leading-[1.1] [&>.eyebrow]:text-[9px]
            [&>.eyebrow]:text-[#cac7c1] [@media(max-width:_760px)]:pt-[180px] [@media(max-width:_760px)]:pb-[50px]
            [@media(max-width:_760px)]:[&_h2]:text-[length:10vw]
          `}
          >
            <p
              className={`
              eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
              text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
              [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
              [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
            `}
            >
              03 / OUR PHILOSOPHY
            </p>
            <h2>
              Nothing unnecessary.
              <br />
              Everything intentional.
            </h2>
            <div
              className={`
              principles mt-[65px] grid [grid-template-columns:repeat(3,_1fr)] gap-[55px]
              [&>div]:[border-top:1px_solid_#e8e5dd55] [&>div]:pt-[22px] [&>div>span]:text-[11px]
              [&>div>span]:text-[var(--accent)] [&_h3]:text-[21px] [&_h3]:mt-[14px] [&_h3]:mx-0 [&_h3]:mb-[10px]
              [&_h3]:tracking-[-0.025em] [&_p]:text-[12px] [&_p]:text-[#bcbab4] [&_p]:max-w-[270px]
              [@media(max-width:_760px)]:grid-cols-[1fr] [@media(max-width:_760px)]:gap-[30px]
              [@media(max-width:_760px)]:mt-[45px] [@media(max-width:_760px)]:[&_h3]:my-[8px]
              [@media(max-width:_760px)]:[&_h3]:mx-0 [@media(max-width:_760px)]:[&_h3]:text-[22px]
              [@media(max-width:_760px)]:[&>div>span]:text-[10px] [@media(max-width:_760px)]:[&>div]:pt-[15px]
              [@media(max-width:_760px)]:[&_p]:max-w-[310px]
            `}
            >
              {[
                {
                  n: "I",
                  title: "Listen to the landscape.",
                  text: "Every site has a story. We let it speak before we draw.",
                },
                {
                  n: "II",
                  title: "Let materials be honest.",
                  text: "Concrete, stone, light. Beautiful in their own right.",
                },
                {
                  n: "III",
                  title: "Build for the way we feel.",
                  text: "Spaces are lived in, not simply looked at.",
                },
              ].map((p) => (
                <div key={p.n}>
                  <span>{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className={`
          section py-[110px] px-[var(--gutter)] max-w-[1680px] m-auto studio-numbers pt-[90px] pb-[90px]
          [border-bottom:1px_solid_var(--line)] [&>.eyebrow]:text-[9px] [&>.concept-note]:mt-[35px]
          [&>.concept-note]:text-[9px] [@media(max-width:_760px)]:[&_.eyebrow]:text-[8px]
          [@media(max-width:_760px)]:pb-[60px]
        `}
        >
          <p
            className={`
            eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
            text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
            [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
            [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
          `}
          >
            A SMALL STUDIO. AN OPEN WORLD.
          </p>
          <div
            className={`
            number-grid grid [grid-template-columns:repeat(3,_1fr)] mt-[45px] [&>div]:[border-right:1px_solid_var(--line)]
            [&>div]:pl-[50px] [&>div:first-child]:pl-0 [&>div:last-child]:[border:0]
            [&_p]:font-[family-name:var(--font-display)] [&_p]:text-[100px] [&_p]:tracking-[-0.07em] [&_p]:leading-[1.2]
            [&_p>span+span]:text-[40px] [&_p>span+span]:text-[var(--accent)] [&_p>span+span]:[vertical-align:super]
            [&_p>span+span]:ml-[5px] [&>div>span]:text-[9px] [&>div>span]:tracking-[0.13em]
            [&>div>span]:text-[var(--muted)] [@media(max-width:_760px)]:gap-[16px]
            [@media(max-width:_760px)]:[&>div]:pl-[10px] [@media(max-width:_760px)]:[&_p]:text-[58px]
            [@media(max-width:_760px)]:[&_p>span+span]:text-[20px] [@media(max-width:_760px)]:[&_p>span+span]:ml-0
            [@media(max-width:_760px)]:[&>div>span]:text-[6px] [@media(max-width:_760px)]:[&>div>span]:tracking-[0.08em]
          `}
          >
            <div>
              <p>
                <Count value={10} />
                <span>+</span>
              </p>
              <span>YEARS OF EXPLORATION</span>
            </div>
            <div>
              <p>
                <Count value={34} />
              </p>
              <span>SPACES REIMAGINED</span>
            </div>
            <div>
              <p>
                <Count value={8} />
              </p>
              <span>COUNTRIES, ONE PERSPECTIVE</span>
            </div>
          </div>
          <p className={`concept-note text-[10px] text-[var(--muted)]`}>
            Illustrative studio story · Concept portfolio
          </p>
        </section>
        <section
          id="contact"
          className={`
          section py-[110px] px-[var(--gutter)] max-w-[1680px] m-auto noir-contact pt-[100px] pb-[100px]
          [&_h2]:text-[length:clamp(70px,_10vw,_160px)] [&_h2]:leading-[0.92] [&_h2]:relative [&_h2]:mt-[40px]
          [&_h2>span]:text-[#777a7d] [&_h2>button]:absolute [&_h2>button]:right-0 [&_h2>button]:bottom-0
          [&_h2>button]:w-[135px] [&_h2>button]:h-[135px] [&_h2>button]:rounded-full
          [&_h2>button]:[border:1px_solid_var(--line)] [&_h2>button]:bg-[transparent] [&_h2>button]:grid
          [&_h2>button]:place-items-center [&_h2>button]:[transition:background_0.3s]
          [&_h2>button:hover]:bg-[var(--accent)] [&_h2>button_svg]:w-[60px] [&_h2>button_svg]:h-[60px]
          [&_h2>button_svg]:[stroke-width:1] [@media(max-width:_1100px)]:[&_h2>button]:w-[100px]
          [@media(max-width:_1100px)]:[&_h2>button]:h-[100px] [@media(max-width:_1100px)]:[&_h2>button_svg]:w-[45px]
          [@media(max-width:_1100px)]:[&_h2>button_svg]:h-[45px] [@media(max-width:_760px)]:[&_h2]:text-[length:14.9vw]
          [@media(max-width:_760px)]:[&_h2]:leading-[0.98] [@media(max-width:_760px)]:[&_h2]:mt-[35px]
          [@media(max-width:_760px)]:[&_h2>button]:[position:static] [@media(max-width:_760px)]:[&_h2>button]:w-[60px]
          [@media(max-width:_760px)]:[&_h2>button]:h-[60px] [@media(max-width:_760px)]:[&_h2>button]:mt-[30px]
          [@media(max-width:_760px)]:[&_h2>button_svg]:w-[29px] [@media(max-width:_760px)]:[&_h2>button_svg]:h-[29px]
        `}
        >
          <div
            className={`
            contact-top flex justify-between gap-[30px] [&_.eyebrow]:text-[9px] [&>.micro]:text-[8px] [&>.micro]:flex
            [&>.micro]:items-center [&>.micro]:gap-[12px] [&_.status-dot]:bg-[var(--accent)]
            [@media(max-width:_1100px)]:block [@media(max-width:_1100px)]:[&>.micro]:mt-[8px]
            [@media(max-width:_760px)]:[&>.eyebrow]:text-[7px]
          `}
          >
            <p
              className={`
              eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
              text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
              [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
              [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
            `}
            >
              04 / EVERY GREAT SPACE STARTS WITH A CONVERSATION
            </p>
            <span
              className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
            >
              OPEN TO NEW PERSPECTIVES{" "}
              <span
                className={`
                status-dot w-[6px] h-[6px] inline-block bg-[var(--accent)] rounded-full
                [box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
              `}
              />
            </span>
          </div>
          <h2>
            LET’S BUILD
            <br />
            SOMETHING
            <br />
            <span>LASTING.</span>
            <button
              onClick={() => setInquiry(true)}
              aria-label="Start a project inquiry"
            >
              <ArrowUpRight />
            </button>
          </h2>
          <div
            className={`
            contact-baseline flex justify-between items-end mt-[50px] [&>p]:text-[var(--muted)] [&>p]:text-[13px]
            [&_.text-link]:text-[10px] [&_.text-link]:tracking-[0.08em] [@media(max-width:_760px)]:block
            [@media(max-width:_760px)]:mt-[25px] [@media(max-width:_760px)]:[&_.text-link]:mt-[25px]
            [@media(max-width:_760px)]:[&_.text-link]:text-[9px]
          `}
          >
            <p>
              Have a place in mind?
              <br />
              We’d love to hear its story.
            </p>
            <a
              href="mailto:?subject=NOIR%20-%20Project%20inquiry"
              className={`
                text-link inline-flex items-center gap-[10px] text-[12px] py-[5px] px-0 [border-bottom:1px_solid_var(--line)]
                bg-[transparent] [transition:gap_0.2s] [&:hover]:gap-[16px]
              `}
            >
              COMPOSE A PROJECT BRIEF
              <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer
        brand="noir"
        links={[
          { label: "Selected work", href: "#projects" },
          { label: "Our approach", href: "#philosophy" },
          { label: "Get in touch", href: "#contact" },
        ]}
      />
      <ContactModal
        open={inquiry}
        onClose={() => setInquiry(false)}
        kind="inquiry"
        title="Tell us about your place."
      />
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Project"}
      >
        {selected && (
          <>
            <div
              className={`detail-photo mt-[25px] mx-0 mb-[20px] overflow-hidden [&_img]:block [&_img]:w-full [&_img]:h-auto`}
            >
              <Image
                src={`/assets/architecture/${selected.image}`}
                alt={selected.alt}
                width={900}
                height={600}
              />
            </div>
            <p
              className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
            >
              {selected.location} / {selected.year} / CONCEPT PROJECT
            </p>
            <p>{selected.description}</p>
            <dl
              className={`
              project-facts text-[12px] mt-0 mx-0 mb-[25px] [&>div]:flex [&>div]:gap-[20px]
              [&>div]:[border-top:1px_solid_var(--line)] [&>div]:py-[12px] [&>div]:px-0 [&_dt]:text-[var(--muted)]
              [&_dt]:min-w-[50px] [&_dd]:m-0 [&_dd]:leading-[1.5]
            `}
            >
              <div>
                <dt>Area</dt>
                <dd>{selected.area}</dd>
              </div>
              <div>
                <dt>Palette</dt>
                <dd>{selected.materials}</dd>
              </div>
            </dl>
            <button
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
              onClick={() => {
                setSelected(null);
                setInquiry(true);
              }}
            >
              Start a similar conversation
              <Arrow />
            </button>
          </>
        )}
      </Dialog>
    </>
  );
}
