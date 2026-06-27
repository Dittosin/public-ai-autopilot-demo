import { AlertCircle, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "../components/Button";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { applicationDraft, documentStates } from "../data/mockData";

type ApplicationPrepPageProps = {
  simpleMode: boolean;
  onReview: () => void;
};

export function ApplicationPrepPage({
  simpleMode,
  onReview,
}: ApplicationPrepPageProps) {
  const readyCount = documentStates.filter((doc) => doc.level === "ready").length;

  return (
    <section className="px-5 py-5">
      <ProgressSteps current={3} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="신청 준비"
          title="초안을 준비했어요"
          description={
            simpleMode
              ? "부족한 서류만 확인하면 됩니다."
              : applicationDraft.summary
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#2f6bff] text-white">
            <FileText aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold">
              {applicationDraft.title}
            </p>
            <p className="muted-text mt-1 text-[13px] font-medium">
              {applicationDraft.applicant} · {applicationDraft.target}
            </p>
          </div>
        </div>
      </article>

      <article className="app-card mt-3 rounded-[8px] px-4">
        <div className="flex items-center justify-between border-b hairline py-4">
          <p className="text-[16px] font-extrabold">첨부서류 상태</p>
          <span className="text-[13px] font-bold text-[#2f6bff]">
            {readyCount}/{documentStates.length} 완료
          </span>
        </div>
        {documentStates.map((doc, index) => {
          const ready = doc.level === "ready";
          const Icon = ready ? CheckCircle2 : AlertCircle;

          return (
            <div
              key={doc.name}
              className={[
                "flex items-center justify-between gap-3 py-4",
                index < documentStates.length - 1 ? "border-b hairline" : "",
              ].join(" ")}
            >
              <div>
                <p className="text-[15px] font-bold">{doc.name}</p>
                <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                  {doc.status}
                </p>
              </div>
              <Icon
                aria-hidden="true"
                className={ready ? "text-[#0f7b55]" : "text-[#9a5b00]"}
                size={20}
              />
            </div>
          );
        })}
      </article>

      <article className="mt-3 rounded-[8px] bg-[#f8fafc] p-4">
        <p className="text-[14px] font-extrabold text-[#1f2937]">
          누락/오류 검증
        </p>
        <div className="mt-3 space-y-2">
          {applicationDraft.validation.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                size={17}
                className="text-[#2f6bff]"
              />
              <p className="text-[13px] font-semibold text-[#4b5563]">{item}</p>
            </div>
          ))}
        </div>
      </article>

      <Button
        onClick={onReview}
        className="mt-5 w-full"
        icon={<ArrowRight aria-hidden="true" size={20} />}
      >
        최종 확인하기
      </Button>
    </section>
  );
}
