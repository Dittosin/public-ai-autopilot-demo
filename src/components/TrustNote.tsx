import { ShieldCheck } from "lucide-react";

type TrustNoteProps = {
  title?: string;
  lines: string[];
};

export function TrustNote({ title = "에이전트 원칙", lines }: TrustNoteProps) {
  return (
    <article className="app-card surface rounded-[8px] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#eef4ff] text-[#2f6bff]">
          <ShieldCheck aria-hidden="true" size={20} />
        </div>
        <div>
          <h2 className="text-[16px] font-extrabold">{title}</h2>
          <div className="mt-2 space-y-1">
            {lines.map((line) => (
              <p key={line} className="muted-text text-[14px] font-medium leading-6">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
