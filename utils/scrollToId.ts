let scrollAnimationId: number | null = null;

export function scrollToId(id: string, duration = 80000) {
  const el = document.getElementById(id.replace("#", ""));
  if (!el) return;

  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId);
  }

  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - 80;
  const distance = target - start;

  let startTime: number | null = null;

  const stopScroll = () => {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
    }
  };

  window.addEventListener("wheel", stopScroll, { once: true });
  window.addEventListener("touchstart", stopScroll, { once: true });
  window.addEventListener("mousedown", stopScroll, { once: true });

  function animate(time: number) {
    if (!startTime) startTime = time;

    const progress = Math.min((time - startTime) / duration, 1);

    // linear movement
    window.scrollTo(0, start + distance * progress);

    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(animate);
    }
  }

  scrollAnimationId = requestAnimationFrame(animate);
}