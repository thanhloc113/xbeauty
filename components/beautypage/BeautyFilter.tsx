
"use client";

import { CSSProperties, useMemo, useState } from "react";

interface BeautyFilterProps {
  type: "skincare" | "makeup";
  needs: string[];
  selectedNeeds: string[];
  setSelectedNeeds: (value: string[]) => void;
  onSwitch: () => void;
  switching: boolean;
  onExplore: (needs: string[]) => void;
  exploring: boolean;
}

export default function BeautyFilter({
  type,
  needs,
  selectedNeeds,
  setSelectedNeeds,
  onSwitch,
  switching,
  onExplore,
  exploring,
}: BeautyFilterProps) {
  const [open, setOpen] = useState(false);
  const isSkincare = type === "skincare";
  // =====================================================
  // MAGIC PARTICLES
  // =====================================================


const magicParticles = useMemo(() => {
  const random = (seed: number) => {
    const x =
      Math.sin(seed * 12.9898) * 43758.5453;

    return x - Math.floor(x);
  };

  const magicColors = [
    { color: "#34D399", glow: "#10B981" },
    { color: "#2DD4BF", glow: "#14B8A6" },
    { color: "#22D3EE", glow: "#06B6D4" },

    { color: "#A78BFA", glow: "#7C3AED" },
    { color: "#C084FC", glow: "#9333EA" },
    { color: "#D946EF", glow: "#C026D3" },

    { color: "#F472B6", glow: "#EC4899" },
    { color: "#FB7185", glow: "#E11D48" },

    { color: "#FB923C", glow: "#F97316" },
    { color: "#FBBF24", glow: "#F59E0B" },
    { color: "#FDE047", glow: "#EAB308" },
  ];

  return Array.from({ length: 300 }, (_, i) => {
    const color =
      magicColors[
        Math.floor(
          random(i * 7.31) *
            magicColors.length
        )
      ];

    // ==========================================
    // 360° — mỗi hạt một hướng riêng
    // ==========================================

    const angle =
      random(i * 1.73) *
      Math.PI *
      2;

    // Phần lớn hạt bay rất xa
    const distance =
      220  +
      random(i * 2.91) * 720;

    const moveX =
      Math.cos(angle) * distance;

    const moveY =
      Math.sin(angle) * distance;

    // Xuất phát gần tâm nút
    const originX =
      (random(i * 4.17) - 0.5) * 24;

    const originY =
      (random(i * 5.73) - 0.5) * 16;

    // ==========================================
    // Kích thước
    // ==========================================

    const typeRandom =
      random(i * 11.27);

    let size: string;
    let special = false;

    if (typeRandom < 0.78) {
      // Hạt nhỏ
      size =
        `${1.5 + random(i * 4.21) * 2.8}px`;
    } else if (typeRandom < 0.94) {
      // Hạt trung bình
      size =
        `${2.8 + random(i * 4.21) * 3}px`;
    } else {
      // Hạt đặc biệt
      size =
        `${4 + random(i * 4.21) * 4}px`;

      special = true;
    }

    return {
      id: i,

      moveX: `${moveX}px`,
      moveY: `${moveY}px`,

      originX: `${originX}px`,
      originY: `${originY}px`,

      // Bắt đầu gần như ngay lập tức
      delay:
        `${random(i * 3.47) * 0.08}s`,

      size,

      // Thời gian tương đối đồng đều
      duration:
        `${3.2 + random(i * 5.13) * 3.8}s`,

      color: color.color,
      glow: color.glow,

      special,
    };
  });
}, []);
  // =====================================================
  // SELECT
  // =====================================================

  const handleSelect = (item: string) => {
    if (selectedNeeds.includes(item)) {
      setSelectedNeeds(
        selectedNeeds.filter((i) => i !== item)
      );
    } else {
      setSelectedNeeds([
        ...selectedNeeds,
        item,
      ]);
    }
  };



  // =====================================================
  // THEME
  // =====================================================

  const theme = isSkincare
    ? {
        gradient:
          "from-emerald-500 via-teal-500 to-cyan-500",

        gradientHover:
          "hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400",

        dropdown:
          "bg-[#071c1c]",

        dropdownGlow:
          "shadow-[0_18px_50px_rgba(20,184,166,0.25)]",

        border:
          "border-teal-400",

        borderSoft:
          "border-teal-400/30",

        text:
          "text-teal-400",

        textStrong:
          "text-teal-600",

        textLight:
          "text-teal-300",

        bgSoft:
          "bg-teal-50",

        bgSoftHover:
          "hover:bg-teal-100",

        iconBg:
          "bg-gradient-to-br from-emerald-400/20 to-cyan-400/20",

        selectedBg:
          "bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20",

        shadow:
          "shadow-[0_8px_30px_rgba(20,184,166,0.35)]",

        glow:
          "shadow-[0_0_25px_rgba(20,184,166,0.2)]",

        checkbox:
          "border-teal-400 bg-gradient-to-br from-emerald-500 to-cyan-500",

        accent:
          "text-cyan-300",

        emoji:
          "🧴",

        label:
          "Chăm sóc da",
      }
    : {
        gradient:
          "from-purple-600 via-fuchsia-500 to-pink-500",

        gradientHover:
          "hover:from-purple-500 hover:via-fuchsia-400 hover:to-pink-400",

        dropdown:
          "bg-[#17121f]",

        dropdownGlow:
          "shadow-[0_18px_50px_rgba(168,85,247,0.28)]",

        border:
          "border-fuchsia-400",

        borderSoft:
          "border-fuchsia-400/30",

        text:
          "text-fuchsia-400",

        textStrong:
          "text-fuchsia-600",

        textLight:
          "text-fuchsia-300",

        bgSoft:
          "bg-fuchsia-50",

        bgSoftHover:
          "hover:bg-fuchsia-100",

        iconBg:
          "bg-gradient-to-br from-purple-500/20 to-pink-500/20",

        selectedBg:
          "bg-gradient-to-r from-purple-600/30 via-fuchsia-500/25 to-pink-500/25",

        shadow:
          "shadow-[0_8px_30px_rgba(168,85,247,0.35)]",

        glow:
          "shadow-[0_0_25px_rgba(236,72,153,0.2)]",

        checkbox:
          "border-fuchsia-400 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500",

        accent:
          "text-pink-300",

        emoji:
          "💄",

        label:
          "Trang điểm",
      };

  // =====================================================
  // RENDER
  // =====================================================

  return (
<section
  className="
    relative
    transition-all
    duration-1000
  "
>

      {/* bụi tiên piu piu piu */}
     
{exploring && (
  <div
    key="fairy-dust"
    className="magic-particles"
    aria-hidden="true"
  >
    {magicParticles.map((particle) => (
      <span
        key={particle.id}
        className={`magic-particle ${
          particle.special
            ? "magic-special"
            : ""
        }`}
        style={
          {
            "--origin-x":
              `calc(50% + ${particle.originX})`,

            "--origin-y":
              `calc(50% + ${particle.originY})`,

            "--move-x": particle.moveX,
            "--move-y": particle.moveY,

            "--delay": particle.delay,
            "--size": particle.size,
            "--duration": particle.duration,

            "--particle-color":
              particle.color,

            "--particle-glow":
              particle.glow,
          } as CSSProperties
        }
      />
    ))}
  </div>
)}
      {/* =================================================
          CATEGORY SWITCH
      ================================================= */}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSwitch}
          disabled={switching || exploring}
          className={`
            group
            relative
            w-auto
            max-w-full
            overflow-hidden
            rounded-full
            border
            border-white/60
            bg-gradient-to-r
            ${theme.gradient}
            ${theme.gradientHover}
            px-5
            py-2.5
            sm:px-7
            sm:py-3
            text-sm
            sm:text-[15px]
            font-semibold
            text-white
            ${theme.shadow}
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:scale-[1.02]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-80
            ${switching ? "electric-switch" : ""}
          `}
        >
          {/* Shine */}
          <span
            className="
              pointer-events-none
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/35
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />

          <span className="relative flex items-center gap-2.5 sm:gap-3">
            <span className="text-lg sm:text-xl">
              {theme.emoji}
            </span>

            <span>
              {theme.label}
            </span>

            <span
              className="
                flex
                h-6
                w-6
                sm:h-7
                sm:w-7
                items-center
                justify-center
                rounded-full
                bg-white/20
                text-base
                sm:text-lg
                font-bold
                shadow-inner
                transition-transform
                duration-500
                group-hover:rotate-180
              "
            >
              ⇄
            </span>
          </span>
        </button>
      </div>


{/* =================================================
    DROPDOWN + EXPLORE
================================================= */}

<div className="relative mx-auto mt-4 w-full max-w-[520px]">

  <div className="flex items-stretch gap-2">

    {/* =================================================
        DROPDOWN
    ================================================= */}

    <div className="relative min-w-0 flex-1">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={exploring}
        className={`
          flex
          min-h-[52px]
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          px-3
          py-2
          text-left
          transition-all
          duration-300
          disabled:cursor-not-allowed

          ${
            open
              ? `
                ${theme.border}
                ${theme.dropdown}
                ${theme.glow}
              `
              : `
                border-gray-200
                bg-white
                hover:${theme.border}
              `
          }
        `}
      >

        {/* Left */}

        <div className="flex min-w-0 items-center gap-2">

          {/* Icon */}

          <span
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              ${theme.iconBg}
              text-sm
            `}
          >
            {theme.emoji}
          </span>

          {/* Text */}

          <div className="min-w-0">

            {selectedNeeds.length > 0 ? (
              <div>

                <p
                  className={`
                    text-[10px]
                    font-medium
                    leading-none
                    ${theme.text}
                  `}
                >
                  Đã chọn
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-xs
                    font-semibold
                    text-gray-800
                  "
                >
                  {selectedNeeds.length} hành trình
                </p>

              </div>
            ) : (
              <div>

                <p
                  className="
                    text-[10px]
                    font-medium
                    leading-none
                    text-gray-400
                  "
                >
                  Chọn hành trình
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-[11px]
                    text-gray-700
                  "
                >
                  Em đang muốn cải thiện điều gì?
                </p>

              </div>
            )}

          </div>

        </div>

        {/* Arrow */}

        <span
          className={`
            ml-1
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-300

            ${
              open
                ? `
                  ${theme.borderSoft}
                  bg-white/10
                  ${theme.textLight}
                  rotate-180
                `
                : `
                  border-gray-200
                  bg-gray-50
                  ${theme.textStrong}
                `
            }
          `}
        >
          <span className="text-base font-bold leading-none">
            🡇
          </span>
        </span>

      </button>


      {/* =================================================
          DROPDOWN MENU
      ================================================= */}

      {open && (
        <div
          className={`
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            overflow-hidden
            rounded-2xl
            border
            ${theme.borderSoft}
            ${theme.dropdown}
            ${theme.dropdownGlow}
            p-1.5
            backdrop-blur-xl
          `}
        >

          <div className="max-h-[260px] overflow-y-auto">

            {needs.map((item) => {

              const isSelected =
                selectedNeeds.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    py-2
                    text-left
                    text-xs
                    transition-all
                    duration-200

                    ${
                      isSelected
                        ? `
                          ${theme.selectedBg}
                          text-white
                        `
                        : `
                          text-white/65
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >

                  <span className="flex items-center gap-2">

                    <span
                      className={`
                        flex
                        h-4
                        w-4
                        shrink-0
                        items-center
                        justify-center
                        rounded-[5px]
                        border
                        text-[9px]
                        font-bold

                        ${
                          isSelected
                            ? `
                              ${theme.checkbox}
                              text-white
                            `
                            : `
                              border-white/20
                              bg-white/5
                              text-transparent
                            `
                        }
                      `}
                    >
                      ✓
                    </span>

                    <span>
                      {item}
                    </span>

                  </span>

                  {isSelected && (
                    <span
                      className={`
                        text-[9px]
                        font-medium
                        ${theme.accent}
                      `}
                    >
                      Đã chọn
                    </span>
                  )}

                </button>
              );
            })}

          </div>

          {/* Clear */}

          {selectedNeeds.length > 0 && (
            <div
              className="
                mt-1
                border-t
                border-white/10
                px-2
                pt-1
              "
            >
              <button
                type="button"
                onClick={() => setSelectedNeeds([])}
                className={`
                  w-full
                  rounded-lg
                  py-1.5
                  text-[10px]
                  font-medium
                  text-white/35
                  transition-colors
                  hover:bg-white/5
                  ${theme.textLight}
                `}
              >
                Xóa tất cả lựa chọn
              </button>
            </div>
          )}

        </div>
      )}

    </div>


    {/* =================================================
        EXPLORE BUTTON
    ================================================= */}

    <div className="relative shrink-0">

      <button
        type="button"
        onClick={() => {
          setOpen(false);
          onExplore(selectedNeeds);}}
        disabled={exploring}
        className={`
          group
          relative
          z-10
          flex
          h-full
          min-h-[52px]
          items-center
          justify-center
          gap-1.5
          overflow-hidden
          rounded-2xl
          border
          border-white/60
          bg-gradient-to-r
          ${theme.gradient}
          ${theme.gradientHover}
          px-4
          py-2
          text-xs
          font-bold
          text-white
          ${theme.shadow}
          transition-all
          duration-300
          hover:-translate-y-0.5
          active:scale-[0.98]
          disabled:cursor-wait
          disabled:scale-[1.02]

          ${exploring ? "magic-transform" : ""}
        `}
      >

        {/* Magic shine */}

        <span
          className={`
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/50
            to-transparent

            ${
              exploring
                ? ""
                : `
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                `
            }
          `}
        />

        {/* Inner glow */}

        {exploring && (
          <span
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-2xl
              bg-white/10
              opacity-0
              animate-pulse
            "
          />
        )}

        {/* Content */}

        <span className="relative flex items-center gap-1.5">

          <span
            className={`
              text-sm
              transition-transform
              duration-300
              ${exploring ? "scale-125" : ""}
            `}
          >
            {exploring ? "🪄" : theme.emoji}
          </span>

          <span className="whitespace-nowrap">
            {exploring
              ? "Đang khám phá..."
              : "Khám phá"}
          </span>

          {!exploring && (
            <span
              className="
                text-sm
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          )}

        </span>

      </button>

    </div>

  </div>
</div>


{/* =================================================
    SELECTED TAGS
================================================= */}

{selectedNeeds.length > 0 && (
  <div className="mx-auto mt-3 w-full max-w-[520px]">

    <div className="flex flex-wrap justify-start gap-1.5">

      {selectedNeeds.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleSelect(item)}
          disabled={exploring}
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            ${theme.borderSoft}
            ${theme.bgSoft}
            px-2.5
            py-1.5
            text-[11px]
            font-semibold
            ${theme.textStrong}
            shadow-sm
            transition-all
            duration-200
            active:scale-95
            ${theme.bgSoftHover}
            disabled:cursor-not-allowed
            disabled:opacity-60
          `}
        >

          <span>
            {item}
          </span>

          <span
            className={`
              flex
              h-3.5
              w-3.5
              items-center
              justify-center
              rounded-full
              ${theme.bgSoft}
              text-[10px]
              ${theme.text}
            `}
          >
            ×
          </span>

        </button>
      ))}

    </div>

  </div>
)}


    </section>
  );
}

