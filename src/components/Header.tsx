import Link from "next/link";
import { CallNowMenu } from "@/components/CallNowMenu";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#service-areas", label: "Service Areas" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-primary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
            HF
          </span>
          <span className="hidden sm:inline">HomeServicesFixing</span>
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-medium text-text md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CallNowMenu
          location="header"
          buttonClassName="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-dark"
        />
      </div>
    </header>
  );
}
