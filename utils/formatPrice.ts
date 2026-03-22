// format rút gọn giá 1000 => 1k
export function formatNumber(num: number): string {
  const abs = Math.abs(num)

  if (abs >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (abs >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
  }
  return num.toString()
}

// format hiển thỉ giá sốc và flashsale
export function formatPriceDisplay(
  price: number,
  status?: string
): string {
  const str = Math.floor(price).toString()

  // format có dấu chấm nhưng giữ nguyên dấu ?
  const formatMasked = (s: string) => {
    let result = ""
    let count = 0

    // duyệt từ phải sang trái để chèn dấu "."
    for (let i = s.length - 1; i >= 0; i--) {
      result = s[i] + result
      count++

      if (count % 3 === 0 && i !== 0) {
        result = "." + result
      }
    }

    return result
  }

  // ✅ FLASH SALE → chỉ giữ 1 số đầu
  if (status === "active") {
    const masked = str[0] + "?".repeat(str.length - 1)
    return "🔥"+ formatMasked(masked) + "đ"
  }

  // ✅ NORMAL → giữ 2 số đầu, còn lại ?
  if (str.length <= 2) {
    return `~${str}đ`
  }

  const masked = str.slice(0, 2) + "?".repeat(str.length - 2)

  return `~${formatMasked(masked)}đ`
}