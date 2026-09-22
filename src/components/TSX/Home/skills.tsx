import SectionHeading from "./section-heading";

const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Rust", "SQL"] },
  { group: "Frontend", items: ["React", "Astro", "Next.js", "Tailwind CSS", "HTML & CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "PostgreSQL", "REST APIs"] },
  { group: "Tooling", items: ["Git", "Vite", "Figma"] },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 py-18">
      <SectionHeading index="03" eyebrow="Skills" title="My Tech Stack" />

      <dl className="">
        {skills.map((skill) => (
          <div key={skill.group} className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr] sm:gap-10">
            <dt className="text-text/55 text-xs font-medium tracking-widest uppercase sm:pt-1.5">
              {skill.group}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="border-line bg-raised/30 text-text hover:border-amber/50 hover:text-amber rounded-full border border-solid px-3.5 py-1.5 text-sm transition-colors duration-250"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
