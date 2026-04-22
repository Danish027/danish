type ExperienceItem = {
  year: string;
  title: string;
  role: string;
};

type ExperienceListProps = {
  items: ExperienceItem[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.title}
          className="grid grid-cols-[44px_82px_minmax(0,1fr)] items-baseline gap-x-6 text-left"
        >
          <span className="poppins-light text-[11px] font-light uppercase leading-[1.6] tracking-[0.01em] text-[#8f9499] dark:text-[#93A0A8]">
            {item.year}
          </span>
          <span className="poppins-light text-[13px] font-light leading-[1.6] tracking-[0em] text-[#3a3634] dark:text-[#D5D9DC]">
            {item.title}
          </span>
          <span className="poppins-light text-[13px] font-light leading-[1.6] tracking-[0em] text-[#8a8f94] dark:text-[#9EA8AF]">
            {item.role}
          </span>
        </div>
      ))}
    </div>
  );
}
