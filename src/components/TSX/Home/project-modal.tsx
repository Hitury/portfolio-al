import { useId, useImperativeHandle, useRef, useState, type ReactNode, type Ref } from "react";
import { flushSync } from "react-dom";
import type { Project } from "./projects";
import {
  CloseIcon,
  CodeIcon,
  DownloadIcon,
  ExternalIcon,
  GitHubIcon,
  projectIcons,
  type IconProps,
} from "./icons";

export type ProjectModalHandle = {
  open: (project: Project) => void;
};

type Action = {
  href: string;
  label: string;
  Icon: (props: IconProps) => ReactNode;
  isDownload?: boolean;
};

const buttonClass =
  "inline-flex items-center justify-center gap-2.5 rounded-2xl border border-solid px-6 py-3.5 font-semibold transition-all duration-250 active:scale-[0.98]";
const primaryClass = `${buttonClass} bg-amber hover:bg-amber/85 border-transparent text-[#19120d]`;
const secondaryClass = `${buttonClass} border-line bg-raised/40 text-heading hover:border-amber/50 hover:text-amber`;

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Hide the page scrollbar while a modal is open, padding by its width so nothing behind shifts.
function lockPageScroll(locked: boolean) {
  const root = document.documentElement;
  root.style.paddingRight = locked ? `${window.innerWidth - root.clientWidth}px` : "";
  root.style.overflow = locked ? "hidden" : "";
}

function linkProps({ href, isDownload }: Action) {
  if (isExternal(href)) return { target: "_blank", rel: "noreferrer" };
  return isDownload ? { download: "" } : {};
}

function getActions(project: Project): Action[] {
  const actions: Action[] = [];
  if (project.download) {
    const { href, label } = project.download;
    actions.push({ href, label, Icon: DownloadIcon, isDownload: true });
  }
  if (project.live) actions.push({ href: project.live, label: "View Live Site", Icon: ExternalIcon });
  if (project.source) actions.push({ href: project.source, label: "Source Code", Icon: GitHubIcon });
  return actions;
}

function Banner({ project }: { project: Project }) {
  const Icon = projectIcons[project.icon];

  return (
    <div className="border-line relative grid h-52 place-items-center overflow-hidden border-b border-solid bg-[radial-gradient(90%_130%_at_50%_0%,color-mix(in_oklab,var(--color-amber)_26%,transparent),transparent_70%)] sm:h-64">
      {project.video ? (
        <video
          className="size-full object-cover"
          src={project.video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : project.image ? (
        <img className="size-full object-cover object-top" src={project.image} alt={`${project.name} preview`} />
      ) : (
        <Icon className="text-amber/70 size-16 sm:size-20" strokeWidth={1.25} />
      )}

      <form method="dialog" className="absolute top-4 right-4">
        <button
          aria-label="Close"
          className="border-line text-heading hover:text-amber grid size-10 cursor-pointer place-items-center rounded-full border border-solid bg-[#19120d]/70 backdrop-blur-sm transition-colors duration-250"
        >
          <CloseIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}

export default function ProjectModal({ ref }: { ref: Ref<ProjectModalHandle> }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const pressedOutside = useRef(false);
  // Kept after closing so the content stays visible while the dialog fades out.
  const [project, setProject] = useState<Project | null>(null);

  useImperativeHandle(ref, () => ({
    open(next) {
      // Render the project first so showModal() moves focus into the new content.
      flushSync(() => setProject(next));
      const dialog = dialogRef.current;
      if (!dialog) return;
      lockPageScroll(true);
      dialog.showModal();
      dialog.scrollTop = 0;
      dialog.querySelector("video")?.play().catch(() => {});
    },
  }), []);

  const isOutsideCard = (target: EventTarget) => !cardRef.current?.contains(target as Node);
  const actions = project ? getActions(project) : [];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="modal m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent"
      // Close on backdrop clicks, but not when a text selection drag ends outside the card.
      onPointerDown={(event) => {
        pressedOutside.current = isOutsideCard(event.target);
      }}
      onClick={(event) => {
        if (pressedOutside.current && isOutsideCard(event.target)) event.currentTarget.close();
      }}
      onClose={(event) => {
        lockPageScroll(false);
        event.currentTarget.querySelector("video")?.pause();
      }}
    >
      {project && (
        <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
          <article
            key={project.id}
            ref={cardRef}
            className="border-line bg-surface w-full max-w-3xl overflow-hidden rounded-3xl border border-solid"
          >
            <Banner project={project} />

            <div className="p-6 sm:p-10">
              <span className="text-amber text-xs font-medium tracking-[0.2em] uppercase">{project.type}</span>

              <div className="mt-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h2 id={titleId} className="text-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  {project.name}
                </h2>
                <span className="border-line text-text mt-1 rounded-md border border-solid px-2.5 py-1 font-mono text-xs">
                  {project.status}
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border-line bg-raised/30 text-text rounded-full border border-solid px-3 py-1 text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <p className="text-heading/90 mt-6 text-lg leading-relaxed">{project.summary}</p>

              {project.descriptionHtml && (
                <div
                  className="text-text mt-4 space-y-4 leading-relaxed [&_a]:text-amber [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-1 [&_strong]:text-heading [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
                />
              )}

              <div className="border-line bg-raised/20 mt-8 rounded-2xl border border-solid p-5 sm:p-6">
                <p className="text-heading flex items-center gap-2.5 font-semibold">
                  <CodeIcon className="text-amber size-4.5" />
                  Tech Stack Highlights
                </p>
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {(project.highlights ?? project.stack).map((item) => (
                    <li key={item} className="text-text flex gap-3">
                      <span className="bg-amber mt-[0.6em] size-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {actions.length > 0 && (
                <div className="mt-8 grid gap-3 sm:auto-cols-fr sm:grid-flow-col">
                  {actions.map((action, index) => (
                    <a
                      key={action.label}
                      href={action.href}
                      className={index === 0 ? primaryClass : secondaryClass}
                      {...linkProps(action)}
                    >
                      {action.label}
                      <action.Icon className="size-4.5" />
                    </a>
                  ))}
                </div>
              )}

              {project.download?.note && (
                <p className="border-line text-text/60 mt-8 border-t border-solid pt-5 text-sm">
                  {project.download.note}
                </p>
              )}
            </div>
          </article>
        </div>
      )}
    </dialog>
  );
}
