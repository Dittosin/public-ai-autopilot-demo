import type { PackageStatus } from "../types";

type StatusPillProps = {
  status: PackageStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  const config = {
    "바로 신청 가능": {
      label: "바로 신청",
      className: "bg-[#e9f8f1] text-[#0f7b55]",
    },
    "추가 확인 필요": {
      label: "확인 필요",
      className: "bg-[#fff6e6] text-[#9a5b00]",
    },
    "현재 해당 없음": {
      label: "해당 없음",
      className: "bg-[#f3f4f6] text-[#6b7280]",
    },
    "추후 알림 필요": {
      label: "추후 알림",
      className: "bg-[#f1efff] text-[#5b4bb7]",
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
