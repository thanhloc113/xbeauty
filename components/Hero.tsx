type HeroProps = {
  as?: "h1" | "h2" | "p" | "span"
  title: string
  background?: string
  colors?: string[]
}

export default function Hero({
  as = "h1",
  title,
  background = "https://i.pinimg.com/736x/f8/e6/e0/f8e6e06b240c69476f6bcefbfa2cd280.jpg",
  colors = ["#f472b6", "#a855f7", "#d946ef"],
}: HeroProps) {

  const Tag = as

  const isGradient = colors.length > 1

  const textStyle = isGradient
    ? {
        backgroundImage: `linear-gradient(90deg, ${colors.join(",")})`,
      }
    : {
        color: colors[0],
      }

  return (
    <section
      className="
        relative w-full
        h-[25vh] md:h-[320px] lg:h-[420px]
        flex items-center justify-center
      "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <Tag
        style={textStyle}
        className={`
        relative
        text-2xl md:text-4xl lg:text-5xl
        font-bold
        text-center
        px-6
        ${isGradient ? "hero-gradient-animation" : ""}
        `}
      >
        {title}
      </Tag>
    </section>
  )
}