import { RotateCcw } from "lucide-react";
import { Button } from "../components/Button";
import { ScreenHeader } from "../components/ScreenHeader";
import { auditLogs, replanAuditLogs } from "../data/mockData";
import type { MissionPhase } from "../types";

type AuditLogPageProps = {
  simpleMode: boolean;
  missionPhase: MissionPhase;
};

export function AuditLogPage({ simpleMode, missionPhase }: AuditLogPageProps) {
  const visibleLogs =
    missionPhase === "employmentConfirmed"
      ? [...auditLogs, ...replanAuditLogs]
      : auditLogs;

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
        {visibleLogs.map((log, index) => (
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

      <Button
        variant="danger"
        className="mt-5 w-full"
        icon={<RotateCcw aria-hidden="true" size={20} />}
      >
        대리권 철회
      </Button>
      <p className="muted-text mt-3 text-center text-[11px] font-semibold leading-5">
        표시된 기록은 데모 시나리오용 mock 데이터입니다.
      </p>
    </section>
  );
}
