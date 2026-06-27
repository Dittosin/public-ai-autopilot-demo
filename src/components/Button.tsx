import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "inverse";
  icon?: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-[#2f6bff] text-white shadow-[0_10px_24px_rgba(47,107,255,0.22)] hover:bg-[#2458dc]",
    secondary: "bg-[#eef4ff] text-[#2f6bff] hover:bg-[#e4edff]",
    danger: "bg-[#fff0f1] text-[#dc2626] hover:bg-[#ffe5e7]",
    ghost: "bg-transparent text-[#2f6bff]",
    inverse: "bg-white text-[#1f2937]",
  };

  return (
    <button
      type="button"
      className={[
        "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-extrabold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
