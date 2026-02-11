import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  MotionValue,
  motion,
  AnimatePresence,
  useSpring,
  useAnimationControls,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import Curve from "../projects/Curve";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import FrontendWorkOverlay from "./Overlay";

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

const FrontendWork: React.FC<FrontendWorkSectionProps> = ({
  isFrontendWorkInView,
  isMobile,
  backgroundGradient,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isScrolling, setIsScrolling] = useState(false);

  const isTouchDevice = useIsTouchDevice();

  const frontendWorkControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 50 });

  const frontendWorks: FrontendWork[] = [
    {
      number: "01",
      title: "Bluum Finance",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/bluum-hero.webp",
      imageDetail: "/work/frontend/bluum.webp",
      description:
        "Bluum Finance provides embedded investing infrastructure for platforms. It enables financial institutions to add stocks, ETFs, and other asset classes to their apps with a single API. The platform offers global market access, multiple asset classes, and enterprise-grade security with SOC 2 certification.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "0, 122, 255",
      liveLink: "https://bluum-finance.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/dwVb6sFRKhoUR3Pj7e26Lx/Bluum?m=auto&t=r3rTHWJeSfJ4of9I-6",
    },
    {
      number: "02",
      title: "CleverApply",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/cleverapply-hero.webp",
      imageDetail: "/work/frontend/cleverapply.webp",
      description:
        "CleverApply is an AI-powered enrollment intelligence suite for educational institutions. It provides clarity, automation, and strategic insight to scale international enrollment with a single platform. The solution helps institutions expand their reach, centralize operations, and automate workflows for better student management.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "121, 35, 208",
      liveLink: "https://cleverapply.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/t2fzi9d77lbveY3j1ski0e/CleverApply?m=auto&t=r3rTHWJeSfJ4of9I-6",
    },
    {
      number: "03",
      title: "OdisAI",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/odisaai-hero.webp",
      imageDetail: "/work/frontend/odisaai.webp",
      description:
        "OdisAI is an AI-powered voice assistant for veterinary clinics that never misses a call. The platform handles inbound calls, automates discharge follow-ups, and books appointments 24/7. It integrates with practice management systems and helps clinics recover lost revenue from missed calls while freeing staff to focus on in-clinic care.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "236, 72, 153",
      liveLink: "https://odisai.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/udldQkSAtmvXa2QX4kFBTx/OdisaAI?m=auto&t=r3rTHWJeSfJ4of9I-6",
    },
    {
      number: "04",
      title: "Adravision",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/adravision-hero.webp",
      imageDetail: "/work/frontend/adravision.webp",
      description:
        "Adravision is a modern dental automation suite powered by AI. The platform improves workflows and extracts insights for dental organizations, providing solutions for payers, clinics, and DSOs. It enhances patient communication with clear visualizations and streamlines clinical operations through automation.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "77, 128, 237",
      liveLink: "https://adravision.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/2eidprH1ESnJeiUnvmzL6T/Adravision?m=auto&t=r3rTHWJeSfJ4of9I-6",
    },

    {
      number: "05",
      title: "Frontline Data Solutions",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/frontline-hero.webp",
      imageDetail: "/work/frontend/frontline.webp",
      description:
        "Frontline Data Solutions provides EHS (Environmental, Health, and Safety) software that simplifies safety management. The platform offers configurable, user-friendly solutions for operational management of change, incident management, employee training, and contractor management. It helps organizations automate repetitive safety tasks and maintain compliance.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "34, 197, 94",
      liveLink: "https://fldata.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/ljyFH6cnmUsvLRHujmO73D/Frontline?m=auto&t=r3rTHWJeSfJ4of9I-1",
    },
    {
      number: "06",
      title: "Fulminare Holdings",
      category: "Frontend Redesign",
      year: "2024",
      image: "/work/frontend/fulminar-hero.webp",
      imageDetail: "/work/frontend/fulminar.webp",
      description:
        "Fulminare Holdings specializes in crafting subscription-based apps that bridge the gap between viral influence and lasting utility. The company collaborates with top influencers to develop iOS apps that are socially engaging and purpose-driven, focusing on behavioral attribution, adaptive monetization, and AI-powered personalization.",
      technologies: "NextJS, TypeScript, TailwindCSS, Motion",
      color: "168, 85, 247",
      liveLink: "https://fulminareholdings.vercel.app/",
      figmaLink:
        "https://www.figma.com/design/EMZEYjn27cBzZqqD0LzRMe/Fulminar?m=auto&t=r3rTHWJeSfJ4of9I-1",
    },
  ];

  useEffect(() => {
    if (isFrontendWorkInView && !hasAnimated) {
      frontendWorkControls.start("visible");
      setTimeout(() => {
        setHasAnimated(true);
      }, 500);
    } else if (!isFrontendWorkInView && hasAnimated) {
      frontendWorkControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isFrontendWorkInView, frontendWorkControls, hasAnimated]);

  // Ensure mobile view is always visible
  useEffect(() => {
    if (isMobile || isTouchDevice) {
      frontendWorkControls.start("visible");
    }
  }, [isMobile, isTouchDevice, frontendWorkControls]);

  // ----- Hover effect ----- //

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 100);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (typeof window === "undefined") return;

    const items = itemsRef.current;
    if (!items) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const checkHover = () => {
      if (isScrolling) {
        const hoverItem = document.elementFromPoint(
          cursorX.get(),
          cursorY.get(),
        );
        const projectItem = hoverItem?.closest(".frontend-work-item");
        if (projectItem) {
          const index = Array.from(items.children).indexOf(
            projectItem as Element,
          );
          setActiveIndex(index);
        } else {
          setActiveIndex(-1);
        }
      }
    };

    items.addEventListener("mouseleave", () => {
      setActiveIndex(-1);
    });

    const scrollCheckInterval = setInterval(checkHover, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(scrollCheckInterval);
    };
  }, [isMobile, handleMouseMove, handleScroll, cursorX, cursorY, isScrolling]);

  // ----- Overlay ----- //

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState<FrontendWork | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleWorkClick = (work: FrontendWork) => {
    setSelectedWork(work);
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 800);
  };

  const lenis = useLenis();

  useEffect(() => {
    if (isOverlayVisible) {
      lenis?.stop();
      document.documentElement.style.overflowY = "hidden";
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      lenis?.start();
      document.documentElement.style.overflowY = "auto";
    }
  }, [isOverlayVisible]);

  // Images are lazy-loaded via next/image — no eager preloading needed

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{
        background: backgroundGradient,
        zIndex: isOverlayVisible ? 20 : 10,
      }}
      initial={initialState}
      animate={frontendWorkControls}
      className="w-full min-h-screen flex justify-center flex-col items-center relative z-10"
    >
      {isTouchDevice || (!isTouchDevice && isMobile) ? (
        <motion.div className="w-full px-4 py-8">
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl sm:text-4xl tracking-[calc(3rem * 0.02)] text-left mb-12"
          >
            Frontend Redesign Works
          </motion.h2>

          {/* Mobile Version: Card like design */}
          <div className="flex flex-col gap-12 sm:gap-6 w-full mx-auto">
            {frontendWorks.map((work, index) => (
              <motion.div
                key={work.number}
                className="w-full flex flex-col items-start cursor-pointer"
                variants={fadeInUpVariants}
                onClick={() => handleWorkClick(work)}
                custom={index + 1}
              >
                <div
                  key={work.number}
                  className="w-full aspect-[77/44] rounded-xl relative overflow-hidden"
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <h1 className="khula-regular text-3xl sm:text-4xl mt-6 text-left">
                  {work.title}
                </h1>
                <div className="hidden sm:flex flex-col gap-y-1 w-full text-left mt-1">
                  <p className="poppins-extralight text-base sm:text-lg text-left">
                    {work.category}
                  </p>
                  <p className="poppins-extralight text-base sm:text-lg text-left">
                    {work.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate={frontendWorkControls}
          className="max-w-[1000px] w-full flex justify-center flex-col items-center px-4"
        >
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl tracking-[calc(3rem * 0.02)] mb-10"
          >
            Frontend Redesign Works
          </motion.h2>

          {hasAnimated && (
            <AnimatePresence>
              {activeIndex !== -1 && (
                <motion.div
                  ref={galleryRef}
                  className="fixed w-[385px] h-[200px] overflow-hidden pointer-events-none z-40 rounded-xl"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    left: cursorX,
                    top: cursorY,
                    x: "-50%",
                    y: "-50%",
                  }}
                >
                  <motion.div
                    ref={imagesRef}
                    className="w-full h-[1200px] flex flex-col"
                    animate={{ y: `-${200 * activeIndex}px` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {frontendWorks.map((work) => (
                      <Image
                        key={work.number}
                        className="w-full h-[200px] object-cover object-center"
                        src={work.image}
                        alt={work.title}
                        width={385}
                        height={200}
                        loading="lazy"
                        sizes="385px"
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <div
            ref={itemsRef}
            className="flex justify-center items-center flex-col w-full"
          >
            {frontendWorks.map((work, index) => (
              <motion.div
                key={work.number}
                className="flex flex-col w-full group frontend-work-item cursor-pointer"
                style={{ willChange: "transform, opacity" }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleWorkClick(work)}
                variants={fadeInUpVariants}
                custom={index + 1}
              >
                <div className="w-full flex justify-between items-center h-[200px]">
                  <div className="flex justify-start items-start h-fit gap-x-4">
                    <p className="poppins-extralight text-2xl leading-none group-hover:text-gray-2 text-gray-3 transition-colors">
                      {work.number}
                    </p>
                    <h1 className="khula-regular text-6xl tracking-[calc(3.75rem * 0.03)] group-hover:text-gray-2 transition-all group-hover:ml-2">
                      {work.title}
                    </h1>
                  </div>
                  <p className="poppins-extralight text-lg pr-2 group-hover:text-gray-2 group-hover:pr-4 transition-all">
                    {work.category}
                  </p>
                </div>
                <hr className="w-full border-gray-1 group-hover:border-gray-4 transition-colors"></hr>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

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
