"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./components/hero/Navbar";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variants,
} from "motion/react";
import MouseGradient from "./components/MouseGradient";
import About from "./components/about";
import Contact from "./components/contact";
import Projects from "./components/projects";
import SectionSpacer from "./components/SectionSpacer";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import Loader from "./components/Loader";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ArrowUpRight } from "lucide-react";
import { ArtPlum } from "./components/hero/ArtPlum";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.12,
      delay: 0.4,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const rootElementRef = useRef<HTMLElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkIsMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    rootElementRef.current =
      document.getElementById("root") ??
      document.getElementById("__next") ??
      document.querySelector("main");
  }, []);

  // Live clock — IST (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const isTouchDevice = useIsTouchDevice();

  // ----- Scroll animations ----- //
  const { scrollYProgress } = useScroll();
  const backgroundGradient = useMotionValue("#000000");
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const handleScroll = useCallback(
    (latest: number) => {
      requestAnimationFrame(() => {
        if (typeof document === "undefined") return;
        const progress = !isMobile
          ? Math.max(0, Math.min((latest - 0.1) / 0.1, 1))
          : Math.max(0, Math.min((latest - 0.03) / 0.1, 1));

        const r = Math.round(255 * progress);
        backgroundGradient.set(`rgb(${r}, ${r}, ${r})`);

        const rootElement = rootElementRef.current;
        if (progress < 0.1) {
          document.body.style.backgroundColor = "#000000";
          if (rootElement) rootElement.style.backgroundColor = "#000000";
          document.documentElement.style.backgroundColor = "#000000";
        } else if (progress > 0.3) {
          document.body.style.backgroundColor = "#ffffff";
          if (rootElement) rootElement.style.backgroundColor = "#ffffff";
          document.documentElement.style.backgroundColor = "#ffffff";
        }
      });
    },
    [isMobile],
  );

  useMotionValueEvent(scrollYProgress, "change", handleScroll);

  // ----- Loading Animation ----- //
  const [isLoading, setIsLoading] = useState(true);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <ReactLenis root>
      <Loader onLoadingComplete={() => setIsLoading(false)} />

      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <MouseGradient isMobile={isMobile} />

        {/* Hero Section */}
        <motion.div
          style={{ background: backgroundGradient }}
          className="w-screen overflow-hidden h-screen flex flex-col bg-black relative"
        >
          <ArtPlum isLoading={isLoading} />
          <Navbar />
          <motion.div
            initial={initialState}
            animate={isLoading ? "hidden" : "visible"}
            variants={heroContainerVariants}
            style={{ opacity: isMobile ? 1 : heroContentOpacity }}
            className="flex flex-col justify-center flex-1 px-8 md:px-16 lg:px-24 max-w-[1100px] w-full relative z-[2]"
          >
            {/* Name */}
            <motion.h1
              variants={heroItemVariants}
              className="khula-extrabold text-[12vw] md:text-[5.5rem] text-white leading-[1.05] tracking-tight"
            >
              Mohammed
              <br />
              Danish
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={heroItemVariants}
              className="poppins-light text-[3.8vw] md:text-lg text-[var(--gray-2)] mt-6 max-w-[480px] leading-relaxed"
            >
              Founding Engineer at{" "}
              <span className="text-white poppins-regular">Seashell</span>{" "}
              &middot; Founder of{" "}
              <span className="text-white poppins-regular">Invoiceapp.io</span>
            </motion.p>

            {/* Info row */}
            <motion.div
              variants={heroItemVariants}
              className={`flex items-center gap-4 md:gap-6 mt-10 ${isMobile ? "flex-col items-start gap-3" : "flex-row"}`}
            >
              {/* Location + Clock */}
              <div className="flex items-center gap-2 poppins-light text-sm text-[var(--gray-3)]">
                <span>Bangalore, India</span>
                {currentTime && (
                  <>
                    <span className="text-[var(--gray-4)]">&middot;</span>
                    <span className="tabular-nums">{currentTime} IST</span>
                  </>
                )}
              </div>

              {!isMobile && <div className="h-3.5 w-px bg-[var(--gray-4)]" />}

              {/* Open for Remote */}
              <div className="flex items-center gap-2 poppins-light text-sm text-[var(--gray-2)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Open for Remote Work
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={heroItemVariants} className="mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 border border-[var(--gray-3)] rounded-full px-5 py-2.5 text-white poppins-regular text-sm hover:bg-white hover:text-black transition-colors duration-300 select-none cursor-pointer"
              >
                Let&apos;s Talk
                <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* about section */}
        <div ref={aboutRef} id="about">
          <About
            isAboutInView={useInView(aboutRef, { amount: 0.3 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        {/* section spacer */}
        <SectionSpacer height={300} backgroundGradient={backgroundGradient} />

        {/* projects section */}
        <div ref={projectsRef} id="projects" className="relative">
          <Projects
            isProjectsInView={useInView(projectsRef, {
              amount: isTouchDevice ? 0.1 : 0.3,
            })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        {/* contact section */}
        <div ref={contactRef} id="contact" className="relative">
          <Contact
            isContactInView={useInView(contactRef, { amount: 0.5 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
