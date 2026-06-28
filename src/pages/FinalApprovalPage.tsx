import { LockKeyhole, ShieldAlert } from "lucide-react";
import { Button } from "../components/Button";
import { ProgressSteps } from "../components/ProgressSteps";
import { ScreenHeader } from "../components/ScreenHeader";
import { finalReview } from "../data/mockData";

type FinalApprovalPageProps = {
  simpleMode: boolean;
  onLogs: () => void;
};

export function FinalApprovalPage({ simpleMode, onLogs }: FinalApprovalPageProps) {
  return (
    <section className="px-5 py-5">
      <ProgressSteps current={3} />

      <div className="mt-5">
        <ScreenHeader
          eyebrow="최종 승인"
          title="확인하면 제출됩니다"
          description={
            simpleMode
              ? "직접 승인해야 제출됩니다."
              : "AI가 준비한 내용은 본인인증과 승인 전까지 제출되지 않습니다."
          }
        />
      </div>

      <article className="app-card mt-5 rounded-[8px] px-4">
        <ReviewLine title="신청 대상" items={finalReview.targets} />
        <ReviewLine title="확인한 정보" items={finalReview.checkedInfo} />
        <ReviewLine title="제출될 서류" items={finalReview.documents} last />
      </article>

      <article className="mt-3 rounded-[8px] border border-[#ffe4b5] bg-[#fff8eb] p-4">
        <div className="flex gap-2">
          <ShieldAlert
            aria-hidden="true"
            size={20}
            className="mt-0.5 shrink-0 text-[#9a5b00]"
          />
          <p className="text-[14px] font-semibold leading-6 text-[#8a5200]">
            AI는 신청 준비를 도와주며, 최종 제출은 사용자의 승인 후에만 진행됩니다.
          </p>
        </div>
      </article>

      <div className="mt-5 space-y-3">
        <Button
          className="w-full"
          icon={<LockKeyhole aria-hidden="true" size={20} />}
        >
          본인인증 후 최종 제출
        </Button>
        <Button variant="secondary" onClick={onLogs} className="w-full">
          기록 보기
        </Button>
      </div>
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
