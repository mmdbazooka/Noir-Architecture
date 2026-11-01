"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Check,
  Send,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Brand = "noir" | "synapse" | "velocity" | "mono" | "soniq";
export function BrandMark({
  brand,
  className = "",
}: {
  brand: Brand;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`brand-mark ${className}`}
      aria-hidden="true"
    >
      {brand === "noir" && (
        <>
          <path
            d="M6 32V8h6l16 24h6V8h-6v24L12 8H6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6 32h28" stroke="currentColor" />
        </>
      )}
      {brand === "synapse" && (
        <>
          <path
            d="M12 10h16v20H12V10Zm0 10h16"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="10" r="5" fill="currentColor" />
          <circle cx="28" cy="10" r="5" fill="currentColor" />
          <circle cx="12" cy="30" r="5" fill="currentColor" />
          <circle cx="28" cy="30" r="5" fill="currentColor" />
        </>
      )}
      {brand === "velocity" && (
        <>
          <path
            d="m3 9 12 23h7L10 9H3Zm19 0-5 9 4 8L33 9H22Z"
            fill="currentColor"
          />
          <path d="M34 9h3L24 32h-3L34 9Z" fill="currentColor" opacity=".5" />
        </>
      )}
      {brand === "mono" && (
        <path
          d="M5 30V13a5 5 0 0 1 9-3l6 10 6-10a5 5 0 0 1 9 3v17M14 30V13m12 17V13"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {brand === "soniq" && (
        <>
          <path
            d="M7 16v8m8-15v22m9-26v30m9-19v8"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
export function Arrow({
  className = "",
  size = 19,
}: {
  className?: string;
  size?: number;
}) {
  return <ArrowUpRight size={size} className={className} aria-hidden="true" />;
}

export function SiteHeader({
  brand,
  links,
  onAction,
  action,
  onSecondary,
}: {
  brand: Brand;
  links: { label: string; href: string }[];
  onAction: () => void;
  action: string;
  onSecondary?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  function closeMenu() {
    dialog.current?.close();
    setExpanded(false);
  }
  return (
    <header
      className={`site-header header-${brand} ${scrolled ? "header-scrolled" : ""}`}
    >
      <Link href="/" className="wordmark" aria-label={`${brand} home`}>
        <BrandMark brand={brand} />
        <span>
          {brand === "noir"
            ? "NOIR."
            : brand === "synapse"
              ? "synapse"
              : brand === "mono"
                ? "mono"
                : brand.toUpperCase()}
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      {onSecondary && (
        <button className="nav-secondary" onClick={onSecondary}>
          {brand === "synapse" ? "Sign in" : "Log in"}
        </button>
      )}
      <button className="nav-action" onClick={onAction}>
        {action}
        <Arrow />
      </button>
      <button
        className="menu-toggle icon-button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={expanded}
        onClick={() => {
          dialog.current?.showModal();
          setExpanded(true);
        }}
      >
        <Menu size={25} />
      </button>
      <dialog
        ref={dialog}
        className="mobile-menu"
        onCancel={() => setExpanded(false)}
        aria-label="Navigation"
      >
        <div className="mobile-menu-top">
          <span className="wordmark">
            <BrandMark brand={brand} />
            {brand.toUpperCase()}
          </span>
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={closeMenu}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>
              <span>0{i + 1}</span>
              {l.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <button
          className="button primary"
          onClick={() => {
            closeMenu();
            onAction();
          }}
        >
          {action}
          <Arrow />
        </button>
        <p className="micro">A different perspective. By design.</p>
      </dialog>
    </header>
  );
}

export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d?.open) d?.showModal();
    if (!open && d?.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <p className="eyebrow">A CONCEPT. A CONVERSATION.</p>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

export function SignupForm({
  button = "Keep me in the loop",
  compact = false,
}: {
  button?: string;
  compact?: boolean;
}) {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDone(true);
  };
  return done ? (
    <div className="form-success" role="status">
      <Check size={24} />
      <div>
        <strong>You’re on the list. In this little universe.</strong>
        <p>
          Demo complete — your details stayed in this browser and were not sent
          or saved.
        </p>
        <button className="text-link" onClick={() => setDone(false)}>
          Try another email <ArrowRight size={15} />
        </button>
      </div>
    </div>
  ) : (
    <form
      onSubmit={submit}
      className={compact ? "signup-form compact" : "signup-form"}
    >
      <label
        className="sr-only"
        htmlFor={compact ? "hero-email" : "signup-email"}
      >
        Email address
      </label>
      <input
        id={compact ? "hero-email" : "signup-email"}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Your email address"
        required
        maxLength={254}
      />
      <button className="button primary" type="submit">
        {button}
        <Arrow />
      </button>
      <span className="form-note">Local demo · No data is transmitted.</span>
    </form>
  );
}

export function ContactModal({
  open,
  onClose,
  title = "Let’s make something happen.",
  kind = "interest",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  kind?: "interest" | "inquiry" | "signin";
}) {
  const [done, setDone] = useState(false);
  function close() {
    onClose();
    setTimeout(() => setDone(false), 200);
  }
  return (
    <Dialog open={open} onClose={close} title={title}>
      {kind === "signin" ? (
        <>
          <p>
            This is an interactive product concept, so there’s no account to
            sign into. Explore the live preview to see what the workspace could
            feel like.
          </p>
          <button className="button primary" onClick={close}>
            Back to exploring
            <ArrowRight size={17} />
          </button>
        </>
      ) : done ? (
        <div className="form-success" role="status">
          <Check />
          <div>
            <strong>Your preview is complete.</strong>
            <p>
              This is a local demonstration. Nothing was sent, reserved, or
              saved. Thank you for exploring the concept.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p>
            Leave a little introduction and try the experience. This demo
            validates locally and does not transmit or store your details.
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label>
              Your name
              <input
                name="name"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="alex@example.com"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            {kind === "inquiry" && (
              <label>
                What do you have in mind?
                <textarea
                  name="message"
                  placeholder="Tell us a little about your vision…"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                />
              </label>
            )}
            <button type="submit" className="button primary">
              {kind === "inquiry" ? "Preview your inquiry" : "Preview signup"}
              <Send size={17} />
            </button>
          </form>
        </>
      )}
    </Dialog>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.q}>
          <summary>
            <span className="faq-index">0{i + 1}</span>
            <span>{item.q}</span>
            <Plus size={20} />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
export function Footer({
  brand,
  links = [],
}: {
  brand: Brand;
  links?: { label: string; href: string }[];
}) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a href="#main" className="wordmark">
          <BrandMark brand={brand} />
          {brand === "noir"
            ? "NOIR."
            : brand === "mono"
              ? "mono"
              : brand.toUpperCase()}
        </a>
        <span>Thoughtfully imagined. Independently made.</span>
        <div>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © 2026 {brand.toUpperCase()} · Concept / self-initiated project
        </span>
        <Link href="/concept">
          About this concept
          <Arrow size={12} />
        </Link>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".parallax-image")
        .forEach((el) =>
          gsap.fromTo(
            el,
            { scale: 1.065 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
      gsap.utils
        .toArray<HTMLElement>(".reveal-block")
        .forEach((el) =>
          gsap.from(el, {
            y: 22,
            opacity: 0.45,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 93%", once: true },
          }),
        );
    });
    return () => ctx.revert();
  }, []);
  return null;
}
