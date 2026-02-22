import React, { useEffect, useState } from "react";
import {
  MotionValue,
  motion,
  AnimatePresence,
  useAnimationControls,
  Variants,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import Curve from "../projects/Curve";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

type FrontendWorkSectionProps = {
  isFrontendWorkInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

export type FrontendWork = {
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageDetail: string;
  description: string;
  technologies: string;
  color: string;
  baseBackground?: "white" | "black";
  liveLink: string;
  figmaLink?: string;
};

type FrontendWorkPreview = Pick<
  FrontendWork,
  | "number"
  | "title"
  | "category"
  | "year"
  | "image"
  | "color"
  | "baseBackground"
>;

const FrontendWorkOverlay = dynamic(() => import("./Overlay"), {
  ssr: false,
});

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.2,
      type: "tween",
      useNativeDriver: true,
    },
  }),
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.4,
      ease: "easeIn",
      type: "tween",
    },
  },
};

const frontendWorks: FrontendWorkPreview[] = [
  {
    number: "01",
    title: "Bluum Finance",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/bluum-hero.svg",
    color: "#6B8A5E",
    baseBackground: "white",
  },
  {
    number: "02",
    title: "CleverApply",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/cleverapply-hero.svg",
    color: "#FF5959",
    baseBackground: "white",
  },
  {
    number: "03",
    title: "OdisAI",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/odisaai-hero.svg",
    color: "#135450",
    baseBackground: "white",
  },
  {
    number: "04",
    title: "Adravision",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/adravision-hero.svg",
    color: "#0D2120",
    baseBackground: "black",
  },
  {
    number: "05",
    title: "Frontline Data Solutions",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/frontline-hero.svg",
    color: "#2A4568",
    baseBackground: "white",
  },
  {
    number: "06",
    title: "Fulminare Holdings",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/fulminar-hero.svg",
    color: "#19EBCC",
    baseBackground: "black",
  },
];

