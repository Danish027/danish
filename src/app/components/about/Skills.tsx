import {
  MotionValue,
  useAnimationControls,
  motion,
  Variants,
} from "motion/react";
import { useEffect, useState } from "react";

type SkillsSectionProps = {
  isSkillsInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.08,
      type: "tween",
    },
  }),
};

const ICON_SLUGS: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  "C/C++": "cplusplus",
  "Next.js": "nextdotjs",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  Vite: "vite",
  "Framer Motion": "framer",
  "Radix UI": "radixui",
  "Node.js": "nodedotjs",
  Express: "express",
  tRPC: "trpc",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  MySQL: "mysql",
  Redis: "redis",
  Drizzle: "drizzle",
  Prisma: "prisma",
  "React Query": "reactquery",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  Vercel: "vercel",
  Supabase: "supabase",
};

const ZUSTAND_ICON_URL =
  "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg";
const ICON_COLOR = "737373";

function getIconSrc(name: string): string | null {
  if (name === "Zustand" || name === "Shadcn UI") return null;
  const slug = ICON_SLUGS[name];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/${ICON_COLOR}`;
}

function ShadcnIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path d="m19.01 11.55-7.46 7.46c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0l7.46-7.46c.46-.46.46-1.19 0-1.65s-1.19-.46-1.65 0ZM19.17 3.34c-.46-.46-1.19-.46-1.65 0L3.34 17.52c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0L19.16 4.99c.46-.46.46-1.19 0-1.65Z" />
    </svg>
  );
}

const categories = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "C/C++"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Vite"],
  },
  {
    label: "UI & Motion",
    items: ["Framer Motion", "Radix UI", "Shadcn UI"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "tRPC"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "ORMs & State",
    items: ["Drizzle", "Prisma", "React Query", "Zustand"],
  },
  {
    label: "Infra & Tooling",
    items: ["Docker", "GitHub Actions", "Vercel", "Supabase"],
  },
];

const Skills: React.FC<SkillsSectionProps> = ({
  isSkillsInView,
  isMobile,
  backgroundGradient,
}) => {
  const controls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isSkillsInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    } else if (!isSkillsInView && hasAnimated) {
      controls.start("hidden");
      setHasAnimated(false);
    }
  }, [isSkillsInView, controls, hasAnimated]);

  const initialState = isMobile ? "visible" : "hidden";

  function renderIcon(item: string) {
    if (item === "Shadcn UI") {
      return (
        <span className="flex shrink-0 w-5 h-5 rounded overflow-hidden bg-white/5 flex items-center justify-center text-[var(--gray-3)] grayscale opacity-90 [&_svg]:w-[18px] [&_svg]:h-[18px]">
          <ShadcnIcon />
        </span>
      );
    }
    if (item === "Zustand") {
      return (
        <span className="flex shrink-0 w-5 h-5 rounded overflow-hidden bg-white/5 flex items-center justify-center">
          <img
            src={ZUSTAND_ICON_URL}
            alt=""
            width={18}
            height={18}
            className="w-[18px] h-[18px] object-contain grayscale opacity-90"
          />
        </span>
      );
    }
    const iconSrc = getIconSrc(item);
    if (iconSrc) {
      return (
        <span className="flex shrink-0 w-5 h-5 rounded overflow-hidden bg-white/5 flex items-center justify-center">
          <img
            src={iconSrc}
            alt=""
            width={18}
            height={18}
            className="w-[18px] h-[18px] object-contain grayscale opacity-90"
          />
        </span>
      );
    }
    return null;
  }

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-full min-w-0 overflow-x-hidden flex justify-center items-center relative z-10 py-16 sm:py-24 md:py-32 px-0"
    >
      <motion.div
        initial={initialState}
        animate={controls}
        className="max-w-[1000px] w-full px-5 sm:px-6 md:px-4"
      >
        <motion.p
          variants={fadeInUpVariants}
          custom={0}
          className="poppins-medium text-xs text-[var(--gray-3)] uppercase tracking-[0.2em] mb-8 sm:mb-12"
        >
          Tools &amp; Technologies
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-8 sm:gap-y-10">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              variants={fadeInUpVariants}
              custom={catIdx + 1}
              className="min-w-0"
            >
              <p className="poppins-medium text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[var(--gray-3)] mb-2 sm:mb-3">
                {cat.label}
              </p>
              <ul className="flex flex-col gap-1 sm:gap-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="poppins-light text-xs sm:text-sm text-[var(--gray-1)] leading-relaxed flex items-center gap-2 min-w-0"
                  >
                    {renderIcon(item)}
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Skills };
