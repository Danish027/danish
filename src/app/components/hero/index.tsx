"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import { ArtPlum } from "./ArtPlum";
import Magnetic from "../Magnetic";
import Link from "next/link";

type HeroProps = {
  isLoading: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
  heroContentOpacity: MotionValue<number>;
  artPlumOpacity: MotionValue<number>;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
      delay: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const skills = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
];

function Hero({
  isLoading,
  isMobile,
  backgroundGradient,
  heroContentOpacity,
  artPlumOpacity,
}: HeroProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-full min-w-0 overflow-x-hidden h-screen flex flex-col bg-black relative"
    >
      <ArtPlum isLoading={isLoading} scrollOpacity={artPlumOpacity} />
      <Navbar />

      <motion.div
        initial={initialState}
        animate={isLoading ? "hidden" : "visible"}
        variants={containerVariants}
        style={{ opacity: isMobile ? 1 : heroContentOpacity }}
        className="flex flex-col items-start justify-center flex-1 max-w-[1000px] w-full mx-auto px-6 sm:px-6 md:px-4 relative z-[2] min-w-0"
      >
        {/* Greeting + availability */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap sm:flex-row flex-col items-start sm:items-center justify-start sm:justify-center gap-x-3 gap-y-2 mb-4 sm:mb-6"
        >
          <span className="poppins-regular text-[var(--gray-1)] tracking-wide text-base">
            Hi, I&apos;m Mohammed Danish
          </span>
          <span className="hidden sm:inline h-px w-6 bg-[var(--gray-3)] shrink-0" />
          <span className="flex items-center gap-1.5 text-xs poppins-light text-[var(--gray-2)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Available for remote work
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="khula-semibold text-white leading-[1.35] text-2xl min-[480px]:text-3xl sm:text-[2.5rem]"
        >
          Full Stack Engineer building products at{" "}
          <span className="text-[var(--gray-1)]">
            <Link
              href="https://seashell.com"
              target="_blank"
              className="break-all"
            >
              Seashell
            </Link>
            <span className="poppins-regular text-xs sm:text-sm align-top ml-1 text-[var(--gray-3)]">
              US
            </span>
          </span>{" "}
          and the founder of{" "}
          <span className="text-[var(--gray-1)]">
            <Link
              href="https://invoiceapp.io"
              target="_blank"
              className="break-all"
            >
              Invoiceapp.io
            </Link>
          </span>
        </motion.p>

        {/* Location + Clock */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mt-6 poppins-light text-xs sm:text-sm text-[var(--gray-3)] flex-wrap"
        >
          <span>Bangalore, India</span>
          {currentTime && (
            <>
              <span className="text-[var(--gray-4)]">&middot;</span>
              <span className="tabular-nums">{currentTime} IST</span>
            </>
          )}
        </motion.div>

        {/* Top Skills */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="poppins-medium text-[10px] sm:text-xs text-[var(--gray-3)] uppercase tracking-[0.15em] mb-2 sm:mb-3">
            Top Skills
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {skills.map((skill, i) => (
              <span key={i} className="flex items-center gap-x-2">
                <span className="poppins-regular text-xs sm:text-sm text-[var(--gray-1)]">
                  {skill}
                </span>
                {i < skills.length - 1 && (
                  <span className="text-[var(--gray-3)]">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
          <Magnetic>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-white text-black rounded-full px-6 py-2 sm:py-3 poppins-medium text-sm hover:bg-[var(--gray-1)] transition-colors duration-300 select-none cursor-pointer"
            >
              Let&apos;s Talk
              <ArrowUpRight size={16} />
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export { Hero };
