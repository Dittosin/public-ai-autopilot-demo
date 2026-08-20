import { useState } from "react";
import { CheckCircle2, LockKeyhole, ShieldAlert } from "lucide-react";
import { Button } from "../components/Button";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { finalReview, housingFinalReview } from "../data/mockData";
import type { MissionPhase } from "../types";

type FinalApprovalPageProps = {
  simpleMode: boolean;
  missionPhase: MissionPhase;
  onLogs: () => void;
  onSubmit: () => void;
};

export function FinalApprovalPage({
  simpleMode,
  missionPhase,
  onLogs,
  onSubmit,
}: FinalApprovalPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const visibleReview =
    missionPhase === "employmentConfirmed" ? housingFinalReview : finalReview;

  return (
    <section className="px-5 py-5">
      <ProgressSteps current={4} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="최종 승인 · 데모"
          title="제출 전 마지막 확인"
          description={
            simpleMode
              ? "직접 승인해야 제출됩니다."
              : "AI가 준비한 내용은 본인인증과 승인 전까지 제출되지 않습니다."
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] px-4">
        <ReviewLine title="신청 대상" items={visibleReview.targets} />
        <ReviewLine title="확인한 정보" items={visibleReview.checkedInfo} />
        <ReviewLine title="제출될 서류" items={visibleReview.documents} last />
      </article>

      <article className="mt-3 rounded-[8px] border border-[#ffe4b5] bg-[#fff8eb] p-4">
        <div className="flex gap-2">
          <ShieldAlert
            aria-hidden="true"
            size={20}
            className="mt-0.5 shrink-0 text-[#9a5b00]"
          />
          <div className="space-y-2 text-[14px] font-semibold leading-6 text-[#8a5200]">
            <p>공식 자격 판정과 처분은 소관기관 시스템이 수행합니다.</p>
            <p>AI는 신청 준비를 도와주며, 사용자 승인 없이 제출하지 않습니다.</p>
          </div>
        </div>
      </article>

      <div className="mt-5 space-y-3">
        <Button
          onClick={() => {
            setSubmitted(true);
            onSubmit();
          }}
          disabled={submitted}
          className="w-full"
          icon={
            submitted ? (
              <CheckCircle2 aria-hidden="true" size={20} />
            ) : (
              <LockKeyhole aria-hidden="true" size={20} />
            )
          }
        >
          {submitted ? "데모 제출 흐름 완료" : "본인인증·최종 제출 체험"}
        </Button>
        {submitted ? (
          <div
            className="flex items-start gap-2 rounded-[8px] border border-[#b9dcd0] bg-[#f2fbf7] p-4 text-[#0f6b4a]"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 aria-hidden="true" size={19} className="mt-0.5 shrink-0" />
            <p className="text-[13px] font-bold leading-5">
              데모 흐름이 완료됐습니다. 실제 본인인증·기관 제출·개인정보 전송은 없었습니다.
            </p>
          </div>
        ) : null}
        <Button variant="secondary" onClick={onLogs} className="w-full">
          기록 보기
        </Button>
      </div>
      <p className="muted-text mt-3 text-center text-[11px] font-semibold leading-5">
        이 화면은 시연용이며 실제 기관으로 제출되지 않습니다.
      </p>
    </section>
  );
}

function ReviewLine({
  title,
  items,
  last = false,
}: {
  title: string;
  items: string[];
  last?: boolean;
}) {
  return (
    <div className={["py-4", last ? "" : "border-b hairline"].join(" ")}>
      <p className="text-[13px] font-bold text-[#6b7280]">{title}</p>
      <p className="mt-1 text-[16px] font-extrabold leading-6">
        {items.join(" · ")}
      </p>
    </div>
  );
}
