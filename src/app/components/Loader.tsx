import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

type LoaderProps = {
  onLoadingComplete: () => void;
};

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [show, setShow] = useState<boolean>(true);
  const controlsM = useAnimation();
  const controlsD = useAnimation();
  const animationCompleted = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const animateSvg = async () => {
      document.body.style.cursor = "wait";

      // Animate "m" letter first
      await controlsM.start({
        pathLength: 1,
        strokeWidth: 2,
        transition: {
          pathLength: { duration: 1.2, ease: "easeInOut" },
          strokeWidth: { duration: 0 },
        },
      });

      // Then animate "d" letter
      await controlsD
        .start({
          pathLength: 1,
          strokeWidth: 2,
          transition: {
            pathLength: { duration: 1, ease: "easeInOut" },
            strokeWidth: { duration: 0 },
          },
        })
        .then(() => {
          document.body.style.cursor = "auto";
        });

      // Wait 300ms after animation completes
      await new Promise((resolve) => setTimeout(resolve, 300));

      animationCompleted.current = true;

      if (document.readyState === "complete") {
        setShow(false);
      } else {
        window.addEventListener("load", handlePageLoad);
      }
    };

    const handlePageLoad = () => {
      if (animationCompleted.current) {
        setShow(false);
      }
    };

    animateSvg();

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [controlsM, controlsD]);

  // Call onLoadingComplete when the loader starts to fade out
  useEffect(() => {
    if (!show) {
      onLoadingComplete();
    }
  }, [show, onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 9999,
          }}
        >
          <motion.svg
            width="160"
            height="100"
            viewBox="0 0 51 32"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Letter "m" - stems from baseline (y=28) to y=21, arcs peak at x-height (y=15) */}
            <motion.path
              d="M 4 28 L 4 21 A 6 6 0 0 1 16 21 L 16 28 L 16 21 A 6 6 0 0 1 28 21 L 28 28"
              fill="none"
              stroke="#000000"
              strokeWidth="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, strokeWidth: 0 }}
              animate={controlsM}
            />
            {/* Letter "d" - original path mirrored to place bowl on left of stem */}
            <motion.path
              d="M 8 2 V 28 M 8 22 A 7 7 0 1 1 8 22.01"
              transform="translate(55 0) scale(-1 1)"
              fill="none"
              stroke="#000000"
              strokeWidth="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, strokeWidth: 0 }}
              animate={controlsD}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
