import {
  generateServiceStateMetadata,
  ServiceStatePage,
} from "@/components/ServiceStatePage";
import { getStates, stateNameToSlug } from "@/lib/coverage";

export function generateStaticParams() {
  return getStates("appliance-repair").map((abbr) => ({
    state: stateNameToSlug(abbr),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return generateServiceStateMetadata("appliance-repair", state);
}

export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  return <ServiceStatePage slug="appliance-repair" stateSlug={state} />;
}
