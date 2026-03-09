"use client";

interface GalleryProps {
  children: React.ReactNode;
}

export default function Gallery({ children }: GalleryProps) {
  return (
    <div className="flex flex-wrap justify-center w-full gap-x-22 gap-y-8 items-start">
      {Array.isArray(children) &&
        children.map((child, index) => (
          <div
            key={index}
            className="basis-full lg:basis-[16%] flex justify-center"
          >
            {child}
          </div>
        ))}
    </div>
  );
}