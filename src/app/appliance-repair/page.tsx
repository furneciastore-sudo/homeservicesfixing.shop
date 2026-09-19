import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("appliance-repair");

export default function Page() {
  return <ServicePage slug="appliance-repair" />;
}
