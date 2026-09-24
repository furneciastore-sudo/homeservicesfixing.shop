#!/usr/bin/env python3
"""Generates the static HTML pages for the Hostinger deployment.
Run with: python3 generate.py
Edit the SERVICES data below (or the .html files directly afterward) and re-run.
"""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

PHONES = {
    "hvac": {"display": "(831) 230-9683", "tel": "tel:+18312309683", "label": "Call HVAC"},
    "plumbing": {"display": "(607) 300-1044", "tel": "tel:+16073001044", "label": "Call Plumbing"},
    "electrician": {"display": "(725) 745-8442", "tel": "tel:+17257458442", "label": "Call Electrician"},
}

SERVICES = [
    {
        "slug": "hvac", "name": "HVAC Services", "short": "HVAC",
        "tagline": "HVAC Service Help Near You",
        "card_title": "Heating & Cooling",
        "desc": "Find help fast for air conditioning and heating problems — from a system that won't cool to a furnace that won't start.",
        "subservices": ["AC Repair", "Air Conditioning Service", "Heating Repair", "Furnace Repair", "HVAC Maintenance", "Cooling Problems", "Heating Problems"],
        "problems": ["AC blowing warm air", "Furnace won't turn on", "Strange noises from the unit", "Thermostat not responding", "Uneven heating or cooling"],
        "hero": "hvac-hero.webp", "card": "hvac-card.jpg", "caption": "Residential AC condenser service",
    },
    {
        "slug": "plumbing", "name": "Plumbing Services", "short": "Plumbing",
        "tagline": "Plumbing Service Help Near You",
        "card_title": "Pipes & Water Heaters",
        "desc": "Get connected for leaks, clogged drains, water heater trouble, and other plumbing issues that need attention now.",
        "subservices": ["Emergency Plumbing", "Drain Cleaning", "Water Heater Repair", "Leak Repair", "Pipe Repair", "Sewer Services"],
        "problems": ["Leaking pipe under the sink", "Clogged drain that won't clear", "No hot water", "Running or overflowing toilet", "Low water pressure"],
        "hero": "plumbing-card.webp", "card": "plumbing-card.webp", "caption": "Residential plumbing service",
    },
    {
        "slug": "electrician", "name": "Electrician Services", "short": "Electrician",
        "tagline": "Electrical Service Help Near You",
        "card_title": "Wiring & Power",
        "desc": "Find help for electrical panel issues, faulty wiring, dead outlets, and other electrical problems around the home.",
        "subservices": ["Electrical Repair", "Electrical Panel Service", "Wiring", "Outlets & Switches", "Lighting", "Electrical Troubleshooting"],
        "problems": ["Breaker keeps tripping", "Outlet not working", "Flickering lights", "Burning smell near panel", "Need a new circuit installed"],
        "hero": "electrician-card.webp", "card": "electrician-card.webp", "caption": "Residential electrical service",
    },
    {
        "slug": "appliance-repair", "name": "Appliance Repair", "short": "Appliance",
        "tagline": "Appliance Repair Help Near You",
        "card_title": "Appliance Repair",
        "desc": "Support for major household appliances that stop working when you need them most.",
        "subservices": ["Refrigerator Repair", "Washer & Dryer Repair", "Dishwasher Repair", "Oven & Stove Repair", "Microwave Repair"],
        "problems": ["Refrigerator not cooling", "Washer won't drain or spin", "Dishwasher leaving dishes dirty", "Oven not heating evenly"],
        "hero": "appliance-repair-hero.webp", "card": "appliance-repair-hero.webp", "caption": "Appliance diagnostic and repair",
    },
    {
        "slug": "roofing", "name": "Roofing", "short": "Roofing",
        "tagline": "Roofing Service Help Near You",
        "card_title": "Roof Repair",
        "desc": "Support for leaks, storm damage, missing shingles, and other residential roofing concerns.",
        "subservices": ["Roof Leak Repair", "Storm Damage Repair", "Shingle Replacement", "Roof Inspection", "Gutter Issues"],
        "problems": ["Water stain on the ceiling", "Missing or damaged shingles", "Visible sagging in the roofline", "Granules collecting in gutters"],
        "hero": "roofing-hero.webp", "card": "roofing-hero.webp", "caption": "Residential roof inspection",
    },
    {
        "slug": "locksmith", "name": "Locksmith", "short": "Locksmith",
        "tagline": "Locksmith Help Near You",
        "card_title": "Locks & Entry",
        "desc": "Support for lockouts, broken locks, rekeying, and residential lock or key problems.",
        "subservices": ["Home Lockout", "Lock Rekey", "Lock Replacement", "Broken Key Extraction", "Smart Lock Help"],
        "problems": ["Locked out of the house", "Key broken off in the lock", "Lock won't turn or catch", "Moved in and need locks rekeyed"],
        "hero": "locksmith-hero.webp", "card": "locksmith-hero.webp", "caption": "Residential lock service",
    },
    {
        "slug": "garage-door-repair", "name": "Garage Door Repair", "short": "Garage Door",
        "tagline": "Garage Door Repair Help Near You",
        "card_title": "Garage Door Systems",
        "desc": "Support for garage doors that won't open, close, or operate safely.",
        "subservices": ["Garage Door Won't Open", "Spring Repair", "Opener Repair", "Track & Roller Repair", "Panel Replacement"],
        "problems": ["Door won't open or close", "Loud grinding or banging noise", "Door is off its track", "Remote or opener not responding"],
        "hero": "garage-door-repair-hero.webp", "card": "garage-door-repair-hero.webp", "caption": "Garage door system service",
    },
]

FAQS = [
    ("How do I know if a service is available in my area?",
     "Enter your ZIP code in the service finder. We check it against our real service-area coverage data and tell you right away whether that service is currently listed for your ZIP code."),
    ("What happens when I click Call Now?",
     "Your phone's dialer opens immediately with the number for that service. There's no form to fill out and no waiting for a callback."),
    ("Is service available everywhere?",
     "No. Coverage differs by service and by location. Some services cover more ZIP codes than others, which is why we ask for your ZIP code before showing a call option."),
    ("Is HomeServicesFixing.shop a contractor?",
     "No. HomeServicesFixing.shop is a platform for finding and calling service help by phone. We are not a licensed contractor and do not perform repairs directly."),
    ("What if my ZIP code isn't listed for a service?",
     "You'll see a message letting you know that service isn't currently listed for your ZIP code, and you can check a different service or try another ZIP code."),
]


def call_menu(location):
    rows = "\n".join(
        f'<a href="{PHONES[s]["tel"]}" data-loc="{location}"><span>{SERVICES_BY_SLUG[s]["short"]}</span><span>{PHONES[s]["display"]}</span></a>'
        for s in PHONES
    )
    return f'''<div class="call-now-wrap">
  <button class="call-now-btn" data-call-toggle type="button">📞 Call Now</button>
  <div class="call-menu">
    <p>Choose a service to call</p>
    {rows}
  </div>
</div>'''


SERVICES_BY_SLUG = {s["slug"]: s for s in SERVICES}


def header(active_slug=None):
    return f'''<header class="site-header">
  <div class="container">
    <a class="logo" href="index.html"><span class="logo-badge">HF</span> HomeServicesFixing</a>
    <nav class="nav-links">
      <a href="index.html#services">Services</a>
      <a href="index.html#service-finder">Service Areas</a>
      <a href="index.html#how-it-works">How It Works</a>
      <a href="index.html#faq">FAQ</a>
    </nav>
    {call_menu("header")}
  </div>
</header>'''


def sticky_call(service_slug=None):
    phone = PHONES.get(service_slug)
    if phone:
        return f'''<div class="sticky-call">
  <a class="btn btn-accent" href="{phone["tel"]}" data-loc="sticky-bar">📞 {phone["label"]} — {phone["display"]}</a>
</div>'''
    rows = "\n".join(
        f'<a href="{PHONES[s]["tel"]}" data-loc="sticky-bar"><span>{SERVICES_BY_SLUG[s]["short"]}</span><span>{PHONES[s]["display"]}</span></a>'
        for s in PHONES
    )
    return f'''<div class="sticky-call">
  <div class="call-now-wrap" style="width:100%;">
    <button class="call-now-btn btn" data-call-toggle type="button" style="width:100%;">📞 Call Now</button>
    <div class="call-menu" style="bottom:calc(100% + 8px);top:auto;right:0;left:0;width:100%;">
      <p>Choose a service to call</p>
      {rows}
    </div>
  </div>
</div>'''


def footer():
    service_links = "\n".join(f'<li><a href="{s["slug"]}.html">{s["name"]}</a></li>' for s in SERVICES)
    return f'''<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <p style="font-size:18px;font-weight:800;color:#fff;margin:0 0 12px;">HomeServicesFixing</p>
        <p style="font-size:14px;max-width:260px;">A platform for finding and calling home service help near you. Service availability varies by location and by service.</p>
      </div>
      <div><h4>Services</h4><ul>{service_links}</ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="index.html#how-it-works">How It Works</a></li>
        <li><a href="index.html#faq">FAQ</a></li>
        <li><a href="index.html#service-finder">Service Areas</a></li>
      </ul></div>
      <div><h4>Important</h4>
        <p style="font-size:14px;">HomeServicesFixing.shop helps you find and call service help — it is not itself a licensed contractor and does not perform repairs directly. Always confirm licensing and pricing with the service provider you reach by phone.</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">© 2026 HomeServicesFixing.shop. All rights reserved.</div>
</footer>'''


def zip_checker(location, fixed_service=None):
    if fixed_service:
        select_html = f'<input type="hidden" name="service" value="{fixed_service}">'
    else:
        options = "\n".join(f'<option value="{s["slug"]}">{s["name"]}</option>' for s in SERVICES)
        select_html = f'''<label class="field-label">Select a service</label>
        <select name="service">{options}</select>'''
    return f'''<div class="zip-card" data-zip-checker {"data-fixed-service=" + chr(34) + fixed_service + chr(34) if fixed_service else ""}>
  <form>
    <div class="field-row">{select_html}</div>
    <div class="field-row zip-row">
      <div style="flex:1;">
        <label class="field-label">Enter your ZIP code</label>
        <input type="text" name="zip" inputmode="numeric" maxlength="5" placeholder="e.g. 90210">
      </div>
      <button class="btn btn-primary" type="submit" style="align-self:flex-end;">Check Availability</button>
    </div>
  </form>
  <div class="zip-result" aria-live="polite"></div>
</div>'''


def problems_section():
    cards = ""
    for s in SERVICES:
        items = "\n".join(f"<li>{p}</li>" for p in s["problems"][:4])
        cards += f'<div class="problem-card"><h3>{s["short"]}</h3><ul>{items}</ul></div>\n'
    return f'''<section class="bg-surface">
  <div class="container">
    <div class="section-head">
      <h2>Common Home Service Problems</h2>
      <p>Recognize the issue? Check your area and get connected.</p>
    </div>
    <div class="problem-grid">{cards}</div>
  </div>
</section>'''


def faq_section():
    items = "\n".join(f'<div class="faq-item"><h3>{q}</h3><p>{a}</p></div>' for q, a in FAQS)
    return f'''<section id="faq">
  <div class="container">
    <div class="section-head"><h2>Frequently Asked Questions</h2></div>
    <div class="faq">{items}</div>
  </div>
</section>'''


def final_cta():
    return f'''<section class="final-cta">
  <div class="container">
    <h2>Need Home Service Help?</h2>
    <p>Check your area and call directly.</p>
    <div class="btn-row" style="justify-content:center;">
      <a class="btn btn-accent" href="index.html#service-finder">Check Your Area</a>
      {call_menu("final-cta")}
    </div>
  </div>
</section>'''


PAGE_SHELL = '''<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="https://homeservicesfixing.shop/{canonical}">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body class="has-sticky-call">
{header}
<main>
{content}
</main>
{footer}
{sticky}
<script src="assets/app.js"></script>
</body>
</html>
'''


def write(path, html):
    with open(os.path.join(ROOT, path), "w") as f:
        f.write(html)
    print("wrote", path)


