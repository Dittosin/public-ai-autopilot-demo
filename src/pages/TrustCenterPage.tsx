import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  Database,
  FileCheck2,
  FileClock,
  Flag,
  LockKeyhole,
  MessagesSquare,
  RefreshCw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

type TrustCenterPageProps = {
  onBack: () => void;
  onOpenLogs: () => void;
};

const canDo = [
  "정책 탐색",
  "자격 사전검토",
  "정책·공고 변화 확인",
  "우선순위와 다음 행동 제안",
  "사용자가 확인할 신청 내용 준비",
];

const cannotDo = [
  "공식 자격 판정",
  "행정처분",
  "사용자 승인 없이 신청하거나 제출하기",
];

const policyItems = [
  ["개인정보 처리방침", "어떤 정보를 왜 사용하는지 알기 쉽게 안내합니다."],
  ["이용약관", "서비스 이용 범위와 사용자 권리를 정합니다."],
  ["서비스 운영정책", "판단·알림·신청 준비의 운영 기준을 공개합니다."],
  ["AI 이용 가이드", "AI 결과를 확인하고 안전하게 사용하는 방법을 안내합니다."],
  ["서비스 변경·업데이트 내역", "중요한 기능과 정책 변경 내용을 기록합니다."],
];

const riskLevels = [
  ["정보 탐색", "출처와 기준 표시"],
  ["개인화 판단", "이유 설명과 다시 확인"],
  ["동의한 정보 확인", "목적별 동의와 철회"],
  ["공식 신청·제출", "내용 확인과 최종 승인"],
];

export function TrustCenterPage({ onBack, onOpenLogs }: TrustCenterPageProps) {
  const [notice, setNotice] = useState("");

  const showPrototypeNotice = (message: string) => {
    setNotice(message);
  };

  return (
    <section className="trust-center px-5 py-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex min-h-11 items-center gap-2 rounded-[8px] pr-3 text-[14px] font-extrabold text-[#4b5563] hover:bg-[#eef2f7]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
          <ArrowLeft aria-hidden="true" size={19} />
        </span>
        설정으로 돌아가기
      </button>

      <p className="text-[12px] font-extrabold text-[#2f6bff]">안전·신뢰센터</p>
      <h1 className="mt-1 text-pretty text-[27px] font-extrabold leading-[1.2] text-[#1f2937]">
        중요한 결정은
        <br />
        사용자가 확인합니다
      </h1>
      <p className="muted-text mt-3 text-[14px] font-semibold leading-6">
        AI가 어디까지 돕고, 어떤 순간에 동의와 승인이 필요한지 확인하세요.
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-[#cfe0ff] bg-[#eef4ff] p-4 text-[#1e4ed8]">
        <ShieldCheck aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
        <p className="text-[13px] font-bold leading-5">
          이 앱은 시연용입니다. 실제 개인정보·공공 마이데이터·행정시스템과 연결되지 않습니다.
        </p>
      </div>

      <TrustSection
        icon={<Bot aria-hidden="true" size={20} />}
        title="AI의 역할과 한계"
        summary="할 수 있는 일과 할 수 없는 일"
        open
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <PrincipleList title="AI가 도울 수 있어요" items={canDo} tone="positive" />
          <PrincipleList title="AI가 임의로 할 수 없어요" items={cannotDo} tone="limit" />
        </div>
        <p className="mt-3 rounded-[8px] bg-[#f8fafc] px-3 py-3 text-[12px] font-semibold leading-5 text-[#4b5563]">
          정보가 부족하거나 서로 다르면 결론을 단정하지 않고, 공식기관 또는 사람에게 확인하도록 안내합니다.
        </p>
        <p className="mt-2 text-[12px] font-semibold leading-5 text-[#6b7280]">
          정책과 공고의 변화를 확인하는 기능이며, 사용자의 위치나 행동을 실시간으로 추적하지 않습니다.
        </p>
      </TrustSection>

      <TrustSection
        icon={<Database aria-hidden="true" size={20} />}
        title="데이터·권한 관리"
        summary="필요한 정보만, 목적별로 동의"
      >
        <div className="space-y-2">
          {[
            "미션 수행에 필요한 최소정보만 사용합니다.",
            "정보마다 이용 목적과 기간을 확인하고 동의합니다.",
            "허용한 정보는 확인할 수 있고, 권한은 철회할 수 있습니다.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-[13px] font-semibold leading-5 text-[#4b5563]">
              <Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-[#2f6bff]" />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] font-semibold leading-5 text-[#6b7280]">
          본인인증만으로 모든 행정정보에 접근하지 않습니다. 실제 서비스에서는 승인된 이용체계와 참여기관 연계가 필요합니다.
        </p>
      </TrustSection>

      <TrustSection
        icon={<UserCheck aria-hidden="true" size={20} />}
        title="사용자 승인 원칙"
        summary="중요한 행동은 마지막에 직접 승인"
      >
        <ol className="space-y-2">
          {["AI 신청 준비", "사용자 내용 확인", "사용자 최종 승인", "공식 제출"].map(
            (step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-[8px] bg-[#f8fafc] px-3 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-[12px] font-extrabold text-[#2f6bff]">
                  {index + 1}
                </span>
                <span className="text-[13px] font-extrabold text-[#374151]">{step}</span>
              </li>
            ),
          )}
        </ol>
        <p className="mt-3 text-[12px] font-semibold leading-5 text-[#6b7280]">
          법적·금전적 효과가 있는 행동은 사용자 최종 승인 없이 실행하지 않습니다.
        </p>
      </TrustSection>

      <TrustSection
        icon={<FileClock aria-hidden="true" size={20} />}
        title="활동·승인 기록"
        summary="허용한 데이터와 AI 작업을 확인"
      >
        <div className="space-y-2">
          <RecordItem icon={<Database aria-hidden="true" size={17} />} label="허용한 데이터" value="목적별 연결 범위" />
          <RecordItem icon={<FileCheck2 aria-hidden="true" size={17} />} label="승인한 행동" value="최종 확인 내역" />
          <RecordItem icon={<Bot aria-hidden="true" size={17} />} label="AI 주요 작업" value="미션 판단·신청 준비" />
        </div>
        <button
          type="button"
          onClick={onOpenLogs}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#eef4ff] px-4 text-[13px] font-extrabold text-[#2f6bff] hover:bg-[#e4edff]"
        >
          <FileClock aria-hidden="true" size={17} />
          활동·승인 기록 보기
        </button>
      </TrustSection>

      <TrustSection
        icon={<MessagesSquare aria-hidden="true" size={20} />}
        title="오류·이의제기 및 사람 연결"
        summary="AI 결과를 그대로 따르지 않아도 됩니다"
      >
        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            icon={<RefreshCw aria-hidden="true" size={17} />}
            label="결과 다시 확인"
            onClick={() => showPrototypeNotice("AI가 사용한 정보와 판단 이유를 다시 확인하는 데모 기능입니다.")}
          />
          <ActionButton
            icon={<Flag aria-hidden="true" size={17} />}
            label="오류 신고"
            onClick={() => showPrototypeNotice("실제 운영 시 결과 정정과 이의제기 접수 절차를 제공합니다.")}
          />
          <ActionButton
            icon={<Scale aria-hidden="true" size={17} />}
            label="공식기관 확인"
            onClick={() => showPrototypeNotice("실제 운영 시 해당 정책의 소관기관 안내로 연결합니다.")}
          />
          <ActionButton
            icon={<UserCheck aria-hidden="true" size={17} />}
            label="사람에게 연결"
            onClick={() => showPrototypeNotice("실제 운영 시 상담원 또는 담당기관 상담 채널로 연결합니다.")}
          />
        </div>
      </TrustSection>

      <TrustSection
        icon={<BookOpen aria-hidden="true" size={20} />}
        title="정책 문서와 안내"
        summary="운영 기준과 변경 내용을 확인"
      >
        <div className="divide-y hairline">
          {policyItems.map(([title, description]) => (
            <div
              key={title}
              className="flex min-h-[58px] w-full items-center justify-between gap-3 py-3"
            >
              <span className="min-w-0">
                <span className="block text-[13px] font-extrabold text-[#374151]">{title}</span>
                <span className="muted-text mt-1 block text-[11px] font-semibold leading-4">{description}</span>
              </span>
              <span className="shrink-0 rounded-full bg-[#f3f6fb] px-2 py-1 text-[10px] font-extrabold text-[#6b7280]">
                요약
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] font-semibold leading-5 text-[#6b7280]">
          실제 서비스 운영 전 각 항목을 별도 문서로 고지합니다.
        </p>
      </TrustSection>

      <TrustSection
        icon={<ShieldAlert aria-hidden="true" size={20} />}
        title="보안 취약점 신고"
        summary="공개 전 비공개 신고와 공동 대응"
      >
        <p className="text-[13px] font-semibold leading-5 text-[#4b5563]">
          책임 있는 보안 취약점 공개(VDP·CVD) 원칙에 따라, 공개 전에 운영자에게 비공개로 알리고 확인·조치 일정을 함께 조율합니다.
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-[8px] bg-[#fff7ed] p-3 text-[#9a4f0a]">
          <LockKeyhole aria-hidden="true" size={17} className="mt-0.5 shrink-0" />
          <p className="text-[12px] font-bold leading-5">
            무단 침투나 공격을 허용하지 않습니다. 실제 운영 시 허용 범위와 비공개 신고 절차를 별도 정책으로 마련합니다.
          </p>
        </div>
      </TrustSection>

      <TrustSection
        icon={<AlertCircle aria-hidden="true" size={20} />}
        title="행동에 따른 보호 수준"
        summary="중요할수록 동의와 통제를 강화"
      >
        <ol className="space-y-2">
          {riskLevels.map(([level, control], index) => (
            <li key={level} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f3f7] text-[11px] font-extrabold text-[#6b7280]">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 text-[13px] font-extrabold text-[#374151]">{level}</span>
              <span className="text-right text-[11px] font-bold text-[#6b7280]">{control}</span>
            </li>
          ))}
        </ol>
      </TrustSection>

      {notice ? (
        <div
          className="fixed bottom-[calc(92px+env(safe-area-inset-bottom))] left-1/2 z-40 flex w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 items-start gap-2 rounded-[8px] border border-[#cfe0ff] bg-white p-3 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <ShieldCheck aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#2f6bff]" />
          <p className="text-[12px] font-semibold leading-5 text-[#4b5563]">{notice}</p>
        </div>
      ) : null}
    </section>
  );
}

function TrustSection({
  icon,
  title,
  summary,
  children,
  open = false,
}: {
  icon: ReactNode;
  title: string;
  summary: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="app-card group mt-3 rounded-[8px] px-4" open={open}>
      <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-3 py-3">
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-extrabold text-[#1f2937]">{title}</span>
            <span className="muted-text mt-0.5 block text-[12px] font-semibold leading-4">{summary}</span>
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          size={18}
          className="shrink-0 text-[#6b7280] transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="border-t hairline pb-4 pt-4">{children}</div>
    </details>
  );
}

function PrincipleList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "limit";
}) {
  return (
    <div className={tone === "positive" ? "rounded-[8px] bg-[#edf8f3] p-3" : "rounded-[8px] bg-[#f7f8fa] p-3"}>
      <p className="text-[13px] font-extrabold text-[#374151]">{title}</p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[12px] font-semibold leading-5 text-[#4b5563]">
            {tone === "positive" ? (
              <Check aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#14784f]" />
            ) : (
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9ca3af]" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecordItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-[8px] bg-[#f8fafc] px-3 py-2">
      <span className="text-[#2f6bff]">{icon}</span>
      <span className="min-w-0 flex-1 text-[13px] font-extrabold text-[#374151]">{label}</span>
      <span className="text-right text-[11px] font-bold text-[#6b7280]">{value}</span>
    </div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-[8px] bg-[#f3f6fb] px-2 text-center text-[12px] font-extrabold text-[#374151] hover:bg-[#eaf0f8]"
    >
      <span className="text-[#2f6bff]">{icon}</span>
      {label}
    </button>
  );
}
