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
  "Shadcn UI": "shadcn",
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
  Zustand: "zustand",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  Vercel: "vercel",
  Supabase: "supabase",
};

const ICON_COLOR = "737373";

function getIconSrc(name: string): string | null {
  const slug = ICON_SLUGS[name];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/${ICON_COLOR}`;
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

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-screen overflow-hidden flex justify-center items-center relative z-10 py-24 md:py-32"
    >
      <motion.div
        initial={initialState}
        animate={controls}
        className="max-w-[1000px] w-full px-4"
      >
        <motion.p
          variants={fadeInUpVariants}
          custom={0}
          className="poppins-medium text-xs text-[var(--gray-3)] uppercase tracking-[0.2em] mb-12"
        >
          Tools &amp; Technologies
        </motion.p>

        <div
          className={`grid gap-x-12 gap-y-10 ${
            isMobile ? "grid-cols-2" : "grid-cols-3 md:grid-cols-4"
          }`}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              variants={fadeInUpVariants}
              custom={catIdx + 1}
            >
              <p className="poppins-medium text-[11px] uppercase tracking-[0.15em] text-[var(--gray-3)] mb-3">
                {cat.label}
              </p>
              <ul className="flex flex-col gap-1.5">
                {cat.items.map((item) => {
                  const iconSrc = getIconSrc(item);
                  return (
                    <li
                      key={item}
                      className="poppins-light text-sm text-[var(--gray-1)] leading-relaxed flex items-center gap-2"
                    >
                      {iconSrc ? (
                        <span className="flex shrink-0 w-5 h-5 rounded overflow-hidden bg-white/5 flex items-center justify-center">
                          <img
                            src={iconSrc}
                            alt=""
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] object-contain grayscale opacity-90"
                          />
                        </span>
                      ) : null}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Skills };
