import { useEffect, useState } from "react"

function formatTime(diff: number) {
  if (diff <= 0) {
    return "00:00:00"
  }

  const totalSeconds = Math.ceil(diff / 1000)

  const hours = Math.floor(totalSeconds / 3600)

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  )

  const seconds = totalSeconds % 60

  return `${hours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

function getTimeLeft(time: string) {
  const target = new Date(time).getTime()
  const diff = target - Date.now()

  if (diff <= 0) {
    return {
      value: "00:00:00",
      delay: 0,
    }
  }

  const totalSeconds = Math.ceil(diff / 1000)

  return {
    value: formatTime(diff),

    // Chờ đúng thời điểm giây thay đổi
    delay: diff - (totalSeconds - 1) * 1000,
  }
}

export function useFlashSaleCountdown(
  targetTime?: string | null
) {
  const [timeLeft, setTimeLeft] = useState(() =>
    targetTime
      ? getTimeLeft(targetTime).value
      : "00:00:00"
  )

  useEffect(() => {
    // Không có target
    if (!targetTime) {
      return
    }

    let timer: ReturnType<typeof setTimeout>

    const update = () => {
      const result = getTimeLeft(targetTime)

      setTimeLeft(result.value)

      // Đã hết thời gian
      if (result.delay <= 0) {
        return
      }

      timer = setTimeout(update, result.delay)
    }

    update()

    return () => {
      clearTimeout(timer)
    }
  }, [targetTime])

  return timeLeft
}