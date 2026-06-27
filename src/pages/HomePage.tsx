import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  Clock3,
  Mic,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/Button";
import { agentProfile, rightsPackages, todayAlert } from "../data/mockData";

type HomePageProps = {
  simpleMode: boolean;
  onOpenPackage: () => void;
};

const suggestions = [
  "실직했는데 받을 수 있는 지원 찾아줘",
  "신청서 준비해줘",
  "내 동의 기록 보여줘",
];

export function HomePage({ simpleMode, onOpenPackage }: HomePageProps) {
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  function submitMessage(value = message) {
    const cleanValue = value.trim();
    if (!cleanValue) return;
    setSubmittedMessage(cleanValue);
    setMessage("");
  }

  return (
    <section className="px-5 py-5">
      <div>
        <p className="text-[13px] font-extrabold text-[#2f6bff]">
          안녕하세요, 민지님
        </p>
        <h1 className="mt-1 text-[29px] font-extrabold leading-[1.2]">
          오늘 실행할 권리를
          <br />
          정리해두었어요
        </h1>
      </div>

      <article className="app-card mt-5 overflow-hidden rounded-[8px]">
        <div className="bg-[#2f6bff] px-5 py-5 text-white">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white/16">
              <Bot aria-hidden="true" size={23} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-white/80">
                {agentProfile.name}
              </p>
              <p className="mt-1 text-[21px] font-extrabold leading-7">
                {simpleMode ? "받을 수 있는 지원 5건을 찾았어요." : todayAlert.title}
              </p>
              <p className="mt-2 text-[14px] font-semibold leading-6 text-white/80">
                {todayAlert.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4">
          <Metric value="5건" label="찾은 권리" />
          <Metric value="15분" label="예상 준비" />
          <Metric value="0건" label="자동 제출" />
        </div>

        <div className="px-4 pb-4">
          <Button
            onClick={onOpenPackage}
            className="w-full"
            icon={<ArrowRight aria-hidden="true" size={20} />}
          >
            실행 패키지 보기
          </Button>
        </div>
      </article>

      <AgentChat
        message={message}
        submittedMessage={submittedMessage}
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
          title="시간 절약"
          description="90분 일을 약 15분으로 줄여요."
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

function AgentChat({
  message,
  submittedMessage,
  onMessageChange,
  onSubmit,
}: {
  message: string;
  submittedMessage: string;
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
        <div className="mt-4 space-y-2">
          <div className="ml-auto max-w-[86%] rounded-[8px] rounded-br-[4px] bg-[#2f6bff] px-4 py-3 text-[14px] font-semibold leading-6 text-white">
            {submittedMessage}
          </div>
          <div className="max-w-[90%] rounded-[8px] rounded-bl-[4px] bg-[#f3f6fb] px-4 py-3 text-[14px] font-semibold leading-6 text-[#374151]">
            좋아요. 관련 권리를 찾고, 필요한 동의 항목부터 정리할게요.
          </div>
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
