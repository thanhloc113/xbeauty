"use client"

import type { FlashSaleStatus } from "@/hooks/useFlashSaleStatus"
import { useFlashSaleCountdown } from "@/hooks/useFlashSaleCountdown"

interface FlashSaleCountdownProps {
  status: FlashSaleStatus
  timeStart?: string | null
  timeEnd?: string | null
  layout?: "horizontal" | "vertical"
}

export default function FlashSaleCountdown({
  status,
  timeStart,
  timeEnd,
  layout = "vertical",
}: FlashSaleCountdownProps) {
  const targetTime =
    status === "active"
      ? timeEnd
      : status === "coming"
        ? timeStart
        : null

  const timeLeft = useFlashSaleCountdown(targetTime)

  if (!targetTime) {
    return null
  }

  const isActive = status === "active"

  return (
    <span
      className={`
        ${layout === "horizontal"
          ? "inline-flex"
          : "block"
        }

        ${layout === "vertical"
          ? "mt-[6px]"
          : ""
        }

      `}
    >
      {isActive
        ? `Đang diễn ra ${timeLeft}s`
        : `Bắt đầu sau ${timeLeft}s`}
    </span>
  )
}