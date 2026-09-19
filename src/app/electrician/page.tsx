import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("electrician");

export default function Page() {
  return <ServicePage slug="electrician" />;
}
