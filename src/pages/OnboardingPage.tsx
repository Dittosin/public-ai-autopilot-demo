import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Database,
  Fingerprint,
  Link2,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Button } from "../components/Button";
import { publicConnectionItems, userProfile } from "../data/mockData";

type OnboardingPageProps = {
  onStart: () => void;
};

export function OnboardingPage({ onStart }: OnboardingPageProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="flex min-h-screen flex-col bg-[#f6f8fb] px-5 pb-7 pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#2f6bff] text-white">
            <Bot aria-hidden="true" size={21} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6b7280]">공공 AI 데모</p>
            <p className="text-[17px] font-extrabold">내 삶의 오토파일럿</p>
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#6b7280] shadow-sm">
          {step} / 3
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2" aria-label={`온보딩 ${step}단계`}>
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={[
              "h-1.5 rounded-full transition-colors",
              item <= step ? "bg-[#2f6bff]" : "bg-[#dce3ee]",
            ].join(" ")}
          />
        ))}
      </div>

      {step === 1 ? <Introduction onNext={() => setStep(2)} /> : null}
      {step === 2 ? (
        <ConnectionStep
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails((value) => !value)}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      ) : null}
      {step === 3 ? (
        <ProfileStep onBack={() => setStep(2)} onComplete={onStart} />
      ) : null}
    </section>
  );
}

function Introduction({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-12">
        <p className="text-[13px] font-extrabold text-[#2f6bff]">
          정책을 추천하는 AI가 아니라, 다음 할 일을 찾는 AI
        </p>
        <h1 className="keep-korean mt-3 text-[31px] font-extrabold leading-[1.2] tracking-[0]">
          나를 계속 설명하지 않아도
          <br />
          AI가 필요한 다음 일을 찾습니다.
        </h1>
        <p className="muted-text mt-5 text-[16px] font-semibold leading-7">
          확인된 현재 상태와 앞으로의 계획을 연결해, 필요한 공공지원과 다음 행동을 계속 관리합니다.
        </p>
      </div>

      <article className="app-card mt-8 rounded-[8px] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
            <Sparkles aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="text-[17px] font-extrabold">삶이 바뀌면 다시 판단해요</p>
            <p className="muted-text mt-1 text-[14px] font-medium leading-6">
              취업, 이사처럼 상황이 달라질 때 지금 할 일과 기다릴 일을 새로 나눕니다.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-auto pt-8">
        <Button
          onClick={onNext}
          className="w-full"
          icon={<Fingerprint aria-hidden="true" size={20} />}
        >
          간편인증으로 시작
        </Button>
        <p className="muted-text mt-3 text-center text-[12px] font-semibold leading-5">
          데모 버튼입니다. 실제 인증이나 개인정보 전송은 진행되지 않습니다.
        </p>
      </div>
    </div>
  );
}

function ConnectionStep({
  showDetails,
  onToggleDetails,
  onBack,
  onNext,
}: {
  showDetails: boolean;
  onToggleDetails: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#eaf7f1] text-[#0f7b55]">
          <Check aria-hidden="true" size={24} strokeWidth={3} />
        </div>
        <p className="mt-4 text-[13px] font-extrabold text-[#0f7b55]">
          간편인증 데모 완료
        </p>
        <h1 className="mt-2 text-[29px] font-extrabold leading-[1.22]">
          필요한 공공정보를
          <br />
          목적별로 연결합니다
        </h1>
        <p className="muted-text mt-3 text-[15px] font-semibold leading-6">
          지원 판단에 필요한 범위만 사용하고, 연결 상태는 언제든 확인하거나 해제할 수 있어요.
        </p>
      </div>

      <article className="app-card mt-6 rounded-[8px] px-4">
        {publicConnectionItems.map((item, index) => (
          <div
            key={item.name}
            className={[
              "flex gap-3 py-4",
              index < publicConnectionItems.length - 1 ? "border-b hairline" : "",
            ].join(" ")}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
              <Database aria-hidden="true" size={18} />
            </div>
            <div>
              <p className="text-[15px] font-extrabold">{item.name}</p>
              <p className="muted-text mt-1 text-[13px] font-medium leading-5">
                {item.purpose}
              </p>
              {showDetails ? (
                <p className="mt-2 text-[12px] font-bold text-[#2f6bff]">
                  연결 범위 · {item.source}
                </p>
              ) : null}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onToggleDetails}
          className="flex min-h-12 w-full items-center justify-center gap-2 border-t hairline text-[13px] font-extrabold text-[#2f6bff]"
          aria-expanded={showDetails}
        >
          연결 정보 {showDetails ? "접기" : "보기"}
          <ChevronDown
            aria-hidden="true"
            size={17}
            className={showDetails ? "rotate-180 transition-transform" : "transition-transform"}
          />
        </button>
      </article>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          [ShieldCheck, "필요한 범위만"],
          [Link2, "목적별 동의"],
          [CheckCircle2, "언제든 해제"],
        ].map(([Icon, label]) => {
          const TrustIcon = Icon as typeof ShieldCheck;
          return (
            <div key={String(label)} className="subtle-card rounded-[8px] px-2 py-3 text-center">
              <TrustIcon aria-hidden="true" size={18} className="mx-auto text-[#2f6bff]" />
              <p className="mt-1.5 text-[11px] font-extrabold">{String(label)}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-7">
        <Button
          onClick={onNext}
          className="w-full"
          icon={<ArrowRight aria-hidden="true" size={20} />}
        >
          동의하고 시작
        </Button>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 text-[13px] font-bold text-[#6b7280]"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          이전
        </button>
        <p className="muted-text mt-1 text-center text-[12px] font-semibold leading-5">
          데모에서는 실제 개인정보나 행정정보를 조회하지 않습니다.
        </p>
      </div>
    </div>
  );
}

function ProfileStep({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#eef4ff] text-[#2f6bff]">
          <UserCheck aria-hidden="true" size={24} />
        </div>
        <p className="mt-4 text-[13px] font-extrabold text-[#2f6bff]">
          확인된 현재의 나
        </p>
        <h1 className="mt-2 text-[29px] font-extrabold leading-[1.22]">
          긴 설문 없이
          <br />
          현재 상태를 정리했어요
        </h1>
        <p className="muted-text mt-3 text-[15px] font-semibold leading-6">
          이 정보와 앞으로의 계획을 연결해 다음 행동을 판단합니다.
        </p>
      </div>

      <article className="app-card mt-6 rounded-[8px] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[18px] font-extrabold">{userProfile.name}님의 현재 상태</p>
            <p className="muted-text mt-1 text-[13px] font-medium">{userProfile.summary}</p>
          </div>
          <span className="rounded-full bg-[#eaf7f1] px-2.5 py-1 text-[11px] font-extrabold text-[#0f7b55]">
            데모 확인
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2">
          {userProfile.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={[
                "subtle-card rounded-[8px] px-3 py-3",
                index === userProfile.facts.length - 1 ? "col-span-2" : "",
              ].join(" ")}
            >
              <dt className="text-[11px] font-bold text-[#7b8494]">{fact.label}</dt>
              <dd className="mt-1 text-[15px] font-extrabold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="mt-auto pt-7">
        <Button
          onClick={onComplete}
          className="w-full"
          icon={<ArrowRight aria-hidden="true" size={20} />}
        >
          다음 할 일 찾기
        </Button>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 text-[13px] font-bold text-[#6b7280]"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          연결 정보 다시 보기
        </button>
      </div>
    </div>
  );
}
