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
      className={`brand-mark w-[30px] h-[30px] [@media(max-width:_760px)]:w-[27px] [@media(max-width:_760px)]:h-[27px] ${className}`}
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
      className={`
        site-header z-[50] left-[var(--gutter)] right-[var(--gutter)] top-0 h-[94px] flex items-center justify-between
        gap-[25px] [border-bottom:1px_solid_var(--line)] fixed
        [transition:background_0.25s,_backdrop-filter_0.25s,_height_0.25s]
        [@media(min-width:_1800px)]:[left:max(var(--gutter),_calc((100vw_-_1500px)_/_2))]
        [@media(min-width:_1800px)]:[right:max(var(--gutter),_calc((100vw_-_1500px)_/_2))]
        [@media(max-width:_1000px)]:gap-[18px] [@media(max-width:_760px)]:h-[78px]
        [@media(max-width:_760px)]:[&>.nav-action]:hidden [&:has(.nav-secondary)_.desktop-nav]:ml-auto
        [&:has(.nav-secondary)_.desktop-nav]:mr-auto [&.header-scrolled]:top-[10px] [&.header-scrolled]:h-[65px]
        [&.header-scrolled]:py-0 [&.header-scrolled]:px-[18px]
        [&.header-scrolled]:bg-[color-mix(in_srgb,_var(--bg)_92%,_transparent)]
        [&.header-scrolled]:[backdrop-filter:blur(18px)] [&.header-scrolled]:[border:1px_solid_var(--line)]
        [@media(max-width:_760px)]:[&.header-scrolled]:h-[58px]
        [@media(max-width:_760px)]:[&.header-scrolled]:top-[8px]
        [@media(max-width:_760px)]:[&.header-scrolled]:left-[18px]
        [@media(max-width:_760px)]:[&.header-scrolled]:right-[18px] [@media(max-width:_760px)]:[&.header-scrolled]:py-0
        [@media(max-width:_760px)]:[&.header-scrolled]:px-[12px] [&:where(.header-noir)_.wordmark]:text-[32px]
        [&:where(.header-noir)_.wordmark]:tracking-[-0.09em] [&:where(.header-noir)_.brand-mark]:w-[25px]
        [&:where(.header-noir)_.nav-action]:text-[10px] [&:where(.header-noir)_.nav-action]:tracking-[0.08em] header-${brand} ${scrolled ? "header-scrolled" : ""}`}
    >
      <Link
        href="/"
        className={`
        wordmark inline-flex items-center gap-[10px] font-[family-name:var(--font-display),_sans-serif] text-[25px]
        font-semibold tracking-[-0.07em] whitespace-nowrap [@media(max-width:_760px)]:text-[24px]
      `}
        aria-label={`${brand} home`}
      >
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
      <nav
        className={`
        desktop-nav flex items-center gap-[28px] [&_a]:text-[11px] [&_a]:text-[var(--muted)]
        [&_a]:[transition:color_0.2s] [&_a:hover]:text-[var(--text)] [@media(max-width:_1000px)]:gap-[17px]
        [@media(max-width:_760px)]:hidden
      `}
        aria-label="Main navigation"
      >
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      {onSecondary && (
        <button
          className={`
          nav-secondary ml-auto bg-[transparent] text-[var(--muted)] text-[11px] whitespace-nowrap
          [@media(max-width:_760px)]:hidden
        `}
          onClick={onSecondary}
        >
          {brand === "synapse" ? "Sign in" : "Log in"}
        </button>
      )}
      <button
        className={`nav-action inline-flex items-center gap-[18px] bg-[transparent] text-[11px] whitespace-nowrap`}
        onClick={onAction}
      >
        {action}
        <Arrow />
      </button>
      <button
        className={`
          menu-toggle hidden [@media(max-width:_760px)]:grid icon-button w-[44px] h-[44px] place-items-center
          bg-[transparent] text-[inherit] [border:1px_solid_var(--line)]
        `}
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
        className={`
          mobile-menu fixed inset-0 w-full h-full max-w-none max-h-none p-[25px] bg-[var(--bg)] text-[var(--text)]
          [border:0] m-0 [&::backdrop]:bg-[var(--bg)] [&_nav]:flex [&_nav]:flex-col [&_nav]:mb-[40px] [&_nav_a]:flex
          [&_nav_a]:items-center [&_nav_a]:gap-[16px] [&_nav_a]:py-[20px] [&_nav_a]:px-0
          [&_nav_a]:[border-top:1px_solid_var(--line)] [&_nav_a]:text-[28px]
          [&_nav_a]:font-[family-name:var(--font-display),_sans-serif] [&_nav_a_span]:text-[10px]
          [&_nav_a_span]:text-[var(--muted)] [&_nav_a_svg]:ml-auto [&_.micro]:mt-[30px] [&_.micro]:text-[var(--muted)]
        `}
        onCancel={() => setExpanded(false)}
        aria-label="Navigation"
      >
        <div
          className={`mobile-menu-top flex justify-between items-center mb-[50px]`}
        >
          <span
            className={`
            wordmark inline-flex items-center gap-[10px] font-[family-name:var(--font-display),_sans-serif] text-[25px]
            font-semibold tracking-[-0.07em] whitespace-nowrap [@media(max-width:_760px)]:text-[24px]
          `}
          >
            <BrandMark brand={brand} />
            {brand.toUpperCase()}
          </span>
          <button
            className={`
              icon-button w-[44px] h-[44px] grid place-items-center bg-[transparent] text-[inherit]
              [border:1px_solid_var(--line)]
            `}
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
            closeMenu();
            onAction();
          }}
        >
          {action}
          <Arrow />
        </button>
        <p
          className={`micro text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6]`}
        >
          A different perspective. By design.
        </p>
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
      className={`
        dialog [border:1px_solid_var(--line)] text-[var(--text)] bg-[var(--surface)] p-0
        [max-width:min(560px,_calc(100vw_-_32px))] [max-height:calc(100dvh_-_40px)] w-full rounded-[10px]
        [box-shadow:0_35px_150px_#000a] [&::backdrop]:bg-[#020309c9] [&::backdrop]:[backdrop-filter:blur(10px)]
        [&_h2]:text-[38px] [&_h2]:leading-[1.1] [&_h2]:mt-[25px] [&_h2]:mx-0 [&_h2]:mb-[20px]
        [&_p:not(.eyebrow)]:text-[13px] [&_p:not(.eyebrow)]:text-[var(--muted)] [&_p:not(.eyebrow)]:mb-[22px]
        [@media(max-width:_760px)]:[&_h2]:text-[32px]
      `}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`dialog-inner p-[44px] relative [@media(max-width:_760px)]:py-[36px] [@media(max-width:_760px)]:px-[25px]`}
      >
        <button
          className={`
            dialog-close absolute right-[14px] top-[14px] [border:0] icon-button w-[44px] h-[44px] grid place-items-center
            bg-[transparent] text-[inherit]
          `}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <p
          className={`
          eyebrow text-[10px] font-medium tracking-[0.15em] uppercase leading-[1.6] flex items-center gap-[10px]
          text-[var(--muted)] mb-[25px] [&_.dot]:w-[6px] [&_.dot]:h-[6px] [&_.dot]:inline-block
          [&_.dot]:bg-[var(--accent)] [&_.dot]:rounded-full
          [&_.dot]:[box-shadow:0_0_12px_color-mix(in_srgb,_var(--accent)_50%,_transparent)]
        `}
        >
          A CONCEPT. A CONVERSATION.
        </p>
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
    <div
      className={`
      form-success flex gap-[15px] p-[23px] [border:1px_solid_var(--line)]
      bg-[color-mix(in_srgb,_var(--accent)_7%,_transparent)] text-left [&>svg]:text-[var(--accent)]
      [&_strong]:text-[14px] [&_strong]:leading-[1.6] [&_p]:text-[12px] [&_p]:text-[var(--muted)] [&_p]:mt-[8px]
      [&_p]:mx-0 [&_p]:mb-[12px]
    `}
      role="status"
    >
      <Check size={24} />
      <div>
        <strong>You’re on the list. In this little universe.</strong>
        <p>
          Demo complete — your details stayed in this browser and were not sent
          or saved.
        </p>
        <button
          className={`
          text-link inline-flex items-center gap-[10px] text-[12px] py-[5px] px-0 [border-bottom:1px_solid_var(--line)]
          bg-[transparent] [transition:gap_0.2s] [&:hover]:gap-[16px]
        `}
          onClick={() => setDone(false)}
        >
          Try another email <ArrowRight size={15} />
        </button>
      </div>
    </div>
  ) : (
    <form
      onSubmit={submit}
      className={
        compact
          ? `
        signup-form [&_input]:min-w-0 [&_input]:w-full [&_input]:text-[var(--text)] [&_input]:bg-[rgba(0,_0,_0,_0.2)]
        [&_input]:[border:1px_solid_var(--line)] [&_input]:rounded-[3px] [&_input]:py-[14px] [&_input]:px-[15px]
        [&_input]:outline-offset-[3px] [&_input]:text-[13px] grid [grid-template-columns:1fr_auto] gap-[8px]
        max-w-[500px] [@media(max-width:_760px)]:grid-cols-[1fr] [@media(max-width:_760px)]:[&_.button]:w-full compact
      `
          : `
        signup-form [&_input]:min-w-0 [&_input]:w-full [&_input]:text-[var(--text)] [&_input]:bg-[rgba(0,_0,_0,_0.2)]
        [&_input]:[border:1px_solid_var(--line)] [&_input]:rounded-[3px] [&_input]:py-[14px] [&_input]:px-[15px]
        [&_input]:outline-offset-[3px] [&_input]:text-[13px] grid [grid-template-columns:1fr_auto] gap-[8px]
        max-w-[500px] [@media(max-width:_760px)]:grid-cols-[1fr] [@media(max-width:_760px)]:[&_.button]:w-full
      `
      }
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
        type="submit"
      >
        {button}
        <Arrow />
      </button>
      <span
        className={`form-note col-span-full text-[var(--muted)] text-[10px] mt-[5px]`}
      >
        Local demo · No data is transmitted.
      </span>
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
            onClick={close}
          >
            Back to exploring
            <ArrowRight size={17} />
          </button>
        </>
      ) : done ? (
        <div
          className={`
          form-success flex gap-[15px] p-[23px] [border:1px_solid_var(--line)]
          bg-[color-mix(in_srgb,_var(--accent)_7%,_transparent)] text-left [&>svg]:text-[var(--accent)]
          [&_strong]:text-[14px] [&_strong]:leading-[1.6] [&_p]:text-[12px] [&_p]:text-[var(--muted)] [&_p]:mt-[8px]
          [&_p]:mx-0 [&_p]:mb-[12px]
        `}
          role="status"
        >
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
            className={`
              contact-form flex flex-col gap-[20px] [&_label]:grid [&_label]:gap-[9px] [&_label]:text-[12px]
              [&_input]:min-w-0 [&_input]:w-full [&_input]:text-[var(--text)] [&_input]:bg-[rgba(0,_0,_0,_0.2)]
              [&_input]:[border:1px_solid_var(--line)] [&_input]:rounded-[3px] [&_input]:py-[14px] [&_input]:px-[15px]
              [&_input]:outline-offset-[3px] [&_textarea]:min-w-0 [&_textarea]:w-full [&_textarea]:text-[var(--text)]
              [&_textarea]:bg-[rgba(0,_0,_0,_0.2)] [&_textarea]:[border:1px_solid_var(--line)] [&_textarea]:rounded-[3px]
              [&_textarea]:py-[14px] [&_textarea]:px-[15px] [&_textarea]:outline-offset-[3px] [&_textarea]:resize-y
            `}
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
            <button
              type="submit"
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
    <div
      className={`
      faq-list [border-top:1px_solid_var(--line)] [&_details]:[border-bottom:1px_solid_var(--line)] [&_summary]:flex
      [&_summary]:items-center [&_summary]:gap-[24px] [&_summary]:py-[25px] [&_summary]:px-0
      [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:text-[15px]
      [&_summary::-webkit-details-marker]:hidden [&_summary>svg]:ml-auto [&_summary>svg]:[transition:transform_0.2s]
      [&_details[open]_summary>svg]:[transform:rotate(45deg)] [&_details>p]:text-[var(--muted)] [&_details>p]:pt-0
      [&_details>p]:px-[45px] [&_details>p]:pb-[25px] [&_details>p]:max-w-[700px] [&_details>p]:text-[14px]
      [@media(max-width:_760px)]:[&_summary]:text-[14px] [@media(max-width:_760px)]:[&_summary]:gap-[15px]
      [@media(max-width:_760px)]:[&_details>p]:pl-[30px] [@media(max-width:_760px)]:[&_details>p]:pr-[15px]
      [@media(max-width:_760px)]:[&_details>p]:text-[13px]
    `}
    >
      {items.map((item, i) => (
        <details key={item.q}>
          <summary>
            <span
              className={`faq-index text-[var(--muted)] text-[10px] tracking-[0.1em]`}
            >
              0{i + 1}
            </span>
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
    <footer
      className={`site-footer py-0 px-[var(--gutter)] max-w-[1680px] m-auto`}
    >
      <div
        className={`
        footer-main py-[50px] px-0 flex items-center justify-between gap-[25px] [border-top:1px_solid_var(--line)]
        [&>span]:text-[12px] [&>span]:text-[var(--muted)] [&>div]:flex [&>div]:gap-[25px] [&>div]:text-[12px]
        [@media(max-width:_1000px)]:[&>span]:hidden [@media(max-width:_760px)]:items-start
        [@media(max-width:_760px)]:gap-[30px] [@media(max-width:_760px)]:[&>div]:flex-col
        [@media(max-width:_760px)]:[&>div]:gap-[16px] [@media(max-width:_760px)]:[&_.wordmark]:text-[30px]
      `}
      >
        <a
          href="#main"
          className={`
          wordmark inline-flex items-center gap-[10px] font-[family-name:var(--font-display),_sans-serif] text-[25px]
          font-semibold tracking-[-0.07em] whitespace-nowrap [@media(max-width:_760px)]:text-[24px]
        `}
        >
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
      <div
        className={`
        footer-bottom [border-top:1px_solid_var(--line)] flex justify-between gap-[20px] py-[24px] px-0 text-[10px]
        text-[var(--muted)] [&_a]:flex [&_a]:items-center [&_a]:gap-[5px] [@media(max-width:_760px)]:flex-wrap
        [@media(max-width:_760px)]:leading-[1.8] [@media(max-width:_760px)]:[&>span]:w-full
      `}
      >
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
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((el) =>
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
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((el) =>
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
