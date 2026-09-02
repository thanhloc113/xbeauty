import { useEffect, useState } from "react"

export type FlashSaleStatus =
  | "none"
  | "coming"
  | "active"
  | "ended"

function getStatus(
  timeStart?: string | null,
  timeEnd?: string | null
): FlashSaleStatus {
  if (!timeStart || !timeEnd) {
    return "none"
  }

  const now = Date.now()
  const start = new Date(timeStart).getTime()
  const end = new Date(timeEnd).getTime()

  if (now < start) {
    return "coming"
  }

  if (now < end) {
    return "active"
  }

  return "ended"
}

export function useFlashSaleStatus(
  timeStart?: string | null,
  timeEnd?: string | null
) {
  const [status, setStatus] =
    useState<FlashSaleStatus>(() =>
      getStatus(timeStart, timeEnd)
    )

  useEffect(() => {
    if (!timeStart || !timeEnd) {
      return
    }

    const start = new Date(timeStart).getTime()
    const end = new Date(timeEnd).getTime()

    let timer: ReturnType<typeof setTimeout>

    const updateStatus = () => {
      const now = Date.now()

      if (now < start) {
        setStatus("coming")

        timer = setTimeout(
          updateStatus,
          start - now
        )

        return
      }

      if (now < end) {
        setStatus("active")

        timer = setTimeout(
          updateStatus,
          end - now
        )

        return
      }

      setStatus("ended")
    }

    updateStatus()

    return () => {
      clearTimeout(timer)
    }
  }, [timeStart, timeEnd])

  return status
}