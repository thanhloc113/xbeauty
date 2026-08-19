"use client"

interface IntroProps {
  title: string
  intro?: string
  align?: "center" | "left"
  titleClassName?: string
  introClassName?: string
}

export default function Intro({
  title,
  intro,
  align = "center",
  titleClassName = "text-pink-400",
  introClassName = "text-white/70",
}: IntroProps) {
  return (
    <div
      className={`mx-auto max-w-3xl px-6 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {/* Title */}
      <h2
        className={`
          mb-4
          text-2xl
          font-bold
          md:text-3xl
          ${titleClassName}
        `}
      >
        {title}
      </h2>

      {/* Text */}
      {intro && (
        <p
          className={`
            text-sm
            leading-relaxed
            md:text-base
            ${introClassName}
          `}
        >
          {intro}
        </p>
      )}
    </div>
  )
}