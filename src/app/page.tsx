import { One } from "./components/1";

const experience = [
  {
    year: "2025",
    title: "Apple",
    role: "Product Design Intern",
  },
  {
    year: "2025",
    title: "Stanford",
    role: "B.S. Design Engineering",
  },
  {
    year: "2025",
    title: "Vectara",
    role: "Front End Dev + UX",
  },
];

export default function page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 py-12 text-[#474444] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center">
        <div className="w-full max-w-[880px] pt-4 sm:pt-6">
          <One />
        </div>

        <div className="mt-7 w-full max-w-[720px] sm:mt-8">
          <p className="poppins-light max-w-[680px] text-[0.95rem] leading-[1.42] tracking-[-0.035em] text-[#4f4c4c] sm:text-[1.02rem] lg:text-[1.08rem]">
            Designer who loves bringing ideas to life. I&apos;m passionate about
            building technology that carries emotion and feels deeply human.
          </p>

          <div className="mt-7 space-y-3 sm:mt-8">
            {experience.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-5 gap-y-1 text-left sm:grid-cols-[88px_150px_minmax(0,1fr)] sm:gap-x-7"
              >
                <span className="poppins-light text-[0.8rem] font-light tracking-[-0.03em] text-[#9a9a99] sm:text-[0.88rem]">
                  {item.year}
                </span>
                <span className="poppins-light text-[0.86rem] font-light tracking-[-0.03em] text-[#4c4949] sm:text-[0.95rem]">
                  {item.title}
                </span>
                <span className="poppins-light col-start-2 text-[0.86rem] font-light tracking-[-0.03em] text-[#9a9a99] sm:col-start-auto sm:text-[0.95rem]">
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
