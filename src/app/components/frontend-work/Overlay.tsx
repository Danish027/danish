import { ArrowUpRight } from "lucide-react";
import { FrontendWork } from ".";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { useEffect } from "react";
import Image from "next/image";

export default function FrontendWorkOverlay({
  work,
  isMobile,
  onClose,
}: {
  work: FrontendWork;
  isMobile: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  return (
    <motion.div
      data-lenis-prevent
      className="text-white inset-0 overflow-y-scroll overflow-x-hidden fixed max-h-[100vh] px-4 w-full flex justify-center pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div
        style={{ marginTop: !isMobile ? "20vh" : "2.5rem" }}
        className="max-w-[1000px] w-full"
      >
        <div
          className={`flex flex-row items-center ${!isMobile ? "justify-between" : "justify-start gap-x-2"} w-full mb-[4vh] pr-12`}
        >
          <h1 className="khula-regular max-sm:text-[12vw] text-8xl tracking-[calc(6rem * 0.03)]">
            {work.title}
          </h1>
          <div className="flex flex-row gap-x-2">
            <Magnetic>
              <a
                href={work.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:bg-light hover:text-dark rounded-full size-12 transition-colors ease-in duration-300 flex items-center justify-center"
                title="Live Site"
              >
                <ArrowUpRight size={48} className="mb-2" />
              </a>
            </Magnetic>
            {work.figmaLink && (
              <Magnetic>
                <a
                  href={work.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:bg-light hover:text-dark rounded-full size-12 transition-colors ease-in duration-300 flex items-center justify-center"
                  title="Figma Design"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-2"
                  >
                    <path
                      d="M8 24C11.3137 24 14 21.3137 14 18V15H8C4.68629 15 2 17.6863 2 21C2 21.5523 2.44772 22 3 22H8V24Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 13H14C17.3137 13 20 10.3137 20 7C20 3.68629 17.3137 1 14 1H8C4.68629 1 2 3.68629 2 7C2 10.3137 4.68629 13 8 13Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 15C4.68629 15 2 12.3137 2 9C2 5.68629 4.68629 3 8 3V15Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className="flex flex-row gap-x-12"
            style={{ flexDirection: isMobile ? "column" : "row" }}
          >
            <div>
              <p className="khula-light text-sm tracking-[calc(0.875rem * 0.05)] uppercase text-gray-1">
                Description
              </p>
              <hr className="w-[350px] border-gray-2 mt-2" />
              <p className="poppins-regular text-base text-gray-1 overflow-y-auto overflow-x-hidden mt-8 mb-[4vh] max-w-[500px] w-full">
                {work.description}
              </p>
            </div>
            <div>
              <p className="khula-light text-sm tracking-[calc(0.875rem * 0.05)] uppercase text-gray-1">
                Technologies
              </p>
              <hr className="w-[350px] border-gray-2 mt-2" />
              <p className="poppins-regular text-base text-gray-1 mt-8 mb-[4vh] max-w-[500px] w-full">
                {work.technologies}
              </p>
            </div>
          </div>
          <Image
            className="w-full object-cover object-top rounded-2xl select-none mb-12"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            src={work.imageDetail}
            alt={`${work.title} detail`}
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </motion.div>
  );
}
