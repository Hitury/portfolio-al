import SectionHeading from "./section-heading";

const projects = [
  {
    name: "Todo App",
    year: "Application",
    blurb: "A Todo-App built with Tauri, meant to prioritize efficiency and productivity. Designed with no distractions in mind, and a concrete overview of your tasks.",
    stack: ["TypeScript", "React", "Rust"],
    href: "#",
  },
  {
    name: "Snelvoedsel",
    year: "SaaS",
    blurb: "A Todo-App built with Tauri, meant to prioritize efficiency and productivity. Designed with no distractions in mind, and a concrete overview of your tasks.",
    stack: ["TypeScript", "React", "NextJS"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 py-24">
      <SectionHeading index="01" eyebrow="Projects" title="Things I've built." />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            className="group border-line bg-raised/30 hover:border-amber/50 hover:bg-raised/55 flex flex-col rounded-2xl border border-solid p-6 transition-colors duration-250"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-heading group-hover:text-amber text-lg font-semibold transition-colors duration-250">
                {project.name}
              </h3>
              <span className="text-text/50 text-xs tabular-nums">{project.year}</span>
            </div>

            <p className="text-text mt-3 text-sm leading-relaxed">{project.blurb}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-line text-text/80 rounded-full border border-solid px-3 py-1 text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}
