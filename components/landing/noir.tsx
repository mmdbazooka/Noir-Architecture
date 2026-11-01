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
    <article className={`project project-${index} reveal-block`}>
      <button
        className="project-image"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title}`}
      >
        <Image
          src={`/assets/architecture/${project.image}`}
          alt={project.alt}
          fill
          sizes={index === 0 ? "90vw" : "(max-width: 760px) 90vw, 46vw"}
          className="parallax-image"
        />
        <span className="project-number">N° / {project.number}</span>
        <span className="view-project">
          View
          <br />
          project
          <ArrowUpRight size={23} />
        </span>
        <span className="project-open">
          <Plus size={22} />
        </span>
      </button>
      <div className="project-caption">
        <div>
          <p className="micro">{project.type}</p>
          <h3>
            <button onClick={() => onSelect(project)}>{project.title}</button>
          </h3>
        </div>
        <p className="micro">
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
        <section className="noir-hero">
          <div className="noir-hero-image">
            <Image
              src="/assets/architecture/monolith.webp"
              alt="A monumental concrete residence overlooking a rugged landscape at dusk"
              fill
              priority
              sizes="(max-width:760px) 100vw, 76vw"
              className="parallax-image"
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow">
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
            <div className="hero-lower">
              <p>
                Architecture that moves you.
                <br />
                Places that stay with you.
              </p>
              <a className="button ghost" href="#projects">
                EXPLORE OUR WORK
                <Arrow />
              </a>
            </div>
          </div>
          <span className="hero-coordinate micro">
            33°55′31.0″S 18°25′26.0″E / A STUDY IN STILLNESS
          </span>
          <div className="noir-hero-bottom">
            <a href="#studio" className="scroll-note micro">
              <ArrowDown size={16} />
              SCROLL TO DISCOVER
            </a>
            <p className="micro">
              <span>FEATURED CONCEPT / 001</span>THE MONOLITH RESIDENCE
            </p>
            <a
              href="#projects"
              className="circle-arrow"
              aria-label="Explore selected projects"
            >
              <Arrow size={20} />
            </a>
          </div>
        </section>
        <section id="studio" className="section statement">
          <p className="eyebrow section-index">01 / THE ATELIER</p>
          <div>
            <h2 className="reveal-block">
              We design the space
              <br />
              between what exists
              <br />
              and <span>what is possible.</span>
            </h2>
            <div className="statement-bottom">
              <p>
                We are an independent spatial atelier. Our work begins with
                listening — to a landscape, to a material, to the way you want
                to live. What follows is architecture with a reason to exist.
              </p>
              <a className="text-link" href="#philosophy">
                MEET OUR WAY OF THINKING
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section id="projects" className="section selected-work">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 / SELECTED WORK — 2025–2026</p>
              <h2>A sense of place.</h2>
            </div>
            <p>
              Considered spaces. Distinct perspectives.
              <br />A selection of architectural concepts.
            </p>
          </div>
          <div className="project-layout">
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
        <section id="philosophy" className="manifesto">
          <Image
            src="/assets/architecture/light-house.webp"
            alt="Sunlight traces a circular opening in a stone courtyard"
            fill
            sizes="100vw"
            className="parallax-image"
          />
          <div className="manifesto-shade" />
          <span className="manifesto-outline" aria-hidden="true">
            LESS, BUT
            <br />
            MEANINGFUL.
          </span>
          <div className="manifesto-content">
            <p className="eyebrow">03 / OUR PHILOSOPHY</p>
            <h2>
              Nothing unnecessary.
              <br />
              Everything intentional.
            </h2>
            <div className="principles">
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
        <section className="section studio-numbers">
          <p className="eyebrow">A SMALL STUDIO. AN OPEN WORLD.</p>
          <div className="number-grid">
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
          <p className="concept-note">
            Illustrative studio story · Concept portfolio
          </p>
        </section>
        <section id="contact" className="section noir-contact">
          <div className="contact-top">
            <p className="eyebrow">
              04 / EVERY GREAT SPACE STARTS WITH A CONVERSATION
            </p>
            <span className="micro">
              OPEN TO NEW PERSPECTIVES <span className="status-dot" />
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
          <div className="contact-baseline">
            <p>
              Have a place in mind?
              <br />
              We’d love to hear its story.
            </p>
            <a
              href="mailto:?subject=NOIR%20-%20Project%20inquiry"
              className="text-link"
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
            <div className="detail-photo">
              <Image
                src={`/assets/architecture/${selected.image}`}
                alt={selected.alt}
                width={900}
                height={600}
              />
            </div>
            <p className="micro">
              {selected.location} / {selected.year} / CONCEPT PROJECT
            </p>
            <p>{selected.description}</p>
            <dl className="project-facts">
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
              className="button primary"
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
