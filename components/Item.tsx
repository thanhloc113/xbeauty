"use client";
const isDesktop = window.innerWidth >= 1024;
interface ItemProps {
  title: string;
  media: string;
  link: string;
  type?: "image" | "video";
  ratio?: "vertical" | "square";
  buttonText:string;
}

export default function Item({
  title,
  media,
  link,
  type = "image",
  ratio = "vertical",
  buttonText = "Em thích",
}: ItemProps) {
  return (
    <div className="w-full max-w-[260px] rounded-xl border border-pink-400/60 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col">
      {/* MEDIA FULL BORDER */}
     <div
  className={`relative w-full overflow-hidden ${
    ratio === "vertical" ? "aspect-[9/14.5]" : "aspect-square"
  }`}
>
  {type === "video" ? (
    <video
      src={media}
      className="absolute inset-0 w-full h-full object-cover"
      muted
      autoPlay
      loop
      playsInline
    />
  ) : (
    <img
      src={media}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}
</div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col">

        <h3 className="text-sm text-center font-semibold text-pink-400 mt-2 mb-3 line-clamp-2">
          {title}
        </h3>

        <a
          href={link}
          className="metal-button text-center text-sm px-3 py-2 rounded-lg font-medium"
          target={isDesktop ? "_blank" : "_self"}
        >
          {buttonText}
        </a>

      </div>
    </div>
  );
}