import SectionHeading from "./section-heading";

const facts = [
  { label: "Based in", value: "The Netherlands" },
  { label: "Focus", value: "Front-end" },
  { label: "Builds", value: "Web & desktop apps" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 py-18">
      <SectionHeading index="01" eyebrow="About" title="Who I am" />

      <div className="grid gap-10 sm:grid-cols-[9rem_1fr]">
        <div className="sm:col-start-2 sm:row-start-1">
          <p className="text-heading text-xl leading-relaxed font-light text-balance sm:text-2xl">
            I'm a <span className="text-amber font-semibold">Front-End Developer</span> based in the Netherlands,
            building clean, focused interfaces for the web and the desktop.
          </p>
          <p className="text-text mt-5 max-w-2xl leading-relaxed">
            Most of my work lives in React and TypeScript, from Next.js products to native desktop apps built
            with Tauri and Rust. I like software that values minimalism and efficiency, while staying scalable.
          </p>
          <p className="text-text mt-5 max-w-2xl leading-relaxed">
            Alongside programming, i enjoy many hobbies like music production, gaming, and sometimes drawing aswell.
            I have an ambitious long term goal to leave a legacy as a music artist, wanting to create a story that is capable of reaching people.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-4 sm:col-start-1 sm:row-start-1 sm:flex sm:flex-col sm:gap-6 sm:pt-3">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-text/55 text-xs font-medium tracking-widest uppercase">{label}</dt>
              <dd className="text-heading mt-1.5 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
