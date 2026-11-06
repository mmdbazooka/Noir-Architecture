import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  title: "NOIR / Spatial Atelier",
  description:
    "Architecture as an expression of feeling. An independent spatial atelier crafting places that endure.",
  openGraph: {
    title: "NOIR / Spatial Atelier",
    description:
      "Architecture as an expression of feeling. An independent spatial atelier crafting places that endure.",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#090b10" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable}`}>
        <a
          className={`
          skip-link fixed left-[16px] top-[-80px] z-[200] p-[14px] bg-[var(--text)] text-[var(--bg)] [&:focus]:top-[12px]
        `}
          href="#main"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
