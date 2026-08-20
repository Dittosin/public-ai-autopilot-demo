import type { ReactNode } from "react";
import {
  BookOpen,
  ChevronRight,
  Database,
  Eye,
  Mic,
  Moon,
  ShieldCheck,
  Type,
} from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { myDataItems } from "../data/mockData";

type SettingsPageProps = {
  largeText: boolean;
  highContrast: boolean;
  simpleMode: boolean;
  onToggleLargeText: () => void;
  onToggleHighContrast: () => void;
  onToggleSimpleMode: () => void;
  onOpenGuide: () => void;
  onOpenLogs: () => void;
  onOpenTrustCenter: () => void;
};

export function SettingsPage({
  largeText,
  highContrast,
  simpleMode,
  onToggleLargeText,
  onToggleHighContrast,
  onToggleSimpleMode,
  onOpenGuide,
  onOpenLogs,
  onOpenTrustCenter,
}: SettingsPageProps) {
  return (
    <section className="px-5 py-5">
      <ScreenHeader
        eyebrow="설정"
        title="내 앱을 편하게"
        description="글씨, 화면, 연결 정보 범위를 여기서 관리합니다."
      />

      <article className="app-card mt-5 rounded-[8px] px-4">
        <SettingButton
          title="큰 글씨"
          description="글자와 버튼을 더 크게 봅니다."
          active={largeText}
          onClick={onToggleLargeText}
          icon={<Type aria-hidden="true" size={21} />}
        />
        <SettingButton
          title="고대비 화면"
          description="글자와 배경을 더 또렷하게 봅니다."
          active={highContrast}
          onClick={onToggleHighContrast}
          icon={<Moon aria-hidden="true" size={21} />}
        />
        <SettingButton
          title="쉬운 설명"
          description="짧고 쉬운 문장으로 봅니다."
          active={simpleMode}
          onClick={onToggleSimpleMode}
          icon={<Eye aria-hidden="true" size={21} />}
          last
        />
      </article>

      <article className="app-card mt-3 rounded-[8px] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
              <Database aria-hidden="true" size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[17px] font-extrabold">연결한 정보 관리</p>
                <span className="rounded-full bg-[#f3f6fb] px-2 py-1 text-[10px] font-extrabold text-[#6b7280]">
                  시나리오 데이터
                </span>
              </div>
              <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                공공 마이데이터 연결 범위와 사용 기간을 데모로 보여줍니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {myDataItems.map((item) => (
            <div
              key={item.name}
              className="rounded-[8px] border hairline bg-[#f8fafc] px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[14px] font-extrabold text-[#1f2937]">
                  {item.name}
                </p>
                <span
                  className={[
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
                    item.status === "연결됨"
                      ? "bg-[#eaf7f1] text-[#14784f]"
                      : "bg-[#fff5e6] text-[#a15c00]",
                  ].join(" ")}
                >
                  {item.status === "연결됨" ? "데모 연결" : item.status}
                </span>
              </div>
              <p className="muted-text mt-1 text-[12px] font-medium leading-5">
                {item.description}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-bold">
                <div className="rounded-[8px] bg-white px-3 py-2 text-[#6b7280]">
                  기간
                  <span className="mt-0.5 block text-[#1f2937]">
                    {item.period}
                  </span>
                </div>
                <div className="rounded-[8px] bg-white px-3 py-2 text-[#6b7280]">
                  데모 사용
                  <span className="mt-0.5 block text-[#1f2937]">
                    {item.lastUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenLogs}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#f3f6fb] px-4 text-[14px] font-extrabold text-[#1f2937]"
        >
          <ShieldCheck aria-hidden="true" size={18} />
          활동·승인 기록 보기
        </button>
      </article>

      <article className="app-card mt-3 flex items-center justify-between rounded-[8px] p-4">
        <div>
          <p className="text-[16px] font-extrabold">음성 입력</p>
          <p className="muted-text mt-1 text-[13px] font-medium">
            실제 녹음 없이 음성 버튼 UI만 제공합니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#f3f6fb] px-2 py-1 text-[10px] font-extrabold text-[#6b7280]">
            데모
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#2f6bff]">
            <Mic aria-hidden="true" size={21} />
          </div>
        </div>
      </article>

      <button
        type="button"
        onClick={onOpenTrustCenter}
        className="app-card mt-3 flex min-h-[76px] w-full items-center justify-between rounded-[8px] p-4 text-left hover:bg-[#fbfcff]"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
            <ShieldCheck aria-hidden="true" size={21} />
          </span>
          <span className="min-w-0">
            <span className="block text-[16px] font-extrabold">안전·신뢰센터</span>
            <span className="muted-text mt-1 block text-[13px] font-medium">
              AI의 역할, 승인, 데이터 원칙을 확인합니다.
            </span>
          </span>
        </span>
        <ChevronRight aria-hidden="true" size={19} className="shrink-0 text-[#6b7280]" />
      </button>

      <button
        type="button"
        onClick={onOpenGuide}
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] text-[13px] font-extrabold text-[#6b7280]"
      >
        <BookOpen aria-hidden="true" size={17} />
        서비스 안내 다시 보기
      </button>

      <p className="muted-text mt-4 text-center text-[11px] font-semibold leading-5">
        데모에서는 실제 정보를 저장하거나 외부로 전송하지 않습니다.
      </p>
    </section>
  );
}

function SettingButton({
  title,
  description,
  active,
  icon,
  onClick,
  last = false,
}: {
  title: string;
  description: string;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={[
        "flex min-h-20 w-full items-center justify-between py-4 text-left",
        last ? "" : "border-b hairline",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
          {icon}
        </span>
        <span>
          <span className="block text-[16px] font-extrabold">{title}</span>
          <span className="muted-text mt-1 block text-[13px] font-medium">
            {description}
          </span>
        </span>
      </span>
      <span
        className={[
          "rounded-full px-3 py-1 text-[12px] font-bold",
          active ? "bg-[#2f6bff] text-white" : "bg-[#f3f4f6] text-[#6b7280]",
        ].join(" ")}
      >
        {active ? "켜짐" : "꺼짐"}
      </span>
    </button>
  );
}
