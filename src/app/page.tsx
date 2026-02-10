"use client";

import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import MouseGradient from "./components/MouseGradient";
import About from "./components/about";
import { Skills } from "./components/about/Skills";
import SectionSpacer from "./components/SectionSpacer";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import Loader from "./components/Loader";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Hero } from "./components/hero";

const Projects = lazy(() => import("./components/projects"));
const FrontendWork = lazy(() => import("./components/frontend-work"));
const Contact = lazy(() => import("./components/contact"));

function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const frontendWorkRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const rootElementRef = useRef<HTMLElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

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

  const isTouchDevice = useIsTouchDevice();

  // ----- Scroll animations ----- //
  const { scrollYProgress } = useScroll();
  const backgroundGradient = useMotionValue("#000000");
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const artPlumOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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

  return (
    <ReactLenis root>
      <Loader onLoadingComplete={() => setIsLoading(false)} />

      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <MouseGradient isMobile={isMobile} />

        {/* Hero Section */}
        <Hero
          isLoading={isLoading}
          isMobile={isMobile}
          backgroundGradient={backgroundGradient}
          heroContentOpacity={heroContentOpacity}
          artPlumOpacity={artPlumOpacity}
        />

        {/* about section */}
        <div ref={aboutRef} id="about">
          <About
            isAboutInView={useInView(aboutRef, { amount: 0.3 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        {/* skills section */}
        <div ref={skillsRef} id="skills">
          <Skills
            isSkillsInView={useInView(skillsRef, { amount: 0.2 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        {/* section spacer */}
        <SectionSpacer
          height={isMobile ? 100 : 200}
          backgroundGradient={backgroundGradient}
        />

        {/* projects section */}
        <div ref={projectsRef} id="projects" className="relative">
          <Suspense fallback={null}>
            <Projects
              isProjectsInView={useInView(projectsRef, {
                amount: isTouchDevice ? 0.1 : 0.3,
              })}
              isMobile={isMobile}
              backgroundGradient={backgroundGradient}
            />
          </Suspense>
        </div>

        {/* section spacer */}
        <SectionSpacer
          height={isMobile ? 100 : 200}
          backgroundGradient={backgroundGradient}
        />

        {/* frontend work section */}
        <div ref={frontendWorkRef} id="frontend-work" className="relative">
          <Suspense fallback={null}>
            <FrontendWork
              isFrontendWorkInView={useInView(frontendWorkRef, {
                amount: isTouchDevice ? 0.1 : 0.3,
              })}
              isMobile={isMobile}
              backgroundGradient={backgroundGradient}
            />
          </Suspense>
        </div>

        {/* contact section */}
        <div ref={contactRef} id="contact" className="relative">
          <Suspense fallback={null}>
            <Contact
              isContactInView={useInView(contactRef, { amount: 0.5 })}
              isMobile={isMobile}
              backgroundGradient={backgroundGradient}
            />
          </Suspense>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
