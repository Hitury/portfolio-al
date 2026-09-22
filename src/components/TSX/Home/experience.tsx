import SectionHeading from "./section-heading";

const experience = [
  
  {
    period: "2025 - 2026",
    role: "Full Stack Developer",
    org: "Teqqed",
    type: "Internship",
    summary: "My role consisted of building web applications for different company clients, assisting existing projects and getting involved in meetings, testing and other important functions of the company. I got the opportunity to work on an AI Chat Platform, and a directory website for different companies in Frisia.",
    current: false
  }
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 py-18">
      <SectionHeading index="04" eyebrow="Experience" title="Where I've worked" />

      <ol>
        {experience.map((item) => (
          <li key={`${item.role}-${item.period}`} className="group grid sm:grid-cols-[9rem_1fr] sm:gap-10">
            <p className="text-text/55 hidden pt-1 text-xs font-medium tracking-widest uppercase sm:block">
              {item.period}
            </p>

            <div className="border-line relative border-l border-solid pb-10 pl-6 group-last:pb-0 group-last:[border-image:linear-gradient(to_bottom,var(--color-line)_50%,transparent)_1]">
              <span
                className={`absolute top-[3px] -left-[5.5px] size-2.5 rounded-full border border-solid sm:top-[7px] ${
                  item.current ? "border-amber bg-amber ring-amber/15 ring-4" : "border-text/50 bg-[#19120d]"
                }`}
              />
              <p className="text-text/55 mb-1.5 text-xs font-medium tracking-[0.2em] uppercase sm:hidden">
                {item.period}
              </p>
              <h3 className="text-heading font-semibold">{item.role}</h3>
              <p className="mt-0.5 text-sm">
                <span className="text-amber">{item.org}</span>
                <span className="text-text/50"> · {item.type}</span>
              </p>
              <p className="text-text mt-2 max-w-prose text-sm leading-relaxed">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
