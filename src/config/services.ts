import { PHONE_NUMBERS, type PhoneNumber } from "./phoneNumbers";

export type ServiceSlug =
  | "hvac"
  | "plumbing"
  | "electrician"
  | "appliance-repair"
  | "roofing"
  | "locksmith"
  | "garage-door-repair";

export type ServiceConfig = {
  id: ServiceSlug;
  slug: ServiceSlug;
  name: string;
  /** Short label used on the sticky call bar / nav, e.g. "HVAC" */
  shortName: string;
  /** e.g. "Call HVAC" */
  callLabel: string;
  tagline: string;
  description: string;
  /** Common jobs shown as a bullet list on the service page/card. */
  subservices: string[];
  /** Common problems shown in the "Common Home Service Problems" section. */
  commonProblems: string[];
  /** Phone number, or null when not yet assigned. Never invent one. */
  phone: PhoneNumber | null;
  /** Key into public/images used for hero/card art for this service. */
  imageKey: ServiceSlug;
};

export const SERVICES: Record<ServiceSlug, ServiceConfig> = {
  hvac: {
    id: "hvac",
    slug: "hvac",
    name: "HVAC Services",
    shortName: "HVAC",
    callLabel: "Call HVAC",
    tagline: "HVAC Service Help Near You",
    description:
      "Find help fast for air conditioning and heating problems — from a system that won't cool to a furnace that won't start.",
    subservices: [
      "AC Repair",
      "Air Conditioning Service",
      "Heating Repair",
      "Furnace Repair",
      "HVAC Maintenance",
      "Cooling Problems",
      "Heating Problems",
    ],
    commonProblems: [
      "AC blowing warm air",
      "Furnace won't turn on",
      "Strange noises from the unit",
      "Thermostat not responding",
      "Uneven heating or cooling",
    ],
    phone: PHONE_NUMBERS.hvac,
    imageKey: "hvac",
  },
  plumbing: {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    callLabel: "Call Plumbing",
    tagline: "Plumbing Service Help Near You",
    description:
      "Get connected for leaks, clogged drains, water heater trouble, and other plumbing issues that need attention now.",
    subservices: [
      "Emergency Plumbing",
      "Drain Cleaning",
      "Water Heater Repair",
      "Leak Repair",
      "Pipe Repair",
      "Sewer Services",
    ],
    commonProblems: [
      "Leaking pipe under the sink",
      "Clogged drain that won't clear",
      "No hot water",
      "Running or overflowing toilet",
      "Low water pressure",
    ],
    phone: PHONE_NUMBERS.plumbing,
    imageKey: "plumbing",
  },
  electrician: {
    id: "electrician",
    slug: "electrician",
    name: "Electrician Services",
    shortName: "Electrician",
    callLabel: "Call Electrician",
    tagline: "Electrical Service Help Near You",
    description:
      "Find help for electrical panel issues, faulty wiring, dead outlets, and other electrical problems around the home.",
    subservices: [
      "Electrical Repair",
      "Electrical Panel Service",
      "Wiring",
      "Outlets & Switches",
      "Lighting",
      "Electrical Troubleshooting",
    ],
    commonProblems: [
      "Breaker keeps tripping",
      "Outlet not working",
      "Flickering lights",
      "Burning smell near panel",
      "Need a new circuit installed",
    ],
    phone: PHONE_NUMBERS.electrician,
    imageKey: "electrician",
  },
  "appliance-repair": {
    id: "appliance-repair",
    slug: "appliance-repair",
    name: "Appliance Repair",
    shortName: "Appliance",
    callLabel: "Get Appliance Help",
    tagline: "Appliance Repair Help Near You",
    description:
      "Support for major household appliances that stop working when you need them most.",
    subservices: [
      "Refrigerator Repair",
      "Washer & Dryer Repair",
      "Dishwasher Repair",
      "Oven & Stove Repair",
      "Microwave Repair",
    ],
    commonProblems: [
      "Refrigerator not cooling",
      "Washer won't drain or spin",
      "Dishwasher leaving dishes dirty",
      "Oven not heating evenly",
    ],
    phone: null,
    imageKey: "appliance-repair",
  },
  roofing: {
    id: "roofing",
    slug: "roofing",
    name: "Roofing",
    shortName: "Roofing",
    callLabel: "Get Roofing Help",
    tagline: "Roofing Service Help Near You",
    description:
      "Support for leaks, storm damage, missing shingles, and other residential roofing concerns.",
    subservices: [
      "Roof Leak Repair",
      "Storm Damage Repair",
      "Shingle Replacement",
      "Roof Inspection",
      "Gutter Issues",
    ],
    commonProblems: [
      "Water stain on the ceiling",
      "Missing or damaged shingles",
      "Visible sagging in the roofline",
      "Granules collecting in gutters",
    ],
    phone: null,
    imageKey: "roofing",
  },
  locksmith: {
    id: "locksmith",
    slug: "locksmith",
    name: "Locksmith",
    shortName: "Locksmith",
    callLabel: "Get Locksmith Help",
    tagline: "Locksmith Help Near You",
    description:
      "Support for lockouts, broken locks, rekeying, and residential lock or key problems.",
    subservices: [
      "Home Lockout",
      "Lock Rekey",
      "Lock Replacement",
      "Broken Key Extraction",
      "Smart Lock Help",
    ],
    commonProblems: [
      "Locked out of the house",
      "Key broken off in the lock",
      "Lock won't turn or catch",
      "Moved in and need locks rekeyed",
    ],
    phone: null,
    imageKey: "locksmith",
  },
  "garage-door-repair": {
    id: "garage-door-repair",
    slug: "garage-door-repair",
    name: "Garage Door Repair",
    shortName: "Garage Door",
    callLabel: "Get Garage Door Help",
    tagline: "Garage Door Repair Help Near You",
    description:
      "Support for garage doors that won't open, close, or operate safely.",
    subservices: [
      "Garage Door Won't Open",
      "Spring Repair",
      "Opener Repair",
      "Track & Roller Repair",
      "Panel Replacement",
    ],
    commonProblems: [
      "Door won't open or close",
      "Loud grinding or banging noise",
      "Door is off its track",
      "Remote or opener not responding",
    ],
    phone: null,
    imageKey: "garage-door-repair",
  },
};

export const SERVICE_LIST: ServiceConfig[] = Object.values(SERVICES);

export function getService(slug: string): ServiceConfig | undefined {
  return SERVICES[slug as ServiceSlug];
}

export function hasPhone(
  service: ServiceConfig,
): service is ServiceConfig & { phone: PhoneNumber } {
  return service.phone !== null;
}
