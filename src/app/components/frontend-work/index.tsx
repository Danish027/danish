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
  liveLink: string;
  figmaLink?: string;
};

type FrontendWorkPreview = Pick<
  FrontendWork,
  "number" | "title" | "category" | "year" | "image" | "color"
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
    color: "0, 122, 255",
  },
  {
    number: "02",
    title: "CleverApply",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/cleverapply-hero.svg",
    color: "121, 35, 208",
  },
  {
    number: "03",
    title: "OdisAI",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/odisaai-hero.svg",
    color: "236, 72, 153",
  },
  {
    number: "04",
    title: "Adravision",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/adravision-hero.svg",
    color: "77, 128, 237",
  },
  {
    number: "05",
    title: "Frontline Data Solutions",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/frontline-hero.svg",
    color: "34, 197, 94",
  },
  {
    number: "06",
    title: "Fulminare Holdings",
    category: "Frontend Redesign",
    year: "2024",
    image: "/work/frontend/fulminar-hero.svg",
    color: "168, 85, 247",
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
  const marqueeWorks = [...frontendWorks, ...frontendWorks];

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
            Cool UI I Built
          </motion.h2>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeInUpVariants}
          className="w-screen overflow-hidden"
        >
          <motion.div
            className="flex w-max items-stretch gap-3 sm:gap-4 px-3 sm:px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: marqueeDuration,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            {marqueeWorks.map((work, index) => (
              <button
                key={`${work.number}-${index}`}
                type="button"
                onClick={() => handleWorkClick(work)}
                className="group relative shrink-0 w-[82vw] min-[480px]:w-[70vw] sm:w-[520px] lg:w-[560px] h-[220px] sm:h-[300px] lg:h-[340px] rounded-[18px] sm:rounded-[22px] overflow-hidden text-left cursor-pointer"
                aria-label={`Open ${work.title} details`}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover object-left-top rounded-[18px] sm:rounded-[22px] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 520px, 560px"
                  loading="lazy"
                />
              </button>
            ))}
          </motion.div>
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
    </motion.div>
  );
};

export default FrontendWork;
