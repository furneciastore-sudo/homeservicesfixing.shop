import {
  generateServiceStateMetadata,
  ServiceStatePage,
} from "@/components/ServiceStatePage";
import { getStates, stateNameToSlug } from "@/lib/coverage";

export function generateStaticParams() {
  return getStates("electrician").map((abbr) => ({
    state: stateNameToSlug(abbr),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return generateServiceStateMetadata("electrician", state);
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return <ServiceStatePage slug="electrician" stateSlug={state} />;
}
