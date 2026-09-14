export default function Hero() {
    return (
        <section className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-5 py-16">
            <h1 className="text-4xl font-bold tracking-tight text-center">
                <span className="text-white block text-6xl">Akshay Lautan</span>
                <span className="text-amber block text-4xl font-semibold mt-1">Software Developer</span>
            </h1>
            <div className="mt-5 flex justify-center items-center flex-row gap-4">
                <a className="bg-amber hover:bg-amber/85 select-none cursor-pointer rounded-3xl px-6 py-3 font-medium text-[#19120d] transition-all duration-250 active:scale-96">
                    Projects
                </a>
                <a className="bg-raised/40 border-line select-none text-text hover:text-amber cursor-pointer rounded-3xl border border-solid px-6 py-3 font-medium transition-all active:scale-96 duration-250">
                    Skills
                </a>
            </div>
        </section>
    )
}
