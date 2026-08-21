import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Compass,
  Eye,
  Hourglass,
  Lightbulb,
  MessageCircle,
  Mic,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Target,
  UserRoundSearch,
} from "lucide-react";
import { Button } from "../components/Button";
import {
  directionOptions,
  missionAfter,
  missionBefore,
  replanResult,
  rightsPackages,
} from "../data/mockData";
import type {
  ActionState,
  HomeView,
  MissionAction,
  MissionPhase,
} from "../types";

type HomePageProps = {
  simpleMode: boolean;
  view: HomeView;
  missionPhase: MissionPhase;
  navigationNotice: string;
  onChangeView: (view: HomeView) => void;
  onCreateMission: () => void;
  onConfirmEmployment: () => void;
  onResetMission: () => void;
  onOpenPackage: () => void;
  onOpenConsent: () => void;
  onOpenLogs: () => void;
  onOpenSettings: () => void;
};

const relatedGoalWords = [
  "취업",
  "취직",
  "일자리",
  "구직",
  "직장",
  "일하고",
  "일할",
  "독립",
  "자취",
  "혼자살",
  "나가서살",
  "이사",
];

function matchesDemoScenario(value: string) {
  const normalized = value.replace(/\s/g, "");
  return relatedGoalWords.some((word) => normalized.includes(word));
}

export function HomePage(props: HomePageProps) {
  if (props.view === "goal") {
    return (
      <GoalComposer
        navigationNotice={props.navigationNotice}
        onCreateMission={props.onCreateMission}
        onFindDirection={() => props.onChangeView("direction")}
        onBrowseSupport={() => props.onChangeView("support")}
      />
    );
  }

  if (props.view === "direction") {
    return (
      <DirectionFinder
        onBack={() => props.onChangeView("goal")}
        onCreateMission={props.onCreateMission}
      />
    );
  }

  if (props.view === "support") {
    return (
      <SupportExplorer
        onBack={() => props.onChangeView("goal")}
        onOpenPackage={props.onOpenPackage}
        onOpenConsent={props.onOpenConsent}
        onCreateMission={props.onCreateMission}
      />
    );
  }

  return <MissionBoard {...props} />;
}

