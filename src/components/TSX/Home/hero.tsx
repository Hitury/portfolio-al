export default function Hero() {
    return (
        <section className="flex min-h-[calc(100vh-88px)] flex-col justify-center px-5 py-16 sm:px-12 lg:px-24">
            <p className="text-text/70 text-lg">Hello, i'm</p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-heading block">Akshay Lautan</span>
                <span className="text-amber block">Software Developer</span>
            </h1>
            <p className="text-text/80 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat quidem porro eveniet, quia molestias molestiae laborum! Rem repellendus eaque libero suscipit id quos, assumenda impedit facere voluptatum reprehenderit nam ducimus.
            </p>
            <div className="mt-10 flex flex-row gap-4">
                <a className="bg-amber hover:bg-amber/85 cursor-pointer rounded-xl px-6 py-3 font-medium text-[#19120d] transition-colors duration-250">
                    Projects
                </a>
                <a className="bg-raised/40 border-line text-text hover:text-amber cursor-pointer rounded-xl border border-solid px-6 py-3 font-medium transition-colors duration-250">
                    Skills
                </a>
            </div>
        </section>
    )
}
