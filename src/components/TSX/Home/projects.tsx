import { useRef } from "react";
import type { CollectionEntry } from "astro:content";
import SectionHeading from "./section-heading";
import ProjectModal, { type ProjectModalHandle } from "./project-modal";
import { ArrowRightIcon } from "./icons";

// Projects live in src/content/projects/*.md; index.astro maps them to this shape.
export type Project = Omit<CollectionEntry<"projects">["data"], "image"> & {
  id: string;
  descriptionHtml: string;
  image?: string;
};

export default function Projects({ projects }: { projects: Project[] }) {
  const modalRef = useRef<ProjectModalHandle>(null);

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 py-24">
      <SectionHeading index="02" eyebrow="Projects" title="Things I've built" />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group border-line bg-raised/30 hover:border-amber/50 hover:bg-raised/55 has-focus-visible:border-amber/50 relative flex flex-col rounded-2xl border border-solid p-6 transition-colors duration-250"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-heading group-hover:text-amber text-lg font-semibold transition-colors duration-250">
                {/* The button's ::after stretches over the card, so the whole card opens the modal. */}
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => modalRef.current?.open(project)}
                  className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-amber"
                >
                  {project.name}
                </button>
              </h3>
              <span className="text-text/50 text-xs">{project.type}</span>
            </div>

            <p className="text-text mt-3 text-sm leading-relaxed">{project.summary}</p>

            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border-line text-text/80 rounded-full border border-solid px-3 py-1 text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <span className="border-line text-text/60 group-hover:border-amber/50 group-hover:text-amber grid size-8 shrink-0 place-items-center rounded-full border border-solid transition-colors duration-250">
                <ArrowRightIcon className="size-4 transition-transform duration-250 group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <ProjectModal ref={modalRef} />
    </section>
  );
}
