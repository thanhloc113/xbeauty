"use client"

import { useEffect, useState } from "react"

type FlashSaleStatus = "none" | "coming" | "active" | "ended"

interface FlashSaleCountdownProps {
  status: FlashSaleStatus
  timeStart?: string | null
  timeEnd?: string | null
  layout?: "horizontal" | "vertical"
}

function countdown(time: string) {
  const end = new Date(time).getTime()
  const diff = end - Date.now()

  if (diff <= 0) {
    return {
      value: "00:00:00",
      delay: 0,
    }
  }

  const totalSeconds = Math.ceil(diff / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    value: `${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`,

    // Đúng thời điểm số giây tiếp theo cần đổi
    delay: diff - (totalSeconds - 1) * 1000,
  }
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

const [timeLeft, setTimeLeft] = useState(() =>
  targetTime ? countdown(targetTime).value : "00:00:00"
)

useEffect(() => {
  if (!targetTime) return

  let timer: ReturnType<typeof setTimeout>

  const update = () => {
    const result = countdown(targetTime)

    setTimeLeft(result.value)

    if (result.delay <= 0) return

    timer = setTimeout(update, result.delay)
  }

  update()

  return () => clearTimeout(timer)

}, [targetTime])

  if (!targetTime) return null

  return (
  <span
    className={
      status === "active"
        ? `
          ${layout === "horizontal" ? "inline-flex" : "block"}
          ${layout === "vertical" ? "mt-[6px]" : ""}
          text-lime-400
        `
        : `
          ${layout === "horizontal" ? "inline-flex" : "block"}
          ${layout === "vertical" ? "mt-[6px]" : ""}
          text-gray-400 opacity-80
        `
    }
  >
    {status === "active"
      ? `Đang diễn ra ${timeLeft}s` 
      : `Bắt đầu sau ${timeLeft}`}
  </span>
  )
}