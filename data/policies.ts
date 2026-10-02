import { site } from "@/data/content";

export type Policy = {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

const contact = `Email ${site.email} or WhatsApp ${site.phone}.`;

export const policies: Policy[] = [
  {
    slug: "refund",
    title: "Refund policy",
    updated: "2 October 2026",
    sections: [
      {
        heading: "What you pay for",
        body: [
          `${site.fullName} sells software development services: websites, online stores, custom and AI-integrated systems, and maintenance. Every project is priced in a written quote before any payment is taken.`,
        ],
      },
      {
        heading: "Before work starts",
        body: [
          "If you cancel before work on your project has started, you get a full refund of everything you have paid.",
        ],
      },
      {
        heading: "After work starts",
        body: [
          "Work already completed is not refundable. If you cancel part-way through, you are refunded any amount paid for work that has not been done yet, based on the milestones in your quote.",
          "If we cannot deliver what the quote describes, you get a full refund for the undelivered part.",
        ],
      },
      {
        heading: "Maintenance",
        body: [
          "Monthly maintenance (RM 200 / month) can be cancelled at any time and stops at the end of the current month. The current month is not refunded.",
          "Hourly work (RM 50 / hour) is billed for hours actually worked and is not refundable once done.",
        ],
      },
      {
        heading: "How to ask for a refund",
        body: [
          `${contact} Include your name, the project and the payment reference.`,
          "Approved refunds are paid back to the original payment method within 7 to 14 business days.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "2 October 2026",
    sections: [
      {
        heading: "Who we are",
        body: [
          `This website is run by ${site.fullName}, ${site.entity}, based at ${site.address}. We handle personal data in line with Malaysia's Personal Data Protection Act 2010.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Only what you send us when you get in touch or pay: your name, email, phone number, business details and what you tell us about your project.",
          "Payments are processed by CHIP (Collect). Your card and bank details go straight to them; we never see or store them.",
          "This website does not use advertising or tracking cookies.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To reply to you, prepare quotes, deliver and support your project, send invoices and receipts, and meet legal and tax record-keeping duties.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "Only the services needed to do the work, such as the payment gateway and hosting providers. We do not sell or rent your data to anyone.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "For as long as you are a client, then for up to 7 years for accounting and tax records.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You can ask to see, correct or delete the personal data we hold about you. ${contact}`,
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & return policy",
    updated: "2 October 2026",
    sections: [
      {
        heading: "No physical shipping",
        body: [
          `${site.fullName} only sells digital services. Nothing is shipped, and there are no shipping fees.`,
        ],
      },
      {
        heading: "How work is delivered",
        body: [
          "Projects are delivered online: deployed to your hosting or domain, with the source code, logins and documentation handed over to you.",
          "The delivery timeline is set in your quote, and you get progress updates along the way.",
        ],
      },
      {
        heading: "Returns and revisions",
        body: [
          "Digital work cannot be physically returned. If something delivered does not match the agreed quote, tell us within 14 days of handover and we will fix it at no extra cost.",
          "Cancellations and refunds follow the refund policy.",
        ],
      },
      {
        heading: "Contact",
        body: [contact],
      },
    ],
  },
];