function GoalComposer({
  navigationNotice,
  onCreateMission,
  onFindDirection,
  onBrowseSupport,
}: {
  navigationNotice: string;
  onCreateMission: () => void;
  onFindDirection: () => void;
  onBrowseSupport: () => void;
}) {
  const [goal, setGoal] = useState(missionBefore.userGoal);
  const [showScenarioAssist, setShowScenarioAssist] = useState(false);

  return (
    <section className="px-5 pb-5 pt-4">
      <div>
        <p className="text-[12px] font-extrabold text-[#2f6bff]">
          정책을 추천하는 AI가 아니라, 다음 할 일을 찾는 AI
        </p>
        <h1 className="keep-korean mt-2 text-pretty text-[31px] font-extrabold leading-[1.18]">
          무엇을 이루고 싶나요?
        </h1>
        <p className="muted-text mt-2 text-[14px] font-semibold leading-6">
          목표를 말하면 지금 할 일과 기다릴 일을 하나의 미션으로 관리해요.
        </p>
      </div>

      {navigationNotice ? (
        <div
          className="mt-3 rounded-[8px] border border-[#cfe0ff] bg-[#eef4ff] px-3 py-2.5 text-[12px] font-bold leading-5 text-[#1e4ed8]"
          role="status"
          aria-live="polite"
        >
          {navigationNotice}
        </div>
      ) : null}

      <form
        className="app-card mt-4 rounded-[8px] p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!goal.trim()) return;
          if (!matchesDemoScenario(goal)) {
            setShowScenarioAssist(true);
            return;
          }
          setShowScenarioAssist(false);
          onCreateMission();
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="mission-goal" className="text-[13px] font-extrabold text-[#2f6bff]">
            이루고 싶은 목표
          </label>
          <span className="rounded-full bg-[#f3f6fb] px-2.5 py-1 text-[11px] font-extrabold text-[#6b7280]">
            대표 시나리오
          </span>
        </div>
        <textarea
          id="mission-goal"
          name="mission-goal"
          autoComplete="off"
          value={goal}
          onChange={(event) => {
            setGoal(event.target.value);
            if (showScenarioAssist) setShowScenarioAssist(false);
          }}
          rows={3}
          className="mt-3 w-full resize-none rounded-[8px] border border-[#dfe6ef] bg-[#f9fbfd] p-4 text-[18px] font-bold leading-7 text-[#1f2937] outline-none"
        />
        <div
          className="muted-text mt-2 flex items-center gap-1.5 text-[11px] font-semibold"
          title="음성 입력은 실제로 녹음하거나 전송하지 않는 데모 UI입니다."
        >
          <Mic aria-hidden="true" size={15} className="text-[#2f6bff]" />
          음성 입력 데모
        </div>
        {showScenarioAssist ? (
          <div
            className="mt-3 rounded-[8px] border border-[#cfe0ff] bg-[#f7f9ff] p-3"
            role="status"
            aria-live="polite"
          >
            <p className="text-[12px] font-bold leading-5 text-[#4b5563]">
              현재 데모에서는 사회진입기 청년의 ‘서울 취업 + 독립’ 시나리오로 체험할 수 있어요.
            </p>
            <button
              type="button"
              onClick={() => {
                setGoal(missionBefore.userGoal);
                setShowScenarioAssist(false);
                onCreateMission();
              }}
              className="mt-2 min-h-11 w-full rounded-[8px] bg-white px-3 text-[13px] font-extrabold text-[#2f6bff] shadow-sm hover:bg-[#eef4ff]"
            >
              대표 시나리오로 체험하기
            </button>
          </div>
        ) : null}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!goal.trim()}
          icon={<Sparkles aria-hidden="true" size={19} />}
        >
          이 목표로 미션 시작
        </Button>
      </form>

      <div className="surface mt-3 flex items-center gap-3 rounded-[8px] border hairline bg-white px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
          <UserRoundSearch aria-hidden="true" size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-extrabold">가상 사용자 상태 · 데모</p>
          <p className="muted-text mt-0.5 text-[12px] font-medium leading-5">
            24세 · 졸업예정 · 구직 중 · 부모와 거주
          </p>
        </div>
      </div>

      <div className="mt-4 border-t hairline pt-3">
        <p className="muted-text text-center text-[12px] font-bold">
          목표가 아직 선명하지 않다면
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onFindDirection}
            className="min-h-12 rounded-[8px] bg-[#f3f6fb] px-3 text-[13px] font-extrabold text-[#4b5563]"
          >
            AI와 같이 목표 정하기
          </button>
          <button
            type="button"
            onClick={onBrowseSupport}
            className="min-h-12 rounded-[8px] bg-[#f3f6fb] px-3 text-[13px] font-extrabold text-[#4b5563]"
          >
            지금 받을 지원 보기
          </button>
        </div>
      </div>

      <p className="muted-text mt-4 text-center text-[10px] font-semibold leading-4">
        시연용 프로토타입으로 실제 개인정보·공공 마이데이터·행정시스템과 연계되지 않습니다.
      </p>
    </section>
  );
}

