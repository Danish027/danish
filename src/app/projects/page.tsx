import { ProjectCard } from "@/src/components/project-card";

const projects = [
  {
    name: "Seashell",
    role: "Founding Engineer",
    timeline: "2023 - Current",
    shortDescription:
      "Packaging's three-sided marketplace in the United States",
    description:
      "Built the core platform from the ground up, connecting suppliers, converters, and buyers in the packaging industry. Developed features for real-time pricing, order management, and marketplace interactions.",
    techStack:
      "Next.js, TypeScript, Tailwind, tRPC, React Query, Drizzle ORM, Framer Motion",
    url: "https://seashellpack.com",
    logo: "/assets/seashell.png",
  },
  {
    name: "Invoiceapp",
    role: "Founder",
    timeline: "2022 - Current",
    shortDescription: "Platform to create invoices and track payments",
    description:
      "Built to help freelancers and small businesses manage their invoicing needs efficiently. Designed and developed the entire platform with features for invoice generation, payment tracking, and client management.",
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
