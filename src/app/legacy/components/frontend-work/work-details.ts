import type { FrontendWork } from ".";

type FrontendWorkDetail = Pick<
  FrontendWork,
  "imageDetail" | "description" | "technologies" | "liveLink" | "figmaLink"
>;

export const frontendWorkDetails: Record<string, FrontendWorkDetail> = {
  "01": {
    imageDetail: "/work/frontend/bluum.svg",
    description:
      "Bluum Finance provides embedded investing infrastructure for platforms. It enables financial institutions to add stocks, ETFs, and other asset classes to their apps with a single API. The platform offers global market access, multiple asset classes, and enterprise-grade security with SOC 2 certification.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://bluum-finance.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/dwVb6sFRKhoUR3Pj7e26Lx/Bluum?m=auto&t=r3rTHWJeSfJ4of9I-6",
  },
  "02": {
    imageDetail: "/work/frontend/cleverapply.svg",
    description:
      "CleverApply is an AI-powered enrollment intelligence suite for educational institutions. It provides clarity, automation, and strategic insight to scale international enrollment with a single platform. The solution helps institutions expand their reach, centralize operations, and automate workflows for better student management.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://cleverapply.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/t2fzi9d77lbveY3j1ski0e/CleverApply?m=auto&t=r3rTHWJeSfJ4of9I-6",
  },
  "03": {
    imageDetail: "/work/frontend/odisaai.svg",
    description:
      "OdisAI is an AI-powered voice assistant for veterinary clinics that never misses a call. The platform handles inbound calls, automates discharge follow-ups, and books appointments 24/7. It integrates with practice management systems and helps clinics recover lost revenue from missed calls while freeing staff to focus on in-clinic care.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://odisai.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/udldQkSAtmvXa2QX4kFBTx/OdisaAI?m=auto&t=r3rTHWJeSfJ4of9I-6",
  },
  "04": {
    imageDetail: "/work/frontend/adravision.svg",
    description:
      "Adravision is a modern dental automation suite powered by AI. The platform improves workflows and extracts insights for dental organizations, providing solutions for payers, clinics, and DSOs. It enhances patient communication with clear visualizations and streamlines clinical operations through automation.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://adravision.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/2eidprH1ESnJeiUnvmzL6T/Adravision?m=auto&t=r3rTHWJeSfJ4of9I-6",
  },
  "05": {
    imageDetail: "/work/frontend/frontline.svg",
    description:
      "Frontline Data Solutions provides EHS (Environmental, Health, and Safety) software that simplifies safety management. The platform offers configurable, user-friendly solutions for operational management of change, incident management, employee training, and contractor management. It helps organizations automate repetitive safety tasks and maintain compliance.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://fldata.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/ljyFH6cnmUsvLRHujmO73D/Frontline?m=auto&t=r3rTHWJeSfJ4of9I-1",
  },
  "06": {
    imageDetail: "/work/frontend/fulminar.svg",
    description:
      "Fulminare Holdings specializes in crafting subscription-based apps that bridge the gap between viral influence and lasting utility. The company collaborates with top influencers to develop iOS apps that are socially engaging and purpose-driven, focusing on behavioral attribution, adaptive monetization, and AI-powered personalization.",
    technologies: "NextJS, TypeScript, TailwindCSS, Motion",
    liveLink: "https://fulminareholdings.vercel.app/",
    figmaLink:
      "https://www.figma.com/design/EMZEYjn27cBzZqqD0LzRMe/Fulminar?m=auto&t=r3rTHWJeSfJ4of9I-1",
  },
};