function DirectionFinder({
  onBack,
  onCreateMission,
}: {
  onBack: () => void;
  onCreateMission: () => void;
}) {
  return (
    <section className="px-5 pb-5 pt-4">
      <BackButton onClick={onBack} />
      <div className="mt-5">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#2f6bff]">
          <Compass aria-hidden="true" size={16} />
          AI와 목표 정하기
        </div>
        <h1 className="keep-korean mt-2 text-[27px] font-extrabold leading-[1.25]">
          선택에 따라 달라지는 일을 나란히 살펴봤어요
        </h1>
      </div>

      <div className="mt-5 rounded-[8px] bg-[#244fc7] px-4 py-4 text-white">
        <p className="text-[12px] font-bold text-white/75">고민 예시</p>
        <p className="mt-1 text-[16px] font-extrabold leading-6">
          “서울에서 취업하고 독립할지, 본가에서 취업 준비를 계속할지 고민돼.”
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {directionOptions.map((option, index) => (
          <article key={option.title} className="app-card rounded-[8px] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[14px] font-extrabold text-[#2f6bff]">
                {index + 1}
              </span>
              <h2 className="text-[17px] font-extrabold">{option.title}</h2>
            </div>
            <p className="muted-text mt-3 text-[13px] font-medium leading-5">
              {option.description}
            </p>
            <div className="mt-3 space-y-2">
              {option.considerations.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[13px] font-bold">
                  <Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-[#2f6bff]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="surface mt-4 rounded-[8px] bg-[#f3f6fb] p-4">
        <div className="flex gap-2">
          <Lightbulb aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-[#2f6bff]" />
          <p className="text-[13px] font-semibold leading-5">
            AI가 결정을 대신하지 않습니다. 선택에 따라 달라지는 공공지원과 절차만 정리합니다.
          </p>
        </div>
      </div>

      <Button
        onClick={onCreateMission}
        className="mt-5 w-full"
        icon={<Target aria-hidden="true" size={19} />}
      >
        서울 취업 + 독립 미션 만들기
      </Button>
    </section>
  );
}

function SupportExplorer({
  onBack,
  onOpenPackage,
  onOpenConsent,
  onCreateMission,
}: {
  onBack: () => void;
  onOpenPackage: () => void;
  onOpenConsent: () => void;
  onCreateMission: () => void;
}) {
  const item = rightsPackages[0];
  const states: ActionState[] = ["now", "now", "watch", "wait"];

  return (
    <section className="px-5 pb-5 pt-4">
      <BackButton onClick={onBack} />
      <div className="mt-5">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#2f6bff]">
          <Search aria-hidden="true" size={16} />
          현재 상태 기준
        </div>
        <h1 className="keep-korean mt-2 text-[28px] font-extrabold leading-[1.22]">
          지금 확인할 가치가 있는 지원
        </h1>
      </div>

      <article className="app-card mt-5 rounded-[8px] px-4">
        {item.items.map((support, index) => {
          const state = states[index];
          return (
            <div
              key={support.name}
              className={[
                "py-4",
                index < item.items.length - 1 ? "border-b hairline" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[15px] font-extrabold">{support.name}</p>
                  <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                    {support.description}
                  </p>
                </div>
                <ActionStatePill state={state} />
              </div>
              {index === 0 ? (
                <button
                  type="button"
                  onClick={onOpenConsent}
                  className="mt-3 flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[#eef4ff] px-4 text-[13px] font-extrabold text-[#2f6bff]"
                >
                  신청 준비
                </button>
              ) : null}
            </div>
          );
        })}
      </article>

      <Button
        onClick={onCreateMission}
        className="mt-5 w-full"
        icon={<Target aria-hidden="true" size={19} />}
      >
        이 지원을 미션으로 관리하기
      </Button>
      <Button variant="secondary" onClick={onOpenPackage} className="mt-3 w-full">
        지원 상태 자세히 보기
      </Button>
      <p className="muted-text mt-4 text-center text-[12px] font-semibold">
        모든 항목은 시나리오 기반 데모 예시입니다.
      </p>
    </section>
  );
}

function MissionBoard({
  missionPhase,
  onChangeView,
  onConfirmEmployment,
  onResetMission,
  onOpenPackage,
  onOpenLogs,
  onOpenSettings,
}: HomePageProps) {
  const [replanning, setReplanning] = useState(false);
  const mission = missionPhase === "employmentConfirmed" ? missionAfter : missionBefore;
  const primaryAction = getActions(mission, "now")[0];
  const watchAction = getActions(mission, "watch")[0];
  const waitAction = getActions(mission, "wait")[0];
  const visibleIds = new Set([primaryAction.id, watchAction.id, waitAction.id]);
  const remainingActions = mission.actions.filter((action) => !visibleIds.has(action.id));

  function runReplan() {
    setReplanning(true);
    window.setTimeout(() => {
      onConfirmEmployment();
      setReplanning(false);
    }, 900);
  }

  return (
    <section className="px-5 pb-5 pt-4">
      <div>
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#2f6bff]">
          <Target aria-hidden="true" size={16} />
          내 미션 · 데모 시나리오
        </div>
        <h1 className="keep-korean mt-2 text-[28px] font-extrabold leading-[1.2]">
          {mission.title}
        </h1>
        <p className="muted-text mt-2 text-[13px] font-semibold leading-5">
          {missionPhase === "employmentConfirmed"
            ? "24세 · 졸업예정 · 취업 확정 · 강남 · 12월 출근"
            : "24세 · 졸업예정 · 구직 중 · 부모와 거주"}
        </p>
      </div>

      {missionPhase === "employmentConfirmed" ? (
        <ReplanSummary onReset={onResetMission} />
      ) : null}

      <PrimaryActionCard
        action={primaryAction}
        compact={missionPhase === "employmentConfirmed"}
        onOpen={onOpenPackage}
      />

      <div className="mt-3 space-y-2">
        <SupportingAction
          icon={<Eye aria-hidden="true" size={18} />}
          label="AI가 새 공고 확인 중"
          action={watchAction}
          tone="mint"
        />
        <SupportingAction
          icon={<Hourglass aria-hidden="true" size={18} />}
          label="나중에 다시 확인"
          action={waitAction}
          tone="amber"
        />
      </div>

      {missionPhase === "planning" ? (
        <ReplanTrigger loading={replanning} onRun={runReplan} />
      ) : null}

      <details className="surface mt-3 rounded-[8px] border hairline bg-white px-4">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[13px] font-extrabold text-[#6b7280]">
          다른 관리 항목 {remainingActions.length}개 보기
          <ChevronDown aria-hidden="true" size={17} />
        </summary>
        <div className="border-t hairline pb-2">
          {remainingActions.map((action, index) => (
            <CompactAction
              key={action.id}
              action={action}
              last={index === remainingActions.length - 1}
            />
          ))}
        </div>
      </details>

      <AgentAssistant
        missionPhase={missionPhase}
        onChangeView={onChangeView}
        onRunReplan={runReplan}
        onOpenLogs={onOpenLogs}
        onOpenSettings={onOpenSettings}
      />

      <div className="mt-4 flex items-center justify-between border-t hairline pt-4">
        <p className="text-[13px] font-bold text-[#6b7280]">다른 계획이 생겼나요?</p>
        <button
          type="button"
          onClick={() => onChangeView("goal")}
          className="min-h-10 rounded-[8px] px-3 text-[13px] font-extrabold text-[#2f6bff]"
        >
          새 미션 만들기
        </button>
      </div>

      <p className="muted-text mt-4 text-center text-[11px] font-semibold leading-5">
        정책명과 판단 결과는 시나리오 기반 데모 예시이며 실제 자격 판정이 아닙니다.
      </p>
    </section>
  );
}

function PrimaryActionCard({
  action,
  compact,
  onOpen,
}: {
  action: MissionAction;
  compact: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className={[
        "overflow-hidden rounded-[8px] bg-[#244fc7] text-white shadow-[0_16px_34px_rgba(36,79,199,0.2)]",
        compact ? "mt-3" : "mt-4",
      ].join(" ")}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 text-[13px] font-extrabold text-white/80">
          <CircleDot aria-hidden="true" size={17} />
          지금 할 일
        </div>
        <h2 className="keep-korean mt-2 text-[21px] font-extrabold leading-7 text-white">
          {action.title}
        </h2>
        <p className="mt-2 text-[13px] font-medium leading-5 text-white/75">
          {action.description}
        </p>
        <details className="mt-2">
          <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1 text-[12px] font-extrabold text-white/85">
            왜 이걸 먼저 하나요?
            <ChevronDown aria-hidden="true" size={15} />
          </summary>
          <p className="rounded-[8px] bg-white/10 px-3 py-3 text-[12px] font-medium leading-5 text-white/90">
            {action.reason}
          </p>
        </details>
        <Button
          variant="inverse"
          onClick={onOpen}
          className="mt-3 w-full"
          icon={<ArrowRight aria-hidden="true" size={18} />}
        >
          지원 확인하기
        </Button>
      </div>
    </article>
  );
}

function SupportingAction({
  icon,
  label,
  action,
  tone,
}: {
  icon: ReactNode;
  label: string;
  action: MissionAction;
  tone: "mint" | "amber";
}) {
  const toneStyles =
    tone === "mint"
      ? "bg-[#edf8f5] text-[#0f7b68]"
      : "bg-[#fff7e9] text-[#9a5b00]";

  return (
    <details className="app-card rounded-[8px] px-4 py-3">
      <summary className="flex min-h-10 cursor-pointer list-none items-center gap-3">
        <div className={["flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]", toneStyles].join(" ")}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-extrabold text-[#6b7280]">{label}</p>
          <p className="mt-0.5 line-clamp-2 break-words text-[14px] font-extrabold leading-5">
            {action.title}
          </p>
        </div>
        <ChevronDown aria-hidden="true" size={17} className="shrink-0 text-[#6b7280]" />
      </summary>
      <p className="surface mt-2 rounded-[8px] bg-[#f7f9fc] px-3 py-3 text-[12px] font-medium leading-5 text-[#4b5563]">
        {action.reason}
      </p>
    </details>
  );
}

function CompactAction({ action, last }: { action: MissionAction; last: boolean }) {
  const stateLabel = {
    now: "지금 할 일",
    watch: "공고 확인 중",
    wait: "나중에 확인",
    drop: "우선순위 낮음",
  }[action.state];

  return (
    <div className={["py-3", last ? "" : "border-b hairline"].join(" ")}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-extrabold">{action.title}</p>
        <span className="shrink-0 rounded-full bg-[#f3f6fb] px-2 py-1 text-[10px] font-bold text-[#6b7280]">
          {stateLabel}
        </span>
      </div>
      {action.changeNote ? (
        <p className="mt-1 text-[11px] font-bold text-[#0f7b55]">{action.changeNote}</p>
      ) : null}
    </div>
  );
}

function ReplanTrigger({ loading, onRun }: { loading: boolean; onRun: () => void }) {
  return (
    <article className="mt-3 rounded-[8px] bg-[#18233a] p-4 text-white" aria-live="polite">
      <p className="text-[11px] font-extrabold text-white/60">상황 변화 체험</p>
      <p className="mt-1 text-[15px] font-extrabold">
        상황이 바뀌면 다음 할 일도 바뀝니다
      </p>
      <button
        type="button"
        onClick={onRun}
        disabled={loading}
        className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-[13px] font-extrabold text-[#18233a] shadow-sm disabled:opacity-70"
      >
        <RefreshCw aria-hidden="true" size={17} className={loading ? "animate-spin" : ""} />
        {loading
          ? "취업 상태를 반영해 미션을 다시 확인하고 있어요…"
          : "취업이 확정된 상황 반영하기"}
      </button>
    </article>
  );
}

function ReplanSummary({ onReset }: { onReset: () => void }) {
  return (
    <article
      className="surface mt-3 rounded-[8px] border border-[#b9dcd0] bg-[#f2fbf7] p-3.5"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#0f7b55]">
        <Check aria-hidden="true" size={16} />
        {replanResult.eventTitle}
      </div>
      <h2 className="keep-korean mt-1.5 text-[17px] font-extrabold leading-6">
        {replanResult.title}
      </h2>
      <p className="muted-text mt-1 text-[12px] font-medium leading-5">
        {replanResult.description}
      </p>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-[8px] bg-white/70 px-3 py-2.5">
        <div>
          <p className="text-[10px] font-bold text-[#8b94a3]">이전</p>
          <p className="mt-1 text-[12px] font-extrabold">취업지원 확인</p>
        </div>
        <ArrowRight aria-hidden="true" size={16} className="text-[#0f7b55]" />
        <div>
          <p className="text-[10px] font-bold text-[#0f7b55]">새로운 다음 행동</p>
          <p className="mt-1 text-[12px] font-extrabold">주거지원 확인</p>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-9 items-center gap-1 text-[12px] font-extrabold text-[#6b7280]"
        >
          <RotateCcw aria-hidden="true" size={15} />
          처음 상태로 되돌리기
        </button>
      </div>
    </article>
  );
}

function AgentAssistant({
  missionPhase,
  onChangeView,
  onRunReplan,
  onOpenLogs,
  onOpenSettings,
}: {
  missionPhase: MissionPhase;
  onChangeView: (view: HomeView) => void;
  onRunReplan: () => void;
  onOpenLogs: () => void;
  onOpenSettings: () => void;
}) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = message.replace(/\s/g, "");
    if (!normalized) return;

    if (normalized.includes("취업") && (normalized.includes("확정") || normalized.includes("출근"))) {
      if (missionPhase === "planning") onRunReplan();
      setResponse("취업 상태를 반영해 미션 전체를 다시 판단할게요.");
    } else if (normalized.includes("왜") || normalized.includes("이유")) {
      setResponse("각 항목을 열면 판단 이유를 짧게 볼 수 있어요.");
    } else if (normalized.includes("목표")) {
      onChangeView("goal");
    } else if (normalized.includes("기록")) {
      onOpenLogs();
    } else if (normalized.includes("개인정보") || normalized.includes("마이데이터")) {
      onOpenSettings();
    } else {
      setResponse("이 데모에서는 ‘취업 확정’, ‘판단 이유’, ‘기록’, ‘개인정보’ 요청을 체험할 수 있어요.");
    }
    setMessage("");
  }

  return (
    <details className="app-card mt-3 rounded-[8px] px-4">
      <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
            <MessageCircle aria-hidden="true" size={19} />
          </div>
          <div>
            <p className="text-[14px] font-extrabold">AI 데모에 변화 알리기</p>
            <p className="muted-text mt-0.5 text-[11px] font-medium">
              목표 수정 · 이유 질문 · 상황 변화
            </p>
          </div>
        </div>
        <ChevronDown aria-hidden="true" size={18} className="text-[#6b7280]" />
      </summary>
      <div className="border-t hairline pb-4 pt-3">
        {response ? (
          <div
            className="surface mb-3 rounded-[8px] bg-[#f3f6fb] px-3 py-3 text-[13px] font-semibold leading-5"
            aria-live="polite"
          >
            {response}
          </div>
        ) : null}
        <form
          onSubmit={submit}
          className="flex items-center gap-2 rounded-[8px] border hairline bg-[#f9fbfd] p-2 focus-within:border-[#2f6bff]"
        >
          <input
            name="agent-message"
            autoComplete="off"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="예: 취업이 확정됐어…"
            aria-label="AI에게 변화나 질문 입력"
            className="min-w-0 flex-1 bg-transparent px-2 text-[14px] font-medium text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f6bff] text-white disabled:bg-[#c9d6f8]"
            aria-label="보내기"
          >
            <Send aria-hidden="true" size={17} />
          </button>
        </form>
      </div>
    </details>
  );
}

function ActionStatePill({ state }: { state: ActionState }) {
  const config = {
    now: { label: "지금 확인", className: "bg-[#eaf1ff] text-[#1e4ed8]" },
    watch: { label: "공고 확인 중", className: "bg-[#edf8f5] text-[#0f7b68]" },
    wait: { label: "나중에 확인", className: "bg-[#fff7e9] text-[#9a5b00]" },
    drop: { label: "우선순위 낮음", className: "bg-[#f3f4f6] text-[#6b7280]" },
  }[state];

  return (
    <span className={["shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold", config.className].join(" ")}>
      {config.label}
    </span>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-10 items-center gap-1 text-[13px] font-extrabold text-[#6b7280]"
    >
      <ArrowLeft aria-hidden="true" size={18} />
      목표 입력으로
    </button>
  );
}

function getActions(mission: typeof missionBefore, state: ActionState) {
  return mission.actions.filter((action) => action.state === state);
}
