import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-semibold mb-8">Mohammed Danish</h1>

      <div className="space-y-6 text-base leading-loose text-gray-600">
        <p>
          I am a developer at{" "}
          <Link
            href="https://seashellpack.com"
            className="font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Seashell
          </Link>{" "}
          and founder of{" "}
          <Link
            href="https://invoiceapp.io"
            className="font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Invoiceapp
          </Link>
          . I am passionate about building technology that makes a meaningful
          impact on people's lives.
        </p>

        <p>
          I graduated in <span className="font-medium">2024</span> with a BTech
          in Computer Science and Engineering. In{" "}
          <span className="font-medium">2023</span>, I joined Seashell as a
          Founding Engineer, building a software platform that serves as
          packaging's three-sided marketplace in the United States. In{" "}
          <span className="font-medium">2022</span>, I started working on
          Invoiceapp, a platform to create invoices and track payments. I work
          with <span className="font-medium">Next.js</span>,{" "}
          <span className="font-medium">TypeScript</span>,{" "}
          <span className="font-medium">Tailwind</span>,{" "}
          <span className="font-medium">tRPC</span>,{" "}
          <span className="font-medium">React Query</span>, and{" "}
          <span className="font-medium">Drizzle ORM</span>.
        </p>

        <p>
          You can find me on{" "}
          <Link
            href="https://github.com/danish027"
            className="underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            GitHub
          </Link>
          ,{" "}
          <Link
            href="https://x.com/Danish_027"
            className="underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            X/Twitter
          </Link>
          , and{" "}
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
