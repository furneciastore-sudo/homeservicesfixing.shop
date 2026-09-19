import Link from "next/link";
import { SERVICE_LIST } from "@/config/services";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">HomeServicesFixing</p>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            A platform for finding and calling home service help near you.
            Service availability varies by location and by service.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Services
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {SERVICE_LIST.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}`} className="hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/#how-it-works" className="hover:text-white">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/#service-areas" className="hover:text-white">
                Service Areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Important
          </p>
          <p className="mt-3 text-sm text-white/70">
            HomeServicesFixing.shop helps you find and call service help — it
            is not itself a licensed contractor and does not perform repairs
            directly. Always confirm licensing and pricing with the service
            provider you reach by phone.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} HomeServicesFixing.shop. All rights
        reserved.
      </div>
    </footer>
  );
}