def build_homepage():
    cards = ""
    for s in SERVICES:
        img = s["card"]
        cards += f'''<a class="service-card" href="{s["slug"]}.html">
      <img src="assets/images/services/{img}" alt="{s["caption"]}" loading="lazy">
      <div class="overlay"></div>
      <div class="card-body">
        <p class="card-eyebrow">{s["short"]}</p>
        <p class="card-title">{s["card_title"]}</p>
        <p class="card-desc">{s["desc"]}</p>
        <p class="card-cta">Check Availability →</p>
      </div>
    </a>\n'''

    steps = '''<ol class="steps" style="list-style:none;padding-left:32px;margin:0;">
    <li class="step"><span class="step-num">01</span><h3>Choose Your Service</h3><p>Select HVAC, plumbing, electrical, or another home-service category.</p></li>
    <li class="step"><span class="step-num">02</span><h3>Check Your Area</h3><p>Enter your ZIP code to see whether that service is currently listed near you.</p></li>
    <li class="step"><span class="step-num">03</span><h3>Call Directly</h3><p>Call the appropriate service number from your phone — no forms, no waiting.</p></li>
  </ol>'''

    content = f'''
<section class="hero">
  <div class="container">
    <div>
      <p class="eyebrow">Serving homeowners across the USA</p>
      <h1>Home Service Help When You Need It</h1>
      <p class="lede">Find service professionals for HVAC, plumbing, electrical, and other home-service needs in your area.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#service-finder">Check Your Area</a>
        {call_menu("hero")}
      </div>
      <p class="fine-print">Service availability varies by location — check your ZIP code before you call.</p>
    </div>
    <div class="hero-photo"><img src="assets/images/services/hvac-hero.webp" alt="Residential AC condenser service"></div>
  </div>
</section>

<section id="service-finder" class="bg-primary">
  <div class="container" style="display:grid;gap:32px;align-items:center;">
    <div style="text-align:center;">
      <h2>Find Home Service Help Near You</h2>
      <p style="max-width:520px;margin:0 auto;">Coverage differs by service and by ZIP code. Enter yours below to see what's available before you call.</p>
    </div>
    <div style="max-width:520px;margin:0 auto;width:100%;">
      {zip_checker("homepage-finder")}
    </div>
  </div>
</section>

<section id="services">
  <div class="container">
    <div class="section-head">
      <h2>Service Categories</h2>
      <p>Pick a service to see coverage, common problems, and how to get connected.</p>
    </div>
    <div class="service-grid">{cards}</div>
  </div>
</section>

<section id="how-it-works" class="bg-surface">
  <div class="container">
    <div class="section-head"><h2>How It Works</h2></div>
    {steps}
  </div>
</section>

{problems_section()}
{faq_section()}
{final_cta()}
'''
    html = PAGE_SHELL.format(
        title="Home Service Help Near You | HomeServicesFixing.shop",
        description="Find and call home service help for HVAC, plumbing, electrical, appliance, roofing, locksmith, and garage door needs. Check your ZIP code to see what's available.",
        canonical="",
        header=header(),
        content=content,
        footer=footer(),
        sticky=sticky_call(),
    )
    write("index.html", html)


def build_service_page(s):
    phone = PHONES.get(s["slug"])
    cta_html = (
        f'<a class="btn btn-accent" href="{phone["tel"]}" data-loc="service-hero">{phone["label"]} · {phone["display"]}</a>'
        if phone else '<p class="coming-soon">Phone support for this service is coming soon.</p>'
    )
    subservices = "\n".join(f"<div>{x}</div>" for x in s["subservices"])
    problems = "\n".join(f'<li class="problem-card" style="list-style:none;">{p}</li>' for p in s["problems"])

    content = f'''
<section class="hero">
  <div class="container">
    <div>
      <p class="breadcrumb"><a href="index.html">Home</a> / {s["name"]}</p>
      <h1>{s["tagline"]}</h1>
      <p class="lede">{s["desc"]}</p>
      {cta_html}
    </div>
    <div class="hero-photo"><img src="assets/images/services/{s["hero"]}" alt="{s["caption"]}"></div>
  </div>
</section>

<section>
  <div class="container" style="display:grid;gap:40px;">
    <div>
      <h2 style="font-size:24px;">{s["name"]}</h2>
      <div class="subservice-grid">{subservices}</div>
    </div>
    <div id="check-zip">
      <h2 style="font-size:24px;">Check Your ZIP Code</h2>
      <p style="color:var(--muted);">See if {s["name"].lower()} is currently listed in your area.</p>
      {zip_checker(s["slug"] + "-page", fixed_service=s["slug"])}
    </div>
  </div>
</section>

<section class="bg-surface">
  <div class="container">
    <h2 style="font-size:24px;">Common {s["name"]} Problems</h2>
    <ul class="problem-grid" style="padding:0;margin-top:20px;">{problems}</ul>
  </div>
</section>

<section style="text-align:center;max-width:600px;margin:0 auto;">
  <h2 style="font-size:24px;">How Getting {s["name"]} Works</h2>
  <ol style="text-align:left;color:var(--text);font-size:14px;">
    <li>Enter your ZIP code above to check availability.</li>
    <li>If listed, you'll see a Call Now button appear.</li>
    <li>Tap it to call directly — your phone dials immediately.</li>
  </ol>
  {cta_html}
</section>
'''
    html = PAGE_SHELL.format(
        title=f'{s["tagline"]} | HomeServicesFixing.shop',
        description=f'{s["desc"]} Check your ZIP code to see if {s["name"].lower()} is currently listed in your area.',
        canonical=s["slug"] + ".html",
        header=header(s["slug"]),
        content=content,
        footer=footer(),
        sticky=sticky_call(s["slug"]),
    )
    write(f'{s["slug"]}.html', html)


if __name__ == "__main__":
    build_homepage()
    for svc in SERVICES:
        build_service_page(svc)
    print("Done.")
