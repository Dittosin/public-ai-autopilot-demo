import { ArrowRight, Bot, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "../components/Button";

type OnboardingPageProps = {
  onStart: () => void;
};

export function OnboardingPage({ onStart }: OnboardingPageProps) {
  return (
    <section className="flex min-h-screen flex-col bg-[#f6f8fb] px-6 pb-8 pt-12">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#2f6bff] text-white">
          <Bot aria-hidden="true" size={23} />
        </div>
        <div>
          <p className="text-[12px] font-bold text-[#6b7280]">공공 AI 데모</p>
          <p className="text-[19px] font-extrabold">국민 AI 오토파일럿</p>
        </div>
      </div>

      <div className="mt-14">
        <p className="text-[13px] font-extrabold text-[#2f6bff]">
          내 삶의 오토파일럿
        </p>
        <h1 className="mt-3 text-[35px] font-extrabold leading-[1.16]">
          찾아야 받던 권리,
          <br />
          신청 가능한 상태까지
        </h1>
        <p className="muted-text mt-4 text-[17px] font-semibold leading-7">
          모두의 AI 기반에서 작동 가능한 생애사건 권리실행 에이전트 데모입니다.
        </p>
      </div>

      <article className="app-card mt-8 rounded-[8px] p-5">
        <div className="flex items-center gap-2 text-[#2f6bff]">
          <MessageCircle aria-hidden="true" size={18} />
          <p className="text-[14px] font-extrabold">이렇게 요청하세요</p>
        </div>
        <p className="mt-3 text-[21px] font-extrabold leading-8">
          “실직했는데 받을 수 있는 지원 찾아줘”
        </p>
      </article>

      <div className="mt-5 space-y-3">
        {["목적별 동의 후 조회", "신청서 초안까지 준비", "제출은 사용자 승인 후"].map(
          (item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-[15px] font-semibold text-[#4b5563]"
            >
              <CheckCircle2
                aria-hidden="true"
                size={18}
                className="text-[#2f6bff]"
              />
              {item}
            </div>
          ),
        )}
      </div>

      <div className="mt-auto pt-8">
        <Button
          onClick={onStart}
          className="w-full"
          icon={<ArrowRight aria-hidden="true" size={20} />}
        >
          시작하기
        </Button>
      </div>
    </section>
  );
}
