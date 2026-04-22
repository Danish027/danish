import { BottomActionBar } from "./components/BottomActionBar";
import { ExperienceList } from "./components/ExperienceList";
import { HomeHero } from "./components/HomeHero";

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

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFCFD] px-4 pt-10 pb-28 text-[#474444] sm:px-6 dark:bg-[#0F1214] dark:text-[#D5D9DC]">
      <div className="relative mx-auto flex w-full max-w-[1520px] flex-col items-center gap-12">
        <HomeHero />

        <div className="w-full max-w-[640px] px-4">
          <p className="poppins-light mb-5 text-[13px] font-light leading-[1.6] tracking-[0em] text-[#3a3634] dark:text-[#CCD1D4]">
            Designer who loves bringing ideas to life. I&apos;m passionate about
            building technology that carries emotion and feels deeply human.
          </p>

          <ExperienceList items={experience} />
        </div>
      </div>

      <BottomActionBar />
    </main>
  );
}
