import {
  MotionValue,
  useAnimationControls,
  motion,
  Variants,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "../Magnetic";
import { useLenis } from "@studio-freight/react-lenis";

type AboutSectionProps = {
  isAboutInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
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
};

const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      type: "tween",
    },
  },
};

const About: React.FC<AboutSectionProps> = ({
  isAboutInView,
  isMobile,
  backgroundGradient,
}) => {
  const aboutControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isAboutInView && !hasAnimated) {
      aboutControls.start("visible");
      setHasAnimated(true);
    } else if (!isAboutInView && hasAnimated) {
      aboutControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isAboutInView, aboutControls, hasAnimated, setHasAnimated]);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-full min-w-0 overflow-x-hidden flex justify-center items-start relative z-10 py-12 sm:py-20"
    >
      <motion.div
        initial={initialState}
        animate={aboutControls}
        className="max-w-[1000px] w-full px-6 sm:px-6 md:px-4 pt-52"
      >
        <motion.h1
          variants={fadeInUpVariants}
          custom={0}
          className="khula-semibold text-2xl min-[480px]:text-3xl sm:text-5xl leading-[1.3] break-words"
        >
          I care about building products that solve real problems, feel
          intuitive to use, and are crafted with attention to every detail.
        </motion.h1>

        <motion.div
          variants={fadeInUpVariants}
          custom={1}
          className="mt-8 sm:mt-[10vh]"
        >
          <p className="text-gray-3 poppins-light-italic ml-0 sm:ml-2 mb-1 select-none text-sm sm:text-base">
            The journey so far —{" "}
            <span className="text-black/90 font-medium not-italic">
              2+ years of experience
            </span>
          </p>
          <motion.hr
            variants={lineVariants}
            className="bg-gray-3 origin-left w-full"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-0 mt-10 sm:mt-16">
          <div className="flex flex-col w-full sm:w-1/2 min-w-0">
            <motion.h2
              variants={fadeInUpVariants}
              custom={2}
              className="khula-light text-3xl sm:text-5xl"
            >
              Background
            </motion.h2>
            {!isMobile && (
              <Magnetic>
                <motion.button
                  variants={fadeInUpVariants}
                  custom={3}
                  onClick={() => lenis?.scrollTo("#contact")}
                  className="flex bg-black rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max poppins-regular mt-24 select-none text-white"
                >
                  <ArrowUpRight />
                  Get in Touch
                </motion.button>
              </Magnetic>
            )}
          </div>

          <div className="flex flex-col gap-y-4 w-full sm:w-1/2 min-w-0 khula-light text-base sm:text-2xl">
            <motion.p variants={fadeInUpVariants} custom={4}>
              Graduated in 2024 with a B.Tech in Computer Science &amp;
              Engineering. In 2022, I started building Invoiceapp, a platform to
              create invoices and track payments, driven by a desire to build
              complete products from the ground up.
            </motion.p>
            <motion.p variants={fadeInUpVariants} custom={5}>
              In 2023, I joined Seashell as a Founding Engineer, building a
              software platform that serves as packaging&apos;s three-sided
              marketplace in the United States. I work across the entire stack,
              from design to deployment, and thrive where creativity meets
              engineering.
            </motion.p>
          </div>

          {isMobile && (
            <motion.button
              variants={fadeInUpVariants}
              custom={3}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex bg-black text-white rounded-full pl-4 pr-6 gap-x-1 py-2 w-max h-fit poppins-regular select-none mt-4"
            >
              <ArrowUpRight />
              Get in Touch
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
