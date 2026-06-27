import { ClipboardCheck, FileClock, Home, Settings } from "lucide-react";
import type { Screen, TabItem } from "../types";

const tabs: TabItem[] = [
  { key: "home", label: "홈", icon: Home },
  { key: "package", label: "실행", icon: ClipboardCheck },
  { key: "logs", label: "기록", icon: FileClock },
  { key: "settings", label: "설정", icon: Settings },
];

type BottomNavProps = {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
};

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="tab-bar fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t hairline bg-white px-3 pb-3 pt-2"
      aria-label="하단 메뉴"
    >
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            currentScreen === tab.key ||
            (tab.key === "package" &&
              ["consent", "application", "approval"].includes(currentScreen));

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onNavigate(tab.key)}
              className={[
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[10px] text-[11px] font-bold transition",
                active
                  ? "bg-[#eef4ff] text-[#2f6bff]"
                  : "text-[#9ca3af] hover:bg-[#f7f9fc]",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <Icon aria-hidden="true" size={20} strokeWidth={active ? 2.7 : 2.1} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
