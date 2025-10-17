import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-semibold mb-8">Mohammed Danish</h1>

      <div className="space-y-6 leading-loose text-gray-700">
        <p>
          I am a software developer based in{" "}
          <span className="font-medium">Bangalore, India</span>, currently
          working at{" "}
          <Link
            href="https://seashellpack.com"
            className="font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Seashell
          </Link>{" "}
          and also the founder of{" "}
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
