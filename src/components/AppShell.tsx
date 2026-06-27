import type { ReactNode } from "react";
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

  return (
    <div
      className={[
        "min-h-screen bg-[#e8edf5] text-[#1f2937]",
        largeText ? "large-text" : "",
        highContrast ? "high-contrast" : "",
      ].join(" ")}
    >
      <div className="app-bg app-shell-shadow mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        {showChrome ? (
          <header className="surface sticky top-0 z-20 border-b hairline bg-[#f6f8fb]/95 px-5 pb-3 pt-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate("home")}
                className="flex items-center gap-3 text-left"
                aria-label="홈으로 이동"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#2f6bff] text-white">
                  <Bot aria-hidden="true" size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#6b7280]">
                    공공 AI 데모
                  </p>
                  <p className="text-[17px] font-extrabold">
                    국민 AI 오토파일럿
                  </p>
                </div>
              </button>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2f6bff] shadow-sm"
                aria-label="음성 입력"
                title="음성 입력"
              >
                <Mic aria-hidden="true" size={20} />
              </button>
            </div>
          </header>
        ) : null}

        <main className={showChrome ? "flex-1 pb-24" : "flex-1"}>
          {children}
        </main>

        {showChrome ? (
          <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
        ) : null}
      </div>
    </div>
  );
}
