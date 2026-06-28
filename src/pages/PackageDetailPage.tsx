import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Button } from "../components/Button";
import { KpiCards } from "../components/KpiCards";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { StatusPill } from "../components/StatusPill";
import { rightsPackages } from "../data/mockData";

type PackageDetailPageProps = {
  simpleMode: boolean;
  onConsent: () => void;
};

export function PackageDetailPage({
  simpleMode,
  onConsent,
}: PackageDetailPageProps) {
  const item = rightsPackages[0];

  return (
    <section className="px-5 py-5">
      <ProgressSteps current={1} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="지원 조회"
          title="받을 수 있는 지원 5건"
          description={
            simpleMode
              ? "먼저 바로 신청 가능한 항목부터 보여드려요."
              : item.subtitle
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
            <Clock3 aria-hidden="true" size={21} />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#6b7280]">예상 준비 시간</p>
            <p className="mt-0.5 text-[20px] font-extrabold">
              약 90분 → 약 15분
            </p>
          </div>
        </div>
      </article>

      <article className="app-card mt-3 rounded-[8px] px-4">
        <div className="flex items-center gap-2 border-b hairline py-4">
          <Sparkles aria-hidden="true" size={18} className="text-[#2f6bff]" />
          <p className="text-[15px] font-extrabold">가능성 분류 결과</p>
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
    </section>
  );
}
