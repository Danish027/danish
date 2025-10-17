import { ProjectCard } from "@/src/components/project-card";

const projects = [
  {
    name: "Seashell",
    role: "Lead Frontend Developer",
    timeline: "2023 - Current",
    shortDescription:
      "Packaging marketplace connecting clients, suppliers, and liaisons",
    description:
      "Led frontend development for a platform connecting clients, suppliers, and liaisons in the packaging industry. Built features for product quoting and ordering, client management, real-time chat, CRM dashboard, and analytics. Added team collaboration features that let companies create multiple teams and invite members to work together.",
    techStack:
      "Next.js, TypeScript, Tailwind, tRPC, React Query, Drizzle ORM, Framer Motion",
    url: "https://seashellpack.com",
    logo: "/assets/seashell.png",
  },
  {
    name: "Invoiceapp",
    role: "Founder",
    timeline: "2022 - Current",
    shortDescription:
      "Business management platform for invoicing, estimates, and payments",
    description:
      "Built a platform for businesses to manage invoices, estimates, payment tracking, and client relationships. Features include prebuilt templates for quick invoice creation, AI-powered invoicing, and workflows designed so any task takes just a few clicks. Added detailed analytics with custom filters and fields, error tracking, financial year switching, and team collaboration.",
    techStack: "Next.js, TypeScript, Tailwind, tRPC, React Query, Drizzle ORM",
    url: "https://invoiceapp.io",
    logo: "/assets/invoiceapp.png",
  },
  {
    name: "Compsoft Technologies",
    role: "Intern",
    timeline: "2022 (3 months)",
    shortDescription: "Web development for client projects",
    description:
      "Created small websites for various clients, implementing responsive designs and dynamic features. Worked on multiple projects to deliver custom solutions based on client requirements.",
    techStack: "JavaScript, React, Tailwind, Prisma, MongoDB, Express",
    logoPlaceholder: "CT",
  },
];

export default function Projects() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-semibold mb-2">Projects</h1>
      <p className="text-gray-600 mb-14">
        A collection of my work and contributions across various companies.
      </p>

      <div className="space-y-20">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
