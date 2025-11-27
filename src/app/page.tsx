import Link from "next/link";

type TechCategory = {
  title: string;
  items: string[];
};

const techCategories: TechCategory[] = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "C/C++"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Vite"],
  },
  {
    title: "UI & Motion",
    items: ["Framer Motion", "Radix UI", "Shadcn UI"],
  },
  {
    title: "Backend & APIs",
    items: ["Express", "Node.js", "tRPC"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    title: "ORMs & State",
    items: ["Drizzle ORM", "Mongoose", "Prisma", "React Query", "Zod", "Zustand"],
  },
  {
    title: "Infra & Tooling",
    items: ["Docker", "GitHub Actions", "PlanetScale", "Supabase", "Vercel"],
  },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-semibold text-lg">Mohammed Danish</h1>
      <p className="text-sm text-gray-600">Bangalore, India</p>
      <p className="font-medium text-gray-600 py-5">
        Building{" "}
        <Link
          href="https://invoiceapp.io"
          className="underline underline-offset-4 hover:text-gray-700 transition-colors"
        >
          Invoiceapp.io
        </Link>
      </p>

      <div className="space-y-6 leading-loose text-gray-700">
        <p>
          I am a Full Stack Software Engineer currently working at{" "}
          <Link
            href="https://seashellpack.com"
            className="font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Seashell 🇺🇸
          </Link>
          , a US-based startup, as a Founding Engineer, and also the founder of{" "}
          <Link
            href="https://invoiceapp.io"
            className="font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Invoiceapp
          </Link>
          . I enjoy building thoughtful, user-focused products and modern web
          experiences that make a meaningful impact. I am open to remote work
          opportunities and enjoy collaborating with teams across different
          domains.
        </p>

        <p>
          I graduated in <span className="font-medium">2024</span> with a BTech
          in Computer Science and Engineering. In{" "}
          <span className="font-medium">2023</span>, I joined Seashell as a
          Founding Engineer, building a software platform that serves as
          packaging's three-sided marketplace in the United States. In{" "}
          <span className="font-medium">2022</span>, I started working on
          Invoiceapp, a platform to create invoices and track payments.
        </p>

        <section aria-labelledby="tech-stack-heading" className="space-y-2">
          <h2 id="tech-stack-heading" className="font-semibold text-gray-600">
            Web technologies I use
          </h2>

          <div className="text-gray-600">
            {techCategories.map(({ title, items }) => (
              <p key={title}>
                <span className="font-medium text-gray-700">{title}:</span>{" "}
                {items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <p>
          You can find me on{" "}
          <Link
            href="https://github.com/danish027"
            className="underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            GitHub
          </Link>
          {" "}and{" "}
          <Link
            href="https://www.linkedin.com/in/danish027/"
            className="underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            LinkedIn
          </Link>
          , or reach out via{" "}
          <Link
            href="mailto:mohammeddanish.dev@gmail.com"
            className="underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            email
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
