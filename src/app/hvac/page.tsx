import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("hvac");

export default function Page() {
  return <ServicePage slug="hvac" />;
}
