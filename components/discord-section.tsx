import { MessageSquare, Mic, Megaphone } from "lucide-react";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { DiscordWidgetCard } from "@/components/discord-widget";

const icons = [MessageSquare, Mic, Megaphone];

export function DiscordSection() {
  return (
    <section id="discord" className="border-t border-line bg-coal/40">
      <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-28">
        <Reveal>
          <SectionHeading title={uz.discord.title} lead={uz.discord.lead} />

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {uz.discord.bullets.map((b, i) => {
              const Icon = icons[i] ?? MessageSquare;
              return (
                <li key={b} className="flex items-center gap-2.5 text-bone">
                  <Icon className="h-4 w-4 text-iris-soft" aria-hidden />
                  <span className="text-sm">{b}</span>
                </li>
              );
            })}
          </ul>

          <LinkButton
            href={site.discordInvite}
            size="lg"
            className="mt-9"
            target="_blank"
            rel="noopener noreferrer"
          >
            {uz.discord.cta}
          </LinkButton>
        </Reveal>

        <Reveal delay={0.1}>
          <DiscordWidgetCard />
        </Reveal>
      </div>
    </section>
  );
}
