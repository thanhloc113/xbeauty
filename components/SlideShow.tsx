"use client";

import Intro from "./Intro";
import Item from "./Item";

interface SlideItem {
  title: string;
  media: string;
  link: string;
  type?: "image" | "video";
}

interface SlideShowProps {
  introTitle: string;
  introText?: string;
  items: SlideItem[];
  variant?: 1 | 2;
}

export default function SlideShow({
  introTitle,
  introText,
  items,
  variant = 1,
}: SlideShowProps) {

  const backgroundClass =
    variant === 1
? "bg-[linear-gradient(180deg,#0b1f5e,#1a0038)]"
: "bg-[linear-gradient(180deg,#5b0f4e,#071a3a)]";

  return (
    <section className={`w-full py-12 rounded-2xl 
                        rounded-2xl
                        border-4 border-purple-400/20
                        shadow-[0_0_40px_rgba(120,0,255,0.25)] ${backgroundClass}`}>
      {/* Intro */}
      <Intro title={introTitle} text={introText} />

      {/* Slide container */}
      <div className="mt-8 overflow-x-auto md:overflow-visible">
        <div
          className="
          flex gap-6 px-6 min-w-max
          md:grid md:grid-cols-5 md:min-w-0
          md:justify-center
        "
        >
          {items.map((item, i) => (
            <Item
              key={i}
              {...item}
              ratio="square"
              blank={1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}