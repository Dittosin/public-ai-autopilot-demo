import { useEffect, useState, type ReactNode } from "react";
import { Bot, Mic } from "lucide-react";
import type { Screen } from "../types";
import { BottomNav } from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
  currentScreen: Screen;
  largeText: boolean;
  highContrast: boolean;
  simpleMode: boolean;
  onNavigate: (screen: Screen) => void;
  onToggleLargeText: () => void;
  onToggleHighContrast: () => void;
  onToggleSimpleMode: () => void;
};

export function AppShell({
  children,
  currentScreen,
  largeText,
  highContrast,
  onNavigate,
}: AppShellProps) {
  const showChrome = currentScreen !== "onboarding";
  const [voiceNotice, setVoiceNotice] = useState(false);

  useEffect(() => {
    if (!voiceNotice) return;
    const timeoutId = window.setTimeout(() => setVoiceNotice(false), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [voiceNotice]);

  return (
    <div
      className={[
        "min-h-screen bg-[#e8edf5] text-[#1f2937]",
        largeText ? "large-text" : "",
        highContrast ? "high-contrast" : "",
      ].join(" ")}
    >
      <a href="#main-content" className="skip-link">
        본문으로 건너뛰기
      </a>
      <div className="app-bg app-shell-shadow mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        {showChrome ? (
          <header className="surface sticky top-0 z-20 border-b hairline bg-[#f6f8fb]/95 px-5 pb-3 pt-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate("home")}
                className="flex min-w-0 flex-1 items-center gap-3 pr-2 text-left"
                aria-label="홈으로 이동"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#2f6bff] text-white">
                  <Bot aria-hidden="true" size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-[#6b7280]">
                    정책공모전 데모
                  </p>
                  <p className="truncate text-[17px] font-extrabold">
                    국민 AI 오토파일럿
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVoiceNotice(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2f6bff] shadow-sm"
                aria-label="음성 입력"
                title="음성 입력"
              >
                <Mic aria-hidden="true" size={20} />
              </button>
            </div>
          </header>
        ) : null}

        {voiceNotice ? (
          <div
            className="pointer-events-none fixed left-1/2 top-[78px] z-40 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-[8px] border border-[#cfe0ff] bg-white px-4 py-3 text-center text-[12px] font-bold leading-5 text-[#1e4ed8] shadow-lg"
            role="status"
            aria-live="polite"
          >
            음성 입력은 데모 UI입니다. 실제로 녹음하거나 전송하지 않습니다.
          </div>
        ) : null}

        <main id="main-content" className={showChrome ? "flex-1 pb-24" : "flex-1"}>
          {children}
        </main>

        {showChrome ? (
          <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
        ) : null}
      </div>
    </div>
  );
}