const FrontendWork: React.FC<FrontendWorkSectionProps> = ({
  isFrontendWorkInView,
  isMobile,
  backgroundGradient,
}) => {
  const frontendWorkControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState<FrontendWork | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const isTouchDevice = useIsTouchDevice();
  const lenis = useLenis();

  useEffect(() => {
    if (isFrontendWorkInView && !hasAnimated) {
      frontendWorkControls.start("visible");
      const animationDoneTimer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(animationDoneTimer);
    }

    if (!isFrontendWorkInView && hasAnimated) {
      frontendWorkControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isFrontendWorkInView, frontendWorkControls, hasAnimated]);

  useEffect(() => {
    if (isMobile || isTouchDevice) {
      frontendWorkControls.start("visible");
    }
  }, [isMobile, isTouchDevice, frontendWorkControls]);

  const handleWorkClick = async (work: FrontendWorkPreview) => {
    setSelectedWork(null);
    setIsContentVisible(false);
    setIsOverlayVisible(true);
    try {
      const { frontendWorkDetails } = await import("./work-details");
      const detail = frontendWorkDetails[work.number];
      if (!detail) {
        setIsOverlayVisible(false);
        return;
      }
      setSelectedWork({ ...work, ...detail });
    } catch {
      setIsOverlayVisible(false);
    }
  };

  const closeOverlay = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsOverlayVisible(false);
      setSelectedWork(null);
    }, 800);
  };

  useEffect(() => {
    if (isOverlayVisible) {
      lenis?.stop();
      document.documentElement.style.overflowY = "hidden";
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    lenis?.start();
    document.documentElement.style.overflowY = "auto";
  }, [isOverlayVisible, lenis]);

  const initialState = isMobile ? "visible" : "hidden";
  const marqueeDuration = isMobile || isTouchDevice ? 48 : 38;
  const renderWorkCard = (work: FrontendWorkPreview, key: string) => {
    const isDarkBase = work.baseBackground === "black";
    const cardBackground = isDarkBase
      ? `radial-gradient(circle at 14% 10%, ${work.color}42 0%, ${work.color}1F 38%, rgba(0, 0, 0, 0) 72%), linear-gradient(155deg, #050505 0%, #0B0B0B 62%, ${work.color}1A 100%)`
      : `radial-gradient(circle at 14% 10%, ${work.color}2C 0%, ${work.color}12 38%, rgba(255, 255, 255, 0) 72%), linear-gradient(155deg, #FFFFFF 0%, #F8F8F8 62%, ${work.color}1A 100%)`;

    return (
      <button
        key={key}
        type="button"
        onClick={() => handleWorkClick(work)}
        className="relative shrink-0 w-[86vw] min-[480px]:w-[74vw] sm:w-[600px] lg:w-[660px] h-[232px] sm:h-[336px] lg:h-[396px] rounded-2xl overflow-hidden text-left cursor-pointer pt-5 pl-5 sm:pt-7 sm:pl-7 border"
        style={{
          background: cardBackground,
          borderColor: isDarkBase ? `${work.color}3D` : `${work.color}33`,
        }}
        aria-label={`Open ${work.title} details`}
      >
        <div
          className="relative overflow-hidden rounded-xl w-[calc(100%+1.25rem)] h-[calc(100%+1.25rem)] sm:w-[calc(100%+1.75rem)] sm:h-[calc(100%+1.75rem)] p-1 sm:p-1.5"
          style={{
            border: `0.8px solid ${isDarkBase ? "rgba(255, 255, 255, 0.30)" : "rgba(0, 0, 0, 0.15)"}`,
            backgroundColor: isDarkBase
              ? "rgba(255, 255, 255, 0.10)"
              : "rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[10px]"
            style={{
              border: `0.8px solid ${isDarkBase ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 0, 0, 0.12)"}`,
              backgroundColor: isDarkBase ? "#080808" : "#ffffff",
            }}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover object-left-top"
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 600px, 660px"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                border: `0.6px solid ${isDarkBase ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)"}`,
              }}
            />
          </div>
        </div>
      </button>
    );
  };

  return (
    <motion.div
      style={{
        background: backgroundGradient,
        zIndex: isOverlayVisible ? 20 : 10,
      }}
      initial={initialState}
      animate={frontendWorkControls}
      className="w-full min-h-screen flex justify-center flex-col items-center relative z-10 py-12 sm:py-16 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={frontendWorkControls}
        className="w-full"
      >
        <motion.div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 mb-8 sm:mb-10">
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl sm:text-4xl tracking-[calc(3rem * 0.02)] text-center mb-12"
          >
            Some of My Recent Frontend Work
          </motion.h2>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeInUpVariants}
          className="w-screen overflow-hidden"
        >
          <div
            className="frontend-work-marquee"
            style={{ animationDuration: `${marqueeDuration}s` }}
          >
            <div className="frontend-work-marquee-lane">
              {frontendWorks.map((work) =>
                renderWorkCard(work, `lane-a-${work.number}`),
              )}
            </div>
            <div className="frontend-work-marquee-lane" aria-hidden="true">
              {frontendWorks.map((work) =>
                renderWorkCard(work, `lane-b-${work.number}`),
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(isOverlayVisible || selectedWork) && (
          <>
            <Curve isVisible={isOverlayVisible} />
            <motion.div
              className="fixed inset-0 w-full z-[999] flex items-center justify-center"
              style={{ pointerEvents: isContentVisible ? "auto" : "none" }}
              initial="hidden"
              animate={isOverlayVisible ? "visible" : "exit"}
              exit="exit"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {isContentVisible && selectedWork && (
                  <FrontendWorkOverlay
                    work={selectedWork}
                    isMobile={isMobile}
                    onClose={closeOverlay}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            {isContentVisible && (
              <div className="fixed z-[9999] top-6 right-6 flex flex-col items-end gap-2">
                <button
                  onClick={closeOverlay}
                  className="px-4 py-2 text-white text-xl poppins-regular flex flex-row gap-x-2 items-center cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Close"
                >
                  <X size={32} />
                </button>
                <span className="text-xs text-gray-2 poppins-light opacity-60">
                  ESC
                </span>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
      <style jsx>{`
        .frontend-work-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          animation-name: frontend-work-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .frontend-work-marquee-lane {
          display: flex;
          align-items: stretch;
          gap: 0.75rem;
          padding-right: 0.75rem;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .frontend-work-marquee-lane {
            gap: 1rem;
            padding-right: 1rem;
          }
        }

        @keyframes frontend-work-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .frontend-work-marquee {
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FrontendWork;
