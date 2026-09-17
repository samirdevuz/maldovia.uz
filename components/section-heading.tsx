import { cn } from "@/lib/utils";

/** Bo'lim sarlavhasi + brend motivi sifatidagi "yoriq" chizig'i. */
export function SectionHeading({
  title,
  lead,
  align = "left",
  className,
}: {
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[52ch]", align === "center" && "mx-auto text-center", className)}>
      <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold leading-[1.04] tracking-tightest text-bone">
        {title}
      </h2>
      <div
        className={cn("seam-x mt-5 h-[2px] w-24", align === "center" && "mx-auto")}
        aria-hidden
      />
      {lead && <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">{lead}</p>}
    </div>
  );
}
