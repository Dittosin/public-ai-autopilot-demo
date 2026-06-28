import { ArrowRight, Database, FileText, RotateCcw } from "lucide-react";
import { Button } from "../components/Button";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { applicationDraft, consentItems, documentStates } from "../data/mockData";

type ConsentPageProps = {
  simpleMode: boolean;
  onStartPreparation: () => void;
};

export function ConsentPage({
  simpleMode,
  onStartPreparation,
}: ConsentPageProps) {
  const visibleConsentItems = consentItems.slice(0, 2);
  const readyCount = documentStates.filter((doc) => doc.level === "ready").length;

  return (
    <section className="px-5 py-5">
      <ProgressSteps current={2} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="신청 준비"
          title="동의하면 바로 초안을 준비해요"
          description={
            simpleMode
              ? "필요한 정보만 확인하고 신청서를 준비합니다."
              : "데이터 동의와 서류 확인을 한 화면에서 끝내고 최종 승인으로 넘어갑니다."
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] p-4">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#2f6bff] text-white">
            <FileText aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold">{applicationDraft.title}</p>
            <p className="muted-text mt-1 text-[13px] font-medium">
              {applicationDraft.applicant} · {applicationDraft.target}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-bold">
          <div className="rounded-[8px] bg-[#f8fafc] px-3 py-2 text-[#6b7280]">
            서류 상태
            <span className="mt-0.5 block text-[#1f2937]">
              {readyCount}/{documentStates.length} 완료
            </span>
          </div>
          <div className="rounded-[8px] bg-[#f8fafc] px-3 py-2 text-[#6b7280]">
            예상 시간
            <span className="mt-0.5 block text-[#1f2937]">약 15분</span>
          </div>
        </div>
      </article>

      <article className="app-card mt-3 rounded-[8px] px-4">
        <div className="border-b hairline py-4">
          <p className="text-[16px] font-extrabold">확인할 정보</p>
          <p className="muted-text mt-1 text-[13px] font-medium">
            신청 가능성 확인에 필요한 정보만 잠시 조회합니다.
          </p>
        </div>
        {visibleConsentItems.map((item, index) => (
          <div
            key={item.dataName}
            className={[
              "flex gap-3 py-4",
              index < visibleConsentItems.length - 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
              <Database aria-hidden="true" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-extrabold">{item.dataName}</p>
                <span className="shrink-0 rounded-full bg-[#f3f6fb] px-2.5 py-1 text-[12px] font-bold text-[#6b7280]">
                  {item.period}
                </span>
              </div>
              <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </article>

      <article className="app-card mt-3 rounded-[8px] px-4">
        <div className="border-b hairline py-4">
          <p className="text-[16px] font-extrabold">서류 준비 상태</p>
        </div>
        {documentStates.slice(0, 2).map((doc, index) => (
          <div
            key={doc.name}
            className={[
              "py-4",
              index < 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <p className="text-[15px] font-bold">{doc.name}</p>
            <p className="muted-text mt-1 text-[13px] font-medium leading-5">
              {doc.status}
            </p>
          </div>
        ))}
      </article>

      <div className="mt-4 flex items-start gap-2 rounded-[8px] bg-[#eef4ff] p-4 text-[#1e4ed8]">
        <RotateCcw aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
        <p className="text-[13px] font-bold leading-6">
          동의는 언제든 철회할 수 있습니다. 최종 제출은 다음 화면에서 직접 승인해야 진행됩니다.
        </p>
      </div>

      <Button
        onClick={onStartPreparation}
        className="mt-5 w-full"
        icon={<ArrowRight aria-hidden="true" size={20} />}
      >
        동의하고 최종 확인
      </Button>
    </section>
  );
}
