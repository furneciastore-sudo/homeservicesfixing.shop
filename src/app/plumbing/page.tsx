import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("plumbing");

export default function Page() {
  return <ServicePage slug="plumbing" />;
}
