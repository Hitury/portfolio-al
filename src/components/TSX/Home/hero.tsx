export default function Hero() {
    return (
        <section
            id="home"
            className="flex min-h-[calc(100svh-88px)] scroll-mt-40 sm:scroll-mt-28 flex-col items-center justify-center px-5 py-16"
        >
            <h1 className="text-center font-bold tracking-tight">
                <span className="text-heading block text-5xl sm:text-6xl">Hello, I'm Akshay Lautan</span>
                <span className="text-amber mt-2 block text-3xl font-semibold sm:text-4xl">
                    Front-End Developer
                </span>
            </h1>

            <p className="text-text mt-6 max-w-md text-center leading-relaxed text-balance">
                Web/Software Developer, based in the Netherlands.
                
            </p>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
                <a
                    href="#contact"
                    className="bg-amber hover:bg-amber/85 min-w-30 select-none cursor-pointer rounded-3xl border border-solid border-transparent px-6 py-3 text-center font-medium text-[#19120d] transition-all duration-250 active:scale-96"
                >
                    Contact
                </a>
                {/* <a
                    href="#contact"
                    className="bg-raised/40 border-line min-w-30 select-none text-text hover:text-amber cursor-pointer rounded-3xl border border-solid px-6 py-3 text-center font-medium transition-all active:scale-96 duration-250"
                >
                    Skills
                </a> */}
            </div>
        </section>
    )
}
