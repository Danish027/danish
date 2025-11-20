import Link from "next/link";
import Image from "next/image";

type ProjectCardProps = {
  name: string;
  role: string;
  timeline: string;
  shortDescription: string;
  location: string;
  description: string;
  techStack: string;
  url?: string;
  logo?: string;
  logoPlaceholder?: string;
};

export function ProjectCard({
  name,
  role,
  timeline,
  shortDescription,
  location,
  description,
  techStack,
  url,
  logo,
  logoPlaceholder,
}: ProjectCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={45}
            height={45}
            className="rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
            {logoPlaceholder}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            {url ? (
              <Link href={url} className="font-medium text-base flex items-center gap-1">
                {name} 
                {/* external link icon svg here like lucide-link */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </Link>
            ) : (
              <h3 className="font-medium text-base">{name}</h3>
            )}
            <span className="text-sm text-gray-600">{timeline}</span>
          </div>
          <div className="flex items-center gap-2 justify-between">
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{shortDescription}</p>
      <p className="text-gray-700 leading-relaxed">{description}</p>
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">Tech Stack:</span>{" "}
        {techStack}
      </div>
    </div>
  );
}
