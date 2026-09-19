const FAQS = [
  {
    question: "How do I know if a service is available in my area?",
    answer:
      "Enter your ZIP code in the service finder above. We check it against our service-area coverage data and tell you right away whether that service is currently listed for your ZIP code.",
  },
  {
    question: "What happens when I click Call Now?",
    answer:
      "Your phone's dialer opens immediately with the number for that service. There's no form to fill out and no waiting for a callback.",
  },
  {
    question: "Is service available everywhere?",
    answer:
      "No. Coverage differs by service and by location. Some services cover more ZIP codes than others, which is why we ask for your ZIP code before showing a call option.",
  },
  {
    question: "Is HomeServicesFixing.shop a contractor?",
    answer:
      "No. HomeServicesFixing.shop is a platform for finding and calling service help by phone. We are not a licensed contractor and do not perform repairs directly.",
  },
  {
    question: "What if my ZIP code isn't listed for a service?",
    answer:
      "You'll see a message letting you know that service isn't currently listed for your ZIP code, and you can check a different service or try another ZIP code.",
  },
];

export function FAQ() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        Frequently Asked Questions
      </h2>

      <dl className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
        {FAQS.map((faq) => (
          <div key={faq.question} className="p-5 sm:p-6">
            <dt className="text-base font-bold text-primary">
              {faq.question}
            </dt>
            <dd className="mt-2 text-sm text-muted">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
