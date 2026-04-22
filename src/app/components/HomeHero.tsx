import { One } from "./1";

export function HomeHero() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative z-10 h-[104px] w-full max-w-[280px] cursor-grab sm:h-[120px] sm:max-w-[320px] md:h-[150px] md:max-w-[330px]">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(980px,calc(100vw-1rem))] -translate-x-1/2">
          <div className="absolute left-0 right-0 top-0 h-0 border-t border-dashed border-[#999999]/20 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] dark:border-white/20" />
          <div className="absolute bottom-0 left-0 right-0 h-0 border-t border-dashed border-[#999999]/20 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] dark:border-white/20" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2">
          <div className="absolute bottom-[-60%] left-0 top-[-60%] w-0 border-l border-dashed border-[#999999]/20 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)] dark:border-white/20" />
          <div className="absolute bottom-[-60%] right-0 top-[-60%] w-0 border-l border-dashed border-[#999999]/20 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)] dark:border-white/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[#4a4747] dark:text-[#E3E7EA]">
          <One />
        </div>
      </div>
    </div>
  );
}
