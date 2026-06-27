import type { PackageStatus } from "../types";

type StatusPillProps = {
  status: PackageStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  const config = {
    "신청 가능성 높음": {
      label: "가능성 높음",
      className: "bg-[#e9f8f1] text-[#0f7b55]",
    },
    "추가 확인 필요": {
      label: "확인 필요",
      className: "bg-[#fff6e6] text-[#9a5b00]",
    },
    "신청서 초안 준비됨": {
      label: "초안 준비",
      className: "bg-[#eef4ff] text-[#2f6bff]",
    },
  } satisfies Record<PackageStatus, { label: string; className: string }>;

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[12px] font-extrabold",
        config[status].className,
      ].join(" ")}
      title={status}
    >
      {config[status].label}
    </span>
  );
}
