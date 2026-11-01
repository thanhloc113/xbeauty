
type HeroProps = {
  as?: "h1" | "h2" | "p" | "span"
  title: string
  subtitle?: string
  videoSrc: string
  poster?: string
  colors?: string[]
}

export default function Hero({
  as = "h1",
  title,
  subtitle,
  videoSrc,
  poster ="",
  colors = ["#ff3838", "#ff38de", "#1cf0ff", "#2dff96", "#fff562", "#ff530f","#ff5959"],
}: HeroProps) {
  const Tag = as
  const isGradient = colors.length > 1

  const textStyle = isGradient
    ? {
        backgroundImage: `linear-gradient(90deg, ${colors.join(",")})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    : {
        color: colors[0],
      }

  return (
    <section
      className="
        relative isolate w-full overflow-hidden
        h-[25vh] md:h-[320px] lg:h-[420px]
        flex items-center justify-center
      "
    >
      {/* Background Video */}
      <video
        key={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="
          absolute inset-0 -z-20
          w-full h-full
          object-cover object-center
        "
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/70" />

      {/* Content */}
      <div className="relative text-center px-6 max-w-4xl">
        <Tag
          style={textStyle}
          className={`
            whitespace-pre-line
            text-2xl md:text-4xl lg:text-5xl
            font-bold
            ${isGradient ? "hero-gradient-animation" : ""}
          `}
        >
          {title}
        </Tag>

        {subtitle && (
          <p className="mt-4 text-sm md:text-lg text-white/80 whitespace-pre-line">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
