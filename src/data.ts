export interface Job {
  id: string;
  title: string;
  location: string;
  experience: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities?: string[];
  requirements: string[];
  salary?: string;
  postedDate: string;
}

export const mockJobs: Job[] = [
  {
    id: "j1",
    title: "Agri Sales Advisor",
    location: "Multiple Locations",
    experience: "1–3 Years",
    shortDescription: "Provide guidance to farmers on agricultural products and support sales activities.",
    fullDescription: "Provide guidance to farmers on agricultural products and support sales activities.",
    responsibilities: [
      "Visit farmers and dealers",
      "Explain product benefits",
      "Generate leads and sales",
      "Maintain daily reports"
    ],
    requirements: [
      "Agriculture background preferred",
      "Good communication skills",
      "Willing to travel"
    ],
    postedDate: "Just Now",
  },
  {
    id: "j2",
    title: "Accountant",
    location: "Office-based",
    experience: "2–5 Years",
    shortDescription: "Manage financial records and ensure compliance.",
    fullDescription: "Manage financial records and ensure compliance.",
    responsibilities: [
      "Handle invoices and GST",
      "Maintain ledgers",
      "Manage accounts"
    ],
    requirements: [
      "B.Com / M.Com",
      "Knowledge of Tally",
      "Attention to detail"
    ],
    postedDate: "Just Now",
  },
  {
    id: "j3",
    title: "Field Executive",
    location: "On-field",
    experience: "0–2 Years",
    shortDescription: "Support field operations and customer engagement.",
    fullDescription: "Support field operations and customer engagement.",
    responsibilities: [
      "Field visits",
      "Market feedback",
      "Product demos"
    ],
    requirements: [
      "Basic communication",
      "Two-wheeler preferred",
      "Willing to travel"
    ],
    postedDate: "Just Now",
  },
  {
    id: "j4",
    title: "Customer Support Executive",
    location: "Office / Remote",
    experience: "1–3 Years",
    shortDescription: "Handle customer queries and support.",
    fullDescription: "Handle customer queries and support.",
    responsibilities: [
      "Answer calls",
      "Resolve issues",
      "Maintain records"
    ],
    requirements: [
      "Hindi/English communication",
      "Basic computer knowledge"
    ],
    postedDate: "Just Now",
  },
  {
    id: "j5",
    title: "Digital Marketing Executive",
    location: "Office / Hybrid",
    experience: "1–3 Years",
    shortDescription: "Manage online marketing campaigns.",
    fullDescription: "Manage online marketing campaigns.",
    responsibilities: [
      "Social media handling",
      "Run ads",
      "Content creation"
    ],
    requirements: [
      "Digital marketing knowledge",
      "Creative mindset"
    ],
    postedDate: "Just Now",
  },
  {
    id: "j6",
    title: "Warehouse & Inventory Manager",
    location: "Warehouse",
    experience: "2–4 Years",
    shortDescription: "Manage inventory and stock flow.",
    fullDescription: "Manage inventory and stock flow.",
    responsibilities: [
      "Track stock",
      "Manage dispatch",
      "Maintain records"
    ],
    requirements: [
      "Inventory experience",
      "Basic computer skills"
    ],
    postedDate: "Just Now",
  }
];
