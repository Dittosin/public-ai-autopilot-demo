import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/Button";
import { KpiCards } from "../components/KpiCards";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { StatusPill } from "../components/StatusPill";
import { housingRightsPackage, rightsPackages } from "../data/mockData";
import type { MissionPhase } from "../types";

type PackageDetailPageProps = {
  simpleMode: boolean;
  missionPhase: MissionPhase;
  onConsent: () => void;
};

export function PackageDetailPage({
  simpleMode,
  missionPhase,
  onConsent,
}: PackageDetailPageProps) {
  const employmentConfirmed = missionPhase === "employmentConfirmed";
  const item = employmentConfirmed ? housingRightsPackage : rightsPackages[0];

  return (
    <section className="px-5 py-5">
      <ProgressSteps current={1} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="데모 사전검토"
          title={
            employmentConfirmed
              ? "주거지원 4개를 다시 정리했어요"
              : "지원 4개를 행동 시점별로 정리했어요"
          }
          description={
            simpleMode
              ? "지금 할 일부터 보여드려요."
              : item.subtitle
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] px-4">
        <div className="flex items-center gap-2 border-b hairline py-4">
          <Sparkles aria-hidden="true" size={18} className="text-[#2f6bff]" />
          <p className="text-[15px] font-extrabold">현재 상태 기준 분류</p>
        </div>
        {item.items.map((support, index) => (
          <div
            key={support.name}
            className={[
              "flex items-start justify-between gap-3 py-4",
              index < item.items.length - 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <div className="min-w-0">
              <p className="text-[16px] font-extrabold">{support.name}</p>
              <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                {support.description}
              </p>
            </div>
            <StatusPill status={support.status} />
          </div>
        ))}
      </article>

      <div className="mt-3">
        <KpiCards />
      </div>

      <Button
        onClick={onConsent}
        className="mt-5 w-full"
        icon={<ArrowRight aria-hidden="true" size={20} />}
      >
        목적별 동의로 이동
      </Button>
      <p className="muted-text mt-3 text-center text-[11px] font-semibold leading-5">
        AI 사전검토 결과이며, 실제 자격은 해당 기관에서 결정합니다.
      </p>
    </section>
  );
}
