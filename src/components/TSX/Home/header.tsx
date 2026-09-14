export default function Header() {
  return (
    <header className="sticky top-0">
      <div className="p-5 flex justify-between">
        <div className="flex bg-raised/75 justify-center flex-row gap-7 border-solid border-line border py-3 px-7 rounded-2xl">
          <a href="/" className="text-text hover:text-amber transition-colors duration-250 cursor-pointer">
            Home
          </a>
        </div>
        <div className="flex bg-raised/75 justify-center flex-row gap-7 border-solid border-line border py-3 px-7 rounded-2xl">
          <a href="/projects" className="text-text hover:text-amber transition-colors duration-250 cursor-pointer">
            Projects
          </a>
          <a className="text-text hover:text-amber transition-colors duration-250 cursor-pointer">
            Skills
          </a>
          <a className="text-text hover:text-amber transition-colors duration-250 cursor-pointer">
            Experience
          </a>
        </div>
        <div className="flex bg-raised/75 justify-center flex-row gap-7 border-solid border-line border py-3 px-7 rounded-2xl">
          <a className="text-text hover:text-amber transition-colors duration-250 cursor-pointer">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
