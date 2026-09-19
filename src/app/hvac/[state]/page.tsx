import {
  generateServiceStateMetadata,
  ServiceStatePage,
} from "@/components/ServiceStatePage";
import { getStates, stateNameToSlug } from "@/lib/coverage";

export function generateStaticParams() {
  return getStates("hvac").map((abbr) => ({
    state: stateNameToSlug(abbr),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return generateServiceStateMetadata("hvac", state);
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return <ServiceStatePage slug="hvac" stateSlug={state} />;
}
