import { ArrowRight, Database, RotateCcw } from "lucide-react";
import { Button } from "../components/Button";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { consentItems } from "../data/mockData";

type ConsentPageProps = {
  simpleMode: boolean;
  onStartPreparation: () => void;
};

export function ConsentPage({
  simpleMode,
  onStartPreparation,
}: ConsentPageProps) {
  return (
    <section className="px-5 py-5">
      <ProgressSteps current={2} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="데이터 동의"
          title="AI가 확인할 정보"
          description={
            simpleMode
              ? "필요한 정보만 잠시 확인합니다."
              : "신청 준비에 필요한 범위만 조회하고, 동의는 언제든 철회할 수 있습니다."
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] px-4">
        {consentItems.map((item, index) => (
          <div
            key={item.dataName}
            className={[
              "py-4",
              index < consentItems.length - 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
                <Database aria-hidden="true" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[16px] font-extrabold">{item.dataName}</p>
                  <span className="shrink-0 rounded-full bg-[#f3f6fb] px-2.5 py-1 text-[12px] font-bold text-[#6b7280]">
                    {item.period}
                  </span>
                </div>
                <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                  {item.reason}
                </p>
              </div>
            </div>
            <div className="ml-[52px] mt-3 grid grid-cols-2 gap-2 text-[12px] font-bold">
              <div className="rounded-[8px] bg-[#f8fafc] px-3 py-2 text-[#6b7280]">
                목적
                <span className="mt-0.5 block text-[#1f2937]">{item.purpose}</span>
              </div>
              <div className="rounded-[8px] bg-[#f8fafc] px-3 py-2 text-[#6b7280]">
                기관
                <span className="mt-0.5 block text-[#1f2937]">{item.agency}</span>
              </div>
            </div>
          </div>
        ))}
      </article>

      <div className="mt-4 flex items-start gap-2 rounded-[8px] bg-[#eef4ff] p-4 text-[#1e4ed8]">
        <RotateCcw aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
        <p className="text-[13px] font-bold leading-6">
          동의는 설정에서 언제든 철회할 수 있습니다. 최종 제출은 본인 승인 후에만 진행됩니다.
        </p>
      </div>

      <Button
        onClick={onStartPreparation}
        className="mt-5 w-full"
        icon={<ArrowRight aria-hidden="true" size={20} />}
      >
        동의하고 준비 시작
      </Button>
    </section>
  );
}
