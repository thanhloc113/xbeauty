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
  background?: string;
}

export default function SlideShow({
  introTitle,
  introText,
  items,
  background = "#000",
}: SlideShowProps) {
  return (
    <section
      className="w-full py-12"
      style={{ background }}
    >
      {/* Intro */}
      <Intro title={introTitle} text={introText} />

      {/* Slide container */}
      <div className="mt-8 overflow-x-auto md:overflow-visible">
        <div className=" flex gap-6 px-6 min-w-max
      md:grid md:grid-cols-5 md:min-w-0
      md:justify-center">

          {items.map((item, i) => (
            <Item
              key={i}
              {...item}
              ratio="square"
              buttonText="Em muốn"
            />
          ))}

        </div>
      </div>
    </section>
  );
}