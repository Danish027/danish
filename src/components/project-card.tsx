import Link from "next/link";
import Image from "next/image";

type ProjectCardProps = {
  name: string;
  role: string;
  timeline: string;
  shortDescription: string;
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
              <Link href={url} className="font-medium text-base">
                {name}
              </Link>
            ) : (
              <h3 className="font-medium text-base">{name}</h3>
            )}
            <span className="text-sm text-gray-600">{timeline}</span>
          </div>
          <p className="text-sm text-gray-600">{role}</p>
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
