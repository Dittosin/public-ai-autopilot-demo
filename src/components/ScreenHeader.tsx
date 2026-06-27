type ScreenHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ScreenHeader({ eyebrow, title, description }: ScreenHeaderProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-[12px] font-extrabold text-[#2f6bff]">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 text-[27px] font-extrabold leading-[1.2] text-[#1f2937]">
        {title}
      </h1>
      {description ? (
        <p className="muted-text mt-3 text-[15px] font-semibold leading-6">
          {description}
        </p>
      ) : null}
    </div>
  );
}
