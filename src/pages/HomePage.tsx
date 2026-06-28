import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Database,
  FileClock,
  FileText,
  Mic,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/Button";
import { KpiCards } from "../components/KpiCards";
import { StatusPill } from "../components/StatusPill";
import { agentProfile, rightsPackages } from "../data/mockData";

type HomePageProps = {
  simpleMode: boolean;
  onOpenPackage: () => void;
  onOpenConsent: () => void;
  onOpenLogs: () => void;
  onOpenSettings: () => void;
};

type AgentAction = {
  title: string;
  description: string;
  steps: string[];
  buttonLabel: string;
  icon: ReactNode;
  onRun: () => void;
};

const suggestions = [
  "나 실직했어",
  "신청서 준비해줘",
  "내 동의 기록 보여줘",
];

export function HomePage({
  simpleMode,
  onOpenPackage,
  onOpenConsent,
  onOpenLogs,
  onOpenSettings,
}: HomePageProps) {
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [agentAction, setAgentAction] = useState<AgentAction | null>(null);
  const [supportChecked, setSupportChecked] = useState(false);

  function submitMessage(value = message) {
    const cleanValue = value.trim();
    if (!cleanValue) return;

    setSubmittedMessage(cleanValue);
    setAgentAction(
      createAgentAction(cleanValue, {
        onOpenPackage,
        onOpenConsent,
        onOpenLogs,
        onOpenSettings,
      }),
    );

    if (
      includesAny(cleanValue.replace(/\s/g, ""), [
        "실직",
        "지원",
        "받을",
        "퇴사",
        "구직",
      ])
    ) {
      setSupportChecked(true);
    }

    setMessage("");
  }

  return (
    <section className="px-5 py-5">
      <div>
        <p className="text-[13px] font-extrabold text-[#2f6bff]">
          모두의 AI 기반에서 작동 가능한 생애사건 권리실행 에이전트 데모
        </p>
        <h1 className="mt-2 text-[29px] font-extrabold leading-[1.2]">
          받을 수 있는 지원을
          <br />
          먼저 확인해볼까요?
        </h1>
      </div>

      <SupportLookupPanel
        simpleMode={simpleMode}
        checked={supportChecked}
        onCheck={() => setSupportChecked(true)}
        onOpenPackage={onOpenPackage}
        onOpenConsent={onOpenConsent}
      />

      <AgentChat
        message={message}
        submittedMessage={submittedMessage}
        action={agentAction}
        onMessageChange={setMessage}
        onSubmit={submitMessage}
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <InfoCard
          icon={<ShieldCheck aria-hidden="true" size={21} />}
          title="승인 후 제출"
          description="AI가 혼자 제출하지 않아요."
        />
        <InfoCard
          icon={<Clock3 aria-hidden="true" size={21} />}
          title="공식 판정 별도"
          description="처분은 소관기관이 수행합니다."
        />
      </div>

      <div className="mt-6">
        <h2 className="text-[18px] font-extrabold">다음에 확인할 패키지</h2>
        <div className="mt-2 space-y-2">
          {rightsPackages.slice(1).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-[8px] bg-white px-4 py-3 shadow-[0_6px_18px_rgba(31,41,55,0.04)]"
            >
              <div>
                <p className="text-[16px] font-bold">{item.title}</p>
                <p className="muted-text mt-0.5 text-[13px] font-medium">
                  {item.alert}
                </p>
              </div>
              <span className="rounded-full bg-[#f3f6fb] px-2.5 py-1 text-[12px] font-bold text-[#6b7280]">
                대기
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportLookupPanel({
  simpleMode,
  checked,
  onCheck,
  onOpenPackage,
  onOpenConsent,
}: {
  simpleMode: boolean;
  checked: boolean;
  onCheck: () => void;
  onOpenPackage: () => void;
  onOpenConsent: () => void;
}) {
  const packageItem = rightsPackages[0];
  const primaryItems = packageItem.items.slice(0, 3);

  if (!checked) {
    return (
      <article className="app-card mt-5 overflow-hidden rounded-[8px]">
        <div className="bg-[#2f6bff] px-5 py-5 text-white">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white/16">
              <Search aria-hidden="true" size={23} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white/80">
                {agentProfile.name}
              </p>
              <p className="mt-1 text-[21px] font-extrabold leading-7">
                기존 정부 AI 인프라와 연계해 신청 가능한 상태까지 준비합니다
              </p>
              <p className="mt-2 text-[14px] font-semibold leading-6 text-white/80">
                실직, 출산, 돌봄 같은 생애사건을 기준으로 놓친 권리를 찾아봅니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4">
          <Metric value="1분" label="확인 시작" />
          <Metric value="동의 전" label="제출 없음" />
          <Metric value="AI" label="자동 정리" />
        </div>

        <div className="px-4 pb-4">
          <Button
            onClick={onCheck}
            className="w-full"
            icon={<ArrowRight aria-hidden="true" size={20} />}
          >
            내가 받을 수 있는 지원 확인하기
          </Button>
          <p className="muted-text mt-3 text-center text-[12px] font-semibold leading-5">
            데모 화면에서는 실제 개인정보를 조회하지 않습니다.
          </p>
        </div>
      </article>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      <article className="app-card rounded-[8px] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-extrabold text-[#2f6bff]">
              조회 결과
            </p>
            <h2 className="mt-1 text-[22px] font-extrabold leading-7">
              받을 수 있는 지원 5건을 찾았어요
            </h2>
            <p className="muted-text mt-2 text-[14px] font-semibold leading-6">
              {simpleMode
                ? "먼저 신청 가능한 항목부터 보여드려요."
                : "가능성 분류 후 바로 신청 가능한 항목과 추가 확인 항목을 나눴습니다."}
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
            <CheckCircle2 aria-hidden="true" size={23} />
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {primaryItems.map((item) => (
            <div
              key={item.name}
              className="rounded-[8px] border hairline bg-white px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-extrabold">{item.name}</p>
                  <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                    {item.description}
                  </p>
                </div>
                <StatusPill status={item.status} />
              </div>
              <button
                type="button"
                onClick={onOpenConsent}
                className="mt-3 flex min-h-10 w-full items-center justify-center rounded-[8px] bg-[#eef4ff] px-4 text-[13px] font-extrabold text-[#2f6bff]"
              >
                신청 준비
              </button>
            </div>
          ))}
        </div>

        <Button
          onClick={onOpenPackage}
          className="mt-4 w-full"
          icon={<ArrowRight aria-hidden="true" size={20} />}
        >
          전체 지원 5건 보기
        </Button>
      </article>
      <KpiCards />
    </div>
  );
}

function AgentChat({
  message,
  submittedMessage,
  action,
  onMessageChange,
  onSubmit,
}: {
  message: string;
  submittedMessage: string;
  action: AgentAction | null;
  onMessageChange: (value: string) => void;
  onSubmit: (value?: string) => void;
}) {
  return (
    <article className="app-card mt-4 rounded-[8px] p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[#2f6bff]">
            <Sparkles aria-hidden="true" size={16} />
            <p className="text-[13px] font-bold">AI에게 요청</p>
          </div>
          <p className="mt-1 text-[17px] font-extrabold">말하거나 입력하세요</p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff] text-[#2f6bff]"
          aria-label="음성으로 요청하기"
        >
          <Mic aria-hidden="true" size={20} />
        </button>
      </div>

      {submittedMessage ? (
        <div className="mt-4 space-y-3">
          <div className="ml-auto max-w-[86%] rounded-[8px] rounded-br-[4px] bg-[#2f6bff] px-4 py-3 text-[14px] font-semibold leading-6 text-white">
            {submittedMessage}
          </div>
          <div className="max-w-[90%] rounded-[8px] rounded-bl-[4px] bg-[#f3f6fb] px-4 py-3 text-[14px] font-semibold leading-6 text-[#374151]">
            요청을 확인했어요. 바로 실행할 수 있는 작업을 만들었습니다.
          </div>
          {action ? <ActionCard action={action} /> : null}
        </div>
      ) : (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSubmit(suggestion)}
              className="shrink-0 rounded-full bg-[#f3f6fb] px-3 py-2 text-[13px] font-semibold text-[#4b5563]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        className="mt-4 flex items-center gap-2 rounded-[8px] border border-[#e5eaf0] bg-[#f9fbfd] p-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder="AI에게 요청을 입력하세요"
          className="min-w-0 flex-1 bg-transparent px-2 text-[15px] font-medium text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
          aria-label="AI에게 요청 입력"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f6bff] text-white disabled:bg-[#c9d6f8]"
          disabled={!message.trim()}
          aria-label="채팅 보내기"
        >
          <Send aria-hidden="true" size={18} />
        </button>
      </form>
    </article>
  );
}

function ActionCard({ action }: { action: AgentAction }) {
  return (
    <div className="rounded-[8px] border border-[#dce8ff] bg-[#f7faff] p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#2f6bff] text-white">
          {action.icon}
        </div>
        <div>
          <p className="text-[16px] font-extrabold text-[#1f2937]">
            {action.title}
          </p>
          <p className="muted-text mt-1 text-[13px] font-semibold leading-5">
            {action.description}
          </p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {action.steps.map((step) => (
          <div key={step} className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" size={16} className="text-[#2f6bff]" />
            <p className="text-[13px] font-bold text-[#4b5563]">{step}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={action.onRun}
        className="mt-4 w-full"
        icon={<ArrowRight aria-hidden="true" size={18} />}
      >
        {action.buttonLabel}
      </Button>
    </div>
  );
}

function createAgentAction(
  text: string,
  actions: {
    onOpenPackage: () => void;
    onOpenConsent: () => void;
    onOpenLogs: () => void;
    onOpenSettings: () => void;
  },
): AgentAction {
  const normalized = text.replace(/\s/g, "");

  if (includesAny(normalized, ["실직", "퇴사", "해고", "구직", "일자리", "지원"])) {
    return {
      title: "실직자 권리실행 패키지를 만들었어요",
      description: "지원 가능성을 분류했고, 목적별 동의 후 신청 준비로 이어질 수 있습니다.",
      steps: ["지원 후보 5건 감지", "바로 신청 가능 항목 우선 표시", "목적별 동의 단계 준비"],
      buttonLabel: "권리 실행 시작",
      icon: <Sparkles aria-hidden="true" size={20} />,
      onRun: actions.onOpenPackage,
    };
  }

  if (includesAny(normalized, ["신청서", "서류", "준비", "제출"])) {
    return {
      title: "신청 준비를 시작할 수 있어요",
      description: "필요한 정보 조회에 동의하면 AI가 신청서 초안을 준비합니다.",
      steps: ["필요 데이터 3개 확인", "첨부서류 대체 가능 여부 점검", "사용자 승인 전 제출 차단"],
      buttonLabel: "동의하고 준비하기",
      icon: <FileText aria-hidden="true" size={20} />,
      onRun: actions.onOpenConsent,
    };
  }

  if (includesAny(normalized, ["기록", "조회내역", "동의기록", "로그"])) {
    return {
      title: "AI 활동 기록을 열 수 있어요",
      description: "언제 어떤 정보를 조회했고 어떤 신청서를 준비했는지 확인합니다.",
      steps: ["조회 시간 확인", "신청서 준비 이력 확인", "대리권 철회 가능"],
      buttonLabel: "기록 보기",
      icon: <FileClock aria-hidden="true" size={20} />,
      onRun: actions.onOpenLogs,
    };
  }

  if (includesAny(normalized, ["마이데이터", "개인정보", "정보관리", "동의철회"])) {
    return {
      title: "내 마이데이터 관리로 이동할 수 있어요",
      description: "연결된 개인정보, 사용 기간, 최근 사용 내역을 확인합니다.",
      steps: ["연결 정보 확인", "사용 기간 확인", "동의 철회 가능"],
      buttonLabel: "마이데이터 관리",
      icon: <Database aria-hidden="true" size={20} />,
      onRun: actions.onOpenSettings,
    };
  }

  return {
    title: "권리 탐색을 시작했어요",
    description: "말씀하신 상황에 맞는 지원 후보를 찾고 있습니다.",
    steps: ["상황 분류", "관련 권리 탐색", "필요 동의 항목 정리"],
    buttonLabel: "실행 패키지 보기",
    icon: <Bot aria-hidden="true" size={20} />,
    onRun: actions.onOpenPackage,
  };
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="subtle-card rounded-[8px] p-3">
      <p className="text-[19px] font-extrabold">{value}</p>
      <p className="muted-text mt-0.5 text-[12px] font-medium">{label}</p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="app-card rounded-[8px] p-4">
      <div className="text-[#2f6bff]">{icon}</div>
      <p className="mt-3 text-[16px] font-extrabold">{title}</p>
      <p className="muted-text mt-1 text-[13px] font-medium leading-5">
        {description}
      </p>
    </article>
  );
}
