import type { ReactNode } from "react";

type InfoRowProps = {
  label: string;
  value: ReactNode;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-slate-100 py-3 last:border-b-0 md:grid-cols-[150px_1fr] md:gap-4">
      <dt className="text-sm font-extrabold text-slate-500 muted-text">
        {label}
      </dt>
      <dd className="font-bold text-slate-800 muted-text">{value}</dd>
    </div>
  );
}
