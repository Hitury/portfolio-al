import { useEffect, useState } from "react";

const sectionIds = ["home", "projects", "skills"];

const groupClass =
  "contents sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-7 sm:rounded-2xl sm:border sm:border-solid sm:border-line sm:bg-raised/75 sm:px-7 sm:py-3 sm:backdrop-blur-sm";

const linkClass = (isActive: boolean) =>
  `transition-colors duration-250 cursor-pointer ${
    isActive ? "text-amber" : "text-text hover:text-amber"
  }`;

export default function Header() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
      
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="p-4 sm:p-5">
        <nav className="border-line bg-raised/75 mx-auto flex max-w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-solid px-4 py-2.5 backdrop-blur-sm sm:mx-0 sm:max-w-none sm:flex-nowrap sm:justify-between sm:gap-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div className={groupClass}>
            <a href="#home" className={linkClass(active === "home")}>
              Home
            </a>
          </div>
          <div className={groupClass}>
            <a href="#projects" className={linkClass(active === "projects")}>
              Projects
            </a>
            <a href="#skills" className={linkClass(active === "skills")}>
              Skills
            </a>
            <a className={linkClass(false)}>Experience</a>
          </div>
          <div className={groupClass}>
            <a className={linkClass(false)}>Contact</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
