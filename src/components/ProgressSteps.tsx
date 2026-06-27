const steps = ["탐색", "동의", "준비", "승인"];

type ProgressStepsProps = {
  current: 1 | 2 | 3 | 4;
};

export function ProgressSteps({ current }: ProgressStepsProps) {
  return (
    <div className="app-card rounded-[8px] p-3" aria-label="진행 단계">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((label, index) => {
          const step = index + 1;
          const active = step === current;
          const done = step < current;

          return (
            <div key={label}>
              <div
                className={[
                  "h-1.5 rounded-full",
                  active || done ? "bg-[#2f6bff]" : "bg-[#e5e7eb]",
                ].join(" ")}
              />
              <p
                className={[
                  "mt-2 text-center text-[11px] font-bold",
                  active ? "text-[#2f6bff]" : "text-[#9ca3af]",
                ].join(" ")}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
