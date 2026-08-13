import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Compass,
  Eye,
  FileText,
  Flag,
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
  userProfile,
} from "../data/mockData";
import type {
  ActionState,
  HomeView,
  Mission,
  MissionAction,
  MissionPhase,
} from "../types";

type HomePageProps = {
  simpleMode: boolean;
  view: HomeView;
  missionPhase: MissionPhase;
  onChangeView: (view: HomeView) => void;
  onCreateMission: () => void;
  onConfirmEmployment: () => void;
  onResetMission: () => void;
  onOpenPackage: () => void;
  onOpenConsent: () => void;
  onOpenLogs: () => void;
  onOpenSettings: () => void;
};

export function HomePage(props: HomePageProps) {
  const { view } = props;

  if (view === "entry") {
    return <EntryChoices onChangeView={props.onChangeView} />;
  }

  if (view === "goal") {
    return (
      <GoalComposer
        onBack={() => props.onChangeView("entry")}
        onCreateMission={props.onCreateMission}
      />
    );
  }

  if (view === "direction") {
    return (
      <DirectionFinder
        onBack={() => props.onChangeView("entry")}
        onCreateMission={props.onCreateMission}
      />
    );
  }

  if (view === "support") {
    return (
      <SupportExplorer
        onBack={() => props.onChangeView("entry")}
        onOpenPackage={props.onOpenPackage}
        onOpenConsent={props.onOpenConsent}
        onCreateMission={props.onCreateMission}
      />
    );
  }

  return <MissionBoard {...props} />;
}

function EntryChoices({ onChangeView }: { onChangeView: (view: HomeView) => void }) {
  const choices = [
    {
      title: "하고 싶은 일이 있어요",
      description: "취업·독립처럼 앞으로 하고 싶은 일을 알려주세요.",
      icon: Target,
      view: "goal" as const,
      primary: true,
    },
    {
      title: "AI와 같이 방향을 찾고 싶어요",
      description: "현재 상황을 바탕으로 선택지를 함께 살펴봅니다.",
      icon: Compass,
      view: "direction" as const,
      primary: false,
    },
    {
      title: "일단 받을 수 있는 걸 보고 싶어요",
      description: "지금 확인할 가치가 있는 지원부터 찾아봅니다.",
      icon: Search,
      view: "support" as const,
      primary: false,
    },
  ];

  return (
    <section className="px-5 py-6">
      <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#2f6bff]">
        <Sparkles aria-hidden="true" size={16} />
        확인된 현재 상태를 기억하고 있어요
      </div>
      <h1 className="keep-korean mt-3 text-[29px] font-extrabold leading-[1.22]">
        오늘은 무엇부터
        <br />
        같이 해볼까요?
      </h1>
      <p className="muted-text mt-3 text-[15px] font-semibold leading-6">
        이미 확인된 정보는 다시 묻지 않고, 지금 할 수 있는 일부터 시작합니다.
      </p>

      <article className="surface mt-5 flex items-center gap-3 rounded-[8px] border border-[#dce8ff] bg-[#f7faff] px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#2f6bff] text-white">
          <UserRoundSearch aria-hidden="true" size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-extrabold">{userProfile.name}님의 현재 상태</p>
          <p className="muted-text mt-0.5 truncate text-[12px] font-medium">
            만 24세 · 졸업예정 · 미취업 · 부모와 거주
          </p>
        </div>
      </article>

      <div className="mt-4 space-y-3">
        {choices.map((choice) => {
          const Icon = choice.icon;
          return (
            <button
              key={choice.title}
              type="button"
              onClick={() => onChangeView(choice.view)}
              className={[
                "surface flex min-h-[104px] w-full items-center gap-4 rounded-[8px] border p-4 text-left shadow-[0_8px_22px_rgba(31,41,55,0.05)] transition active:scale-[0.99]",
                choice.primary
                  ? "border-[#b9ceff] bg-white"
                  : "border-[#e9eef5] bg-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px]",
                  choice.primary
                    ? "bg-[#2f6bff] text-white"
                    : "bg-[#eef4ff] text-[#2f6bff]",
                ].join(" ")}
              >
                <Icon aria-hidden="true" size={23} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-extrabold">{choice.title}</span>
                <span className="muted-text mt-1 block text-[13px] font-medium leading-5">
                  {choice.description}
                </span>
              </span>
              <ArrowRight aria-hidden="true" size={19} className="shrink-0 text-[#9ca3af]" />
            </button>
          );
        })}
      </div>

      <p className="muted-text mt-5 text-center text-[12px] font-semibold leading-5">
        데모에서는 실제 개인정보나 행정정보를 조회하지 않습니다.
      </p>
    </section>
  );
}

function GoalComposer({
  onBack,
  onCreateMission,
}: {
  onBack: () => void;
  onCreateMission: () => void;
}) {
  const [goal, setGoal] = useState(missionBefore.userGoal);

  return (
    <section className="px-5 py-5">
      <BackButton onClick={onBack} />
      <div className="mt-5">
        <p className="text-[12px] font-extrabold text-[#2f6bff]">새 목표</p>
        <h1 className="keep-korean mt-2 text-[28px] font-extrabold leading-[1.22]">
          앞으로 하고 싶은 일을
          <br />
          편하게 말해주세요
        </h1>
        <p className="muted-text mt-3 text-[14px] font-semibold leading-6">
          이미 확인된 현재 상태와 연결해 지속적으로 관리할 미션으로 바꿉니다.
        </p>
      </div>

      <form
        className="app-card mt-6 rounded-[8px] p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (goal.trim()) onCreateMission();
        }}
      >
        <label htmlFor="mission-goal" className="text-[13px] font-extrabold text-[#2f6bff]">
          내 목표
        </label>
        <textarea
          id="mission-goal"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          rows={4}
          className="mt-3 w-full resize-none rounded-[8px] border border-[#dfe6ef] bg-[#f9fbfd] p-4 text-[18px] font-bold leading-7 text-[#1f2937] outline-none"
        />
        <div className="mt-3 flex items-center gap-2 text-[12px] font-bold text-[#6b7280]">
          <Mic aria-hidden="true" size={17} className="text-[#2f6bff]" />
          음성 입력도 사용할 수 있어요
        </div>
        <Button
          type="submit"
          className="mt-5 w-full"
          disabled={!goal.trim()}
          icon={<Sparkles aria-hidden="true" size={19} />}
        >
          AI 미션 만들기
        </Button>
      </form>

      <div className="surface mt-4 rounded-[8px] bg-[#eef4ff] p-4">
        <p className="text-[13px] font-extrabold text-[#1e4ed8]">다시 묻지 않는 정보</p>
        <p className="mt-1 text-[13px] font-semibold leading-5 text-[#31569b]">
          만 24세 · 졸업예정 · 수도권 거주 · 현재 미취업 · 부모와 거주
        </p>
      </div>
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
    <section className="px-5 py-5">
      <BackButton onClick={onBack} />
      <div className="mt-5">
        <p className="text-[12px] font-extrabold text-[#2f6bff]">AI와 방향 찾기</p>
        <h1 className="keep-korean mt-2 text-[27px] font-extrabold leading-[1.25]">
          선택에 따라 달라지는 일을
          <br />
          나란히 살펴봤어요
        </h1>
      </div>

      <div className="mt-5 rounded-[8px] bg-[#2f6bff] px-4 py-4 text-white">
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
        취업하고 독립하기 미션 만들기
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
    <section className="px-5 py-5">
      <BackButton onClick={onBack} />
      <div className="mt-5">
        <p className="text-[12px] font-extrabold text-[#2f6bff]">현재 상태 기준</p>
        <h1 className="keep-korean mt-2 text-[28px] font-extrabold leading-[1.22]">
          지금 확인할 가치가 있는 지원
        </h1>
        <p className="muted-text mt-3 text-[14px] font-semibold leading-6">
          많은 목록 대신, 행동 시점에 따라 네 가지로 정리했습니다.
        </p>
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
              {state === "now" && index === 0 ? (
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
        분류 결과 자세히 보기
      </Button>
      <p className="muted-text mt-4 text-center text-[12px] font-semibold">
        모든 항목은 시나리오 기반 데모 예시입니다.
      </p>
    </section>
  );
}

function MissionBoard({
  simpleMode,
  missionPhase,
  onChangeView,
  onConfirmEmployment,
  onResetMission,
  onOpenConsent,
  onOpenLogs,
  onOpenSettings,
}: HomePageProps) {
  const [replanning, setReplanning] = useState(false);
  const mission = missionPhase === "employmentConfirmed" ? missionAfter : missionBefore;

  function runReplan() {
    setReplanning(true);
    window.setTimeout(() => {
      onConfirmEmployment();
      setReplanning(false);
    }, 800);
  }

  return (
    <section className="px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-extrabold text-[#2f6bff]">내 미션</p>
          <h1 className="mt-1 text-[28px] font-extrabold leading-[1.2]">
            {mission.title}
          </h1>
        </div>
        <span className="shrink-0 rounded-full bg-[#eaf7f1] px-2.5 py-1.5 text-[11px] font-extrabold text-[#0f7b55]">
          계속 관리 중
        </span>
      </div>

      <article className="mt-4 overflow-hidden rounded-[8px] bg-[#244fc7] text-white shadow-[0_16px_34px_rgba(36,79,199,0.2)]">
        <div className="p-5">
          <div className="flex items-center gap-2 text-[12px] font-bold text-white/75">
            <Target aria-hidden="true" size={16} />
            {mission.updatedLabel}
          </div>
          <p className="mt-3 text-[20px] font-extrabold leading-7">
            {mission.nextAction}
          </p>
          {!simpleMode ? (
            <p className="mt-3 text-[13px] font-medium leading-5 text-white/75">
              {mission.summary}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-3 border-t border-white/15 bg-black/5 px-4 py-3 text-center">
          <MissionMetric label="지금 할 일" value={countActions(mission, "now")} />
          <MissionMetric label="지켜보는 중" value={countActions(mission, "watch")} />
          <MissionMetric label="조건 대기" value={countActions(mission, "wait")} />
        </div>
      </article>

      {missionPhase === "employmentConfirmed" ? (
        <ReplanSummary onReset={onResetMission} />
      ) : (
        <ReplanTrigger loading={replanning} onRun={runReplan} />
      )}

      <div className="mt-6 space-y-4">
        <MissionGroup
          state="now"
          actions={getActions(mission, "now")}
          onPrepare={onOpenConsent}
          expanded
        />
        <MissionGroup state="watch" actions={getActions(mission, "watch")} />
        <MissionGroup state="wait" actions={getActions(mission, "wait")} />
      </div>

      <details className="surface mt-4 rounded-[8px] border hairline bg-white px-4">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[13px] font-extrabold text-[#6b7280]">
          지금은 제외한 항목 보기
          <ChevronDown aria-hidden="true" size={17} />
        </summary>
        <div className="border-t hairline pb-3 pt-1">
          {getActions(mission, "drop").map((action) => (
            <MissionActionRow key={action.id} action={action} />
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

      <article className="app-card mt-4 rounded-[8px] p-4">
        <p className="text-[16px] font-extrabold">다른 계획이 생겼나요?</p>
        <p className="muted-text mt-1 text-[13px] font-medium leading-5">
          목표는 언제든 바꾸거나 새로 시작할 수 있어요.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChangeView("goal")}
            className="min-h-11 rounded-[8px] bg-[#eef4ff] px-3 text-[13px] font-extrabold text-[#2f6bff]"
          >
            새 미션 만들기
          </button>
          <button
            type="button"
            onClick={() => onChangeView("direction")}
            className="min-h-11 rounded-[8px] bg-[#f3f6fb] px-3 text-[13px] font-extrabold text-[#4b5563]"
          >
            AI와 같이 고민하기
          </button>
        </div>
      </article>

      <p className="muted-text mt-5 text-center text-[11px] font-semibold leading-5">
        정책명과 판단 결과는 시나리오 기반 데모 예시이며 실제 자격 판정이 아닙니다.
      </p>
    </section>
  );
}

function MissionGroup({
  state,
  actions,
  onPrepare,
  expanded = false,
}: {
  state: ActionState;
  actions: MissionAction[];
  onPrepare?: () => void;
  expanded?: boolean;
}) {
  const config = actionStateConfig[state];
  const Icon = config.icon;

  return (
    <article className="app-card overflow-hidden rounded-[8px]">
      <div className={['flex items-center justify-between px-4 py-3', config.header].join(' ')}>
        <div className="flex items-center gap-2">
          <Icon aria-hidden="true" size={18} />
          <div>
            <p className="text-[14px] font-extrabold">
              {config.label} · {config.title}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold opacity-75">{config.description}</p>
          </div>
        </div>
        <span className="text-[13px] font-extrabold">{actions.length}</span>
      </div>
      <div className="px-4">
        {actions.map((action, index) => (
          <div
            key={action.id}
            className={index < actions.length - 1 ? "border-b hairline" : ""}
          >
            <MissionActionRow
              action={action}
              onPrepare={action.canPrepare ? onPrepare : undefined}
              showDescription={expanded}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

function MissionActionRow({
  action,
  onPrepare,
  showDescription = true,
}: {
  action: MissionAction;
  onPrepare?: () => void;
  showDescription?: boolean;
}) {
  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[15px] font-extrabold">{action.title}</p>
            {action.changeNote ? (
              <span className="rounded-full bg-[#eaf7f1] px-2 py-0.5 text-[10px] font-extrabold text-[#0f7b55]">
                {action.changeNote}
              </span>
            ) : null}
          </div>
          {showDescription ? (
            <p className="muted-text mt-1 text-[13px] font-medium leading-5">
              {action.description}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full bg-[#f3f6fb] px-2 py-1 text-[10px] font-bold text-[#6b7280]">
          {action.category}
        </span>
      </div>

      <details className="mt-2">
        <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1 text-[12px] font-extrabold text-[#2f6bff]">
          왜 이렇게 판단했나요?
          <ChevronDown aria-hidden="true" size={15} />
        </summary>
        <div className="surface rounded-[8px] bg-[#f7f9fc] px-3 py-3 text-[12px] font-medium leading-5 text-[#4b5563]">
          <p>{action.reason}</p>
          {action.nextCheck ? (
            <p className="mt-2 font-extrabold text-[#2f6bff]">다시 확인: {action.nextCheck}</p>
          ) : null}
        </div>
      </details>

      {onPrepare ? (
        <button
          type="button"
          onClick={onPrepare}
          className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#2f6bff] px-4 text-[13px] font-extrabold text-white"
        >
          <FileText aria-hidden="true" size={17} />
          신청 준비
        </button>
      ) : null}
    </div>
  );
}

function ReplanTrigger({ loading, onRun }: { loading: boolean; onRun: () => void }) {
  return (
    <article className="surface mt-4 rounded-[8px] border border-[#dce8ff] bg-[#f7faff] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
          <Clock3 aria-hidden="true" size={20} />
        </div>
        <div>
          <p className="text-[15px] font-extrabold">상황 변화 체험하기</p>
          <p className="muted-text mt-1 text-[12px] font-medium leading-5">
            취업 상태가 바뀌면 AI가 미션 전체를 다시 판단합니다.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRun}
        disabled={loading}
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-[13px] font-extrabold text-[#2f6bff] shadow-sm disabled:opacity-70"
      >
        <RefreshCw aria-hidden="true" size={17} className={loading ? "animate-spin" : ""} />
        {loading ? "미션 전체를 다시 판단하는 중..." : "3개월 후: 취업이 확정됐어요"}
      </button>
    </article>
  );
}

function ReplanSummary({ onReset }: { onReset: () => void }) {
  return (
    <article className="surface mt-4 overflow-hidden rounded-[8px] border border-[#b9dcd0] bg-[#f2fbf7]" aria-live="polite">
      <div className="p-4">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#0f7b55]">
          <RefreshCw aria-hidden="true" size={16} />
          {replanResult.eventTitle}
        </div>
        <h2 className="mt-2 text-[18px] font-extrabold leading-6">{replanResult.title}</h2>
        <p className="muted-text mt-2 text-[13px] font-medium leading-5">
          {replanResult.description}
        </p>
        <div className="mt-3 space-y-2">
          {replanResult.highlights.map((item) => (
            <div key={item} className="flex items-start gap-2 text-[12px] font-bold">
              <Check aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#0f7b55]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#cfe8df] bg-white/60 px-4 py-3">
        <p className="text-[11px] font-extrabold text-[#0f7b55]">새로운 다음 행동</p>
        <p className="mt-1 text-[14px] font-extrabold leading-5">{replanResult.nextAction}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 flex min-h-9 items-center gap-1 text-[12px] font-extrabold text-[#6b7280]"
        >
          <RotateCcw aria-hidden="true" size={15} />
          초기 상태로 되돌리기
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

    if (normalized.includes("취업") && normalized.includes("확정")) {
      if (missionPhase === "planning") onRunReplan();
      setResponse("취업 확정을 반영해 미션 전체의 행동 시점을 다시 판단할게요.");
    } else if (normalized.includes("왜") || normalized.includes("이유")) {
      setResponse("각 행동의 ‘왜 이렇게 판단했나요?’를 열면 현재 상태와 다시 확인할 시점을 볼 수 있어요.");
    } else if (normalized.includes("새미션") || normalized.includes("목표")) {
      setResponse("새 목표를 말할 수 있는 화면을 열어드릴게요.");
      onChangeView("goal");
    } else if (normalized.includes("기록")) {
      setResponse("AI가 한 일을 시간순으로 확인할 수 있어요.");
      onOpenLogs();
    } else if (normalized.includes("개인정보") || normalized.includes("마이데이터")) {
      setResponse("연결된 정보와 사용 기간을 확인할 수 있어요.");
      onOpenSettings();
    } else {
      setResponse("현재 미션에 반영할 수 있는 변화인지 확인했어요. 필요한 경우에만 추가 정보를 물어볼게요.");
    }
    setMessage("");
  }

  return (
    <details className="app-card mt-4 rounded-[8px] px-4">
      <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
            <MessageCircle aria-hidden="true" size={19} />
          </div>
          <div>
            <p className="text-[15px] font-extrabold">AI에게 변화 알리기</p>
            <p className="muted-text mt-0.5 text-[12px] font-medium">목표 수정 · 이유 질문 · 상황 변화</p>
          </div>
        </div>
        <ChevronDown aria-hidden="true" size={18} className="text-[#6b7280]" />
      </summary>
      <div className="border-t hairline pb-4 pt-3">
        {response ? (
          <div className="surface mb-3 rounded-[8px] bg-[#f3f6fb] px-3 py-3 text-[13px] font-semibold leading-5" aria-live="polite">
            {response}
          </div>
        ) : null}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {["취업이 확정됐어요", "왜 기다려야 해?", "새 목표가 생겼어"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMessage(item)}
              className="shrink-0 rounded-full bg-[#f3f6fb] px-3 py-2 text-[12px] font-bold text-[#4b5563]"
            >
              {item}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 rounded-[8px] border hairline bg-[#f9fbfd] p-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="변화나 질문을 입력하세요"
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

const actionStateConfig: Record<
  ActionState,
  {
    label: string;
    title: string;
    description: string;
    icon: typeof CircleDot;
    header: string;
    pill: string;
  }
> = {
  now: {
    label: "NOW",
    title: "지금 할 일",
    description: "현재 행동할 가치가 있어요",
    icon: CircleDot,
    header: "bg-[#eaf1ff] text-[#1e4ed8]",
    pill: "bg-[#eaf1ff] text-[#1e4ed8]",
  },
  watch: {
    label: "WATCH",
    title: "AI가 지켜보는 중",
    description: "정책과 공고 변화를 확인해요",
    icon: Eye,
    header: "bg-[#edf8f5] text-[#0f7b68]",
    pill: "bg-[#edf8f5] text-[#0f7b68]",
  },
  wait: {
    label: "WAIT",
    title: "조건을 기다리는 중",
    description: "행동할 시점이 오면 다시 봐요",
    icon: Hourglass,
    header: "bg-[#fff7e9] text-[#9a5b00]",
    pill: "bg-[#fff7e9] text-[#9a5b00]",
  },
  drop: {
    label: "DROP",
    title: "지금은 제외",
    description: "현재 우선순위가 아니에요",
    icon: Flag,
    header: "bg-[#f3f4f6] text-[#6b7280]",
    pill: "bg-[#f3f4f6] text-[#6b7280]",
  },
};

function ActionStatePill({ state }: { state: ActionState }) {
  const config = actionStateConfig[state];
  return (
    <span className={["shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold", config.pill].join(" ")}>
      {config.label}
    </span>
  );
}

function MissionMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[19px] font-extrabold">{value}</p>
      <p className="mt-0.5 text-[10px] font-bold text-white/70">{label}</p>
    </div>
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
      처음 선택으로
    </button>
  );
}

function getActions(mission: Mission, state: ActionState) {
  return mission.actions.filter((action) => action.state === state);
}

function countActions(mission: Mission, state: ActionState) {
  return getActions(mission, state).length;
}
