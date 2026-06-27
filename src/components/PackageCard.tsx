import { ArrowRight, Baby, BriefcaseBusiness, UserRoundCheck } from "lucide-react";
import type { RightsPackage } from "../types";

type PackageCardProps = {
  item: RightsPackage;
  onOpen: () => void;
};

export function PackageCard({ item, onOpen }: PackageCardProps) {
  const tone = {
    blue: {
      icon: BriefcaseBusiness,
      badge: "bg-blue-50 text-publicBlue-700",
      bar: "bg-publicBlue-700",
    },
    mint: {
      icon: Baby,
      badge: "bg-teal-50 text-civic-mint",
      bar: "bg-civic-mint",
    },
    amber: {
      icon: UserRoundCheck,
      badge: "bg-amber-50 text-civic-amber",
      bar: "bg-civic-amber",
    },
  }[item.tone];

  const Icon = tone.icon;

  return (
    <article className="app-card surface rounded-[8px] p-4">
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px]",
            tone.badge,
          ].join(" ")}
        >
          <Icon aria-hidden="true" size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="muted-text text-sm font-bold">{item.alert}</p>
          <h3 className="mt-1 text-lg font-extrabold">{item.title}</h3>
          <p className="muted-text mt-1 text-sm leading-6">{item.subtitle}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="muted-text flex items-center justify-between text-sm font-bold">
          <span>준비 진행률</span>
          <span>{item.progress}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div
            className={["h-2 rounded-full", tone.bar].join(" ")}
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-4 flex w-full items-center justify-between rounded-[8px] bg-[#eef4ff] px-4 py-3 text-left font-extrabold text-[#2f6bff]"
      >
        자세히 보기
        <ArrowRight aria-hidden="true" size={20} />
      </button>
    </article>
  );
}
