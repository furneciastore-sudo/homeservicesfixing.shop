// HomeServicesFixing.shop — static site logic (no backend required).
// ZIP coverage checker: fetches only the one service's data file on demand,
// so we never load all 7 datasets (~1.9MB total) up front.

const PHONES = {
  hvac: { display: "(831) 230-9683", tel: "tel:+18312309683", label: "Call HVAC" },
  plumbing: { display: "(607) 300-1044", tel: "tel:+16073001044", label: "Call Plumbing" },
  electrician: { display: "(725) 745-8442", tel: "tel:+17257458442", label: "Call Electrician" },
};

const SERVICE_NAMES = {
  hvac: "HVAC Services",
  plumbing: "Plumbing Services",
  electrician: "Electrician Services",
  "appliance-repair": "Appliance Repair",
  roofing: "Roofing",
  locksmith: "Locksmith",
  "garage-door-repair": "Garage Door Repair",
};

function trackEvent(name, payload) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
    if (window.gtag) window.gtag("event", name, payload);
    if (window.fbq) window.fbq(name === "call_click" ? "track" : "trackCustom", name === "call_click" ? "Contact" : name, payload);
  } catch (e) { /* analytics must never break the page */ }
}

// Call Now dropdown (header + sticky bar)
document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-call-toggle]");
  document.querySelectorAll(".call-menu.open").forEach((m) => {
    if (!trigger || m !== trigger.parentElement.querySelector(".call-menu")) m.classList.remove("open");
  });
  if (trigger) {
    trigger.parentElement.querySelector(".call-menu").classList.toggle("open");
  } else if (!e.target.closest(".call-menu")) {
    document.querySelectorAll(".call-menu.open").forEach((m) => m.classList.remove("open"));
  }
});

// Track every tel: link click
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="tel:"]');
  if (link) {
    trackEvent("call_click", { phone: link.getAttribute("href").replace("tel:", ""), location: link.dataset.loc || "unknown" });
  }
});

const coverageCache = {};
async function loadCoverage(service) {
  if (coverageCache[service]) return coverageCache[service];
  const res = await fetch(`assets/coverage/${service}.json`);
  const data = await res.json();
  coverageCache[service] = data;
  return data;
}

function normalizeZip(v) {
  const digits = (v || "").replace(/\D/g, "");
  return digits.length === 5 ? digits : null;
}

function renderResult(container, service, status, record) {
  const phone = PHONES[service];
  const name = SERVICE_NAMES[service];

  if (status === "invalid") {
    container.innerHTML = `<p class="result-invalid">Please enter a valid 5-digit ZIP code.</p>`;
    return;
  }

  if (status === "available") {
    let cta;
    if (phone) {
      cta = `<a class="btn btn-accent" href="${phone.tel}" data-loc="zip-checker">${phone.label} · ${phone.display}</a>`;
    } else {
      cta = `<p class="coming-soon">${name} is available in your area — phone support for this service is coming soon.</p>`;
    }
    container.innerHTML = `
      <div class="result-box result-available">
        <p class="result-title">✓ ${name} available in ${record.city}, ${record.state}</p>
        ${cta}
      </div>`;
    trackEvent("coverage_found", { service });
    return;
  }

  container.innerHTML = `
    <div class="result-box result-unavailable">
      <p style="margin:0 0 4px;font-weight:600;">We're sorry, ${name.toLowerCase()} is not currently listed for this ZIP code.</p>
      <p style="margin:0;color:var(--muted);font-size:13px;">Try another ZIP code, or select a different service.</p>
    </div>`;
  trackEvent("coverage_not_found", { service });
}

function initZipChecker(root) {
  const form = root.querySelector("form");
  const select = root.querySelector("select[name=service]");
  const zipInput = root.querySelector("input[name=zip]");
  const resultBox = root.querySelector(".zip-result");
  const fixedService = root.dataset.fixedService;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const service = fixedService || select.value;
    const zip = normalizeZip(zipInput.value);

    if (!zip) {
      renderResult(resultBox, service, "invalid");
      return;
    }

    trackEvent("zip_search", { service, zip });
    const submitBtn = form.querySelector('button[type=submit]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Checking…";

    try {
      const data = await loadCoverage(service);
      const record = data.find((r) => r.zip === zip);
      renderResult(resultBox, service, record ? "available" : "unavailable", record);
    } catch (err) {
      resultBox.innerHTML = `<p class="result-invalid">Something went wrong. Please try again.</p>`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  if (select) {
    select.addEventListener("change", () => {
      resultBox.innerHTML = "";
      trackEvent("service_selected", { service: select.value });
    });
  }

  zipInput.addEventListener("input", () => {
    zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5);
  });
}

document.querySelectorAll("[data-zip-checker]").forEach(initZipChecker);
