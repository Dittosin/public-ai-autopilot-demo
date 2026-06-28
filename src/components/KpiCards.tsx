const kpis = [
  { label: "예상 준비시간", before: "90분", after: "15분" },
  { label: "이용 기관·앱 수", before: "5개", after: "1개" },
  { label: "반복 입력 항목", before: "12개", after: "3개" },
  { label: "제출서류 자동 대체", before: "4개 중", after: "2개" },
];

export function KpiCards() {
  return (
    <article className="app-card rounded-[8px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-extrabold text-[#2f6bff]">
            효율 측정
          </p>
          <h2 className="mt-1 text-[17px] font-extrabold">
            신청 준비 부담을 줄입니다
          </h2>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-[8px] bg-[#f8fafc] p-3">
            <p className="text-[12px] font-bold text-[#6b7280]">{item.label}</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#1f2937]">
              {item.before} → {item.after}
            </p>
          </div>
        ))}
      </div>
      <p className="muted-text mt-3 text-[11px] font-semibold leading-5">
        데모 기준 예상값이며, 실증 단계에서 기준선 측정 후 확정합니다.
      </p>
    </article>
  );
}
