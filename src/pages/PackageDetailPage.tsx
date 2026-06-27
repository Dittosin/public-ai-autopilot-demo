import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Button } from "../components/Button";
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
          eyebrow="실행 패키지"
          title="실직 후 받을 수 있는 지원"
          description={
            simpleMode
              ? "AI가 먼저 준비할 항목을 정리했어요."
              : item.subtitle
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
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
          <p className="text-[15px] font-extrabold">AI가 찾은 항목</p>
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

      <Button
        onClick={onConsent}
        className="mt-5 w-full"
        icon={<ArrowRight aria-hidden="true" size={20} />}
      >
        필요한 정보 확인하기
      </Button>
    </section>
  );
}
