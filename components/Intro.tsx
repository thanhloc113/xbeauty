"use client";

interface IntroProps {
  title: string;
  intro?: string;
  align?: "center" | "left";
}

export default function Intro({
  title,
  intro,
  align = "center",
}: IntroProps) {
  return (
    <div
      className={`max-w-3xl mx-auto px-6 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-pink-400 mb-4">
        {title}
      </h2>

      {/* Text */}
      {intro && (
        <p className="text-sm md:text-base text-white/70 leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
}