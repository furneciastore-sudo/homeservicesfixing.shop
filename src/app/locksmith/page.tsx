import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const generateMetadata = () => generateServiceMetadata("locksmith");

export default function Page() {
  return <ServicePage slug="locksmith" />;
}
