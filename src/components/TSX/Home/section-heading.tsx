type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-amber text-3xl mb-2 font-bold tracking-tight sm:text-4xl">
        {eyebrow}
      </h2>
      <span className="text-heading mt-4 text-[14px] font-light tracking-[0.2em] uppercase">
        {title}
      </span>
    </div>
  );
}
