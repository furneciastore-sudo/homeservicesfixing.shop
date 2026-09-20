import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("roofing");

export default function Page() {
  return <ServicePage slug="roofing" />;
}
