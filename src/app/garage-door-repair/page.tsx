import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("garage-door-repair");

export default function Page() {
  return <ServicePage slug="garage-door-repair" />;
}
