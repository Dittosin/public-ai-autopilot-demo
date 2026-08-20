import { useState } from "react";
import { CheckCircle2, FileClock, RotateCcw } from "lucide-react";
import { Button } from "../components/Button";
import { ScreenHeader } from "../components/ScreenHeader";
import { auditLogs, replanAuditLogs, submittedAuditLog } from "../data/mockData";
import type { ExecutionStage, MissionPhase } from "../types";

type AuditLogPageProps = {
  simpleMode: boolean;
  missionPhase: MissionPhase;
  missionCreated: boolean;
  executionStage: ExecutionStage;
};

export function AuditLogPage({
  simpleMode,
  missionPhase,
  missionCreated,
  executionStage,
}: AuditLogPageProps) {
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const visibleLogs = missionCreated ? auditLogs.slice(0, 3) : [];
  if (missionPhase === "employmentConfirmed" && missionCreated) {
    visibleLogs.push(...replanAuditLogs);
  }
  if (executionStage !== "idle") visibleLogs.push(auditLogs[3]);
  if (executionStage === "reviewed" || executionStage === "submitted") {
    visibleLogs.push(auditLogs[4]);
  }
  if (executionStage === "submitted") visibleLogs.push(submittedAuditLog);

  return (
    <section className="px-5 py-5">
      <ScreenHeader
        eyebrow="기록"
        title="AI가 한 일"
        description={
          simpleMode
            ? "언제 무엇을 했는지 볼 수 있어요."
            : "상태 구성, 미션 판단, 신청 준비 기록을 시간순으로 남깁니다."
        }
      />

      <article className="app-card mt-5 rounded-[8px] px-4">
        {visibleLogs.length === 0 ? (
          <div className="py-8 text-center">
            <FileClock aria-hidden="true" size={25} className="mx-auto text-[#9ca3af]" />
            <p className="mt-3 text-[15px] font-extrabold">아직 기록된 활동이 없어요</p>
            <p className="muted-text mt-1 text-[12px] font-semibold leading-5">
              대표 미션을 시작하면 AI의 주요 작업이 여기에 표시됩니다.
            </p>
          </div>
        ) : visibleLogs.map((log, index) => (
          <div
            key={`${log.time}-${log.title}`}
            className={[
              "relative py-4 pl-7",
              index < visibleLogs.length - 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <span className="absolute left-0 top-5 h-3 w-3 rounded-full bg-[#2f6bff]" />
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[16px] font-extrabold">{log.title}</p>
              <time className="text-[12px] font-bold text-[#6b7280]">
                {log.time}
              </time>
            </div>
            <p className="muted-text mt-1 text-[13px] font-medium leading-5">
              {log.detail}
            </p>
          </div>
        ))}
      </article>

      {revoked ? (
        <div
          className="mt-5 flex items-start gap-3 rounded-[8px] border border-[#b9dcd0] bg-[#f2fbf7] p-4 text-[#0f6b4a]"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-[14px] font-extrabold">AI 미션 관리가 중지된 상태입니다.</p>
            <p className="mt-1 text-[12px] font-semibold leading-5">
              데모 표시만 바뀌며 실제 데이터나 권한은 변경되지 않습니다.
            </p>
          </div>
        </div>
      ) : showRevokeConfirm ? (
        <div className="app-card mt-5 rounded-[8px] p-4">
          <p className="text-[16px] font-extrabold">AI 미션 관리를 중지할까요?</p>
          <p className="muted-text mt-2 text-[13px] font-semibold leading-5">
            실제 서비스에서는 연결 권한과 알림을 철회합니다. 이 데모에서는 화면 상태만 바뀝니다.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => setShowRevokeConfirm(false)}>
              계속 사용
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setRevoked(true);
                setShowRevokeConfirm(false);
              }}
            >
              데모 중지
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="danger"
          className="mt-5 w-full"
          onClick={() => setShowRevokeConfirm(true)}
          icon={<RotateCcw aria-hidden="true" size={20} />}
        >
          AI 미션 관리 중지
        </Button>
      )}
      <p className="muted-text mt-3 text-center text-[11px] font-semibold leading-5">
        표시된 활동·승인 기록과 대리권 철회 기능은 데모용 mock입니다.
      </p>
    </section>
  );
}
