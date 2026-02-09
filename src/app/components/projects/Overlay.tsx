import { ArrowUpRight } from "lucide-react";
import { Project } from ".";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { useEffect } from "react";

export default function Overlay({
  project,
  isMobile,
  onClose,
}: {
  project: Project;
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
            {project.title}
          </h1>
          <Magnetic>
            <a
              href={project.link}
              target="_blank"
              className="cursor-pointer hover:bg-light hover:text-dark rounded-full size-12 transition-colors ease-in duration-300"
              title={project.title.includes("Portfolio") ? "Figma Design" : ""}
            >
              <ArrowUpRight size={48} className="mb-2" />
            </a>
          </Magnetic>
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
                {project.description}
              </p>
              <hr className="w-[350px] border-gray-2 mt-2" />
              <div className="poppins-regular text-base text-gray-1 mt-8 mb-[4vh] max-w-[500px] w-full flex-col flex">
                <p className="flex gap-x-1 poppins-regular text-base text-gray-1">
                  <span className="khula-light mt-[3px]">Frontend: </span>
                  {project.technologies.frontend}
                </p>
                <p className="flex gap-x-1 poppins-regular text-base text-gray-1">
                  <span className="khula-light mt-[3px]">Backend: </span>
                  {project.technologies.backend.includes("Not Involved") ? (
                    <i>Not Involved</i>
                  ) : (
                    project.technologies.backend
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {project.images.map((image, index) => (
              <motion.img
                key={index}
                className="w-full object-cover object-top rounded-2xl select-none"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow:
                    "0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
                }}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
