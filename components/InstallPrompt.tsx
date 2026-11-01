
"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
       useState<BeforeInstallPromptEvent | null>(null);
  const [showGuide, setShowGuide] = useState(false);


    useEffect(() => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

      if (standalone) return;

      const ua = window.navigator.userAgent;
      const ios = /iPhone|iPad|iPod/i.test(ua);

      const dismissedUntil = Number(
        localStorage.getItem("dmd-install-dismissed") || 0
      );

      if (Date.now() < dismissedUntil) return;

      const visits =
        Number(localStorage.getItem("dmd-visits") || 0) + 1;

      localStorage.setItem("dmd-visits", String(visits));

      const timer = window.setTimeout(() => {
        // setIsStandalone(false);
        setIsIOS(ios);
        setShow(true);
      }, 5000);

      const handleInstallPrompt = (event: Event) => {
        event.preventDefault();
        setDeferredPrompt(event as BeforeInstallPromptEvent);
      };

      window.addEventListener(
        "beforeinstallprompt",
        handleInstallPrompt
      );

      return () => {
        window.clearTimeout(timer);
        window.removeEventListener(
          "beforeinstallprompt",
          handleInstallPrompt
        );
      };
    }, []);


  const dismiss = () => {
    setShow(false);
    localStorage.setItem(
      "dmd-install-dismissed",
      String(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );
  };

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === "accepted") {
        setShow(false);
      }

      setDeferredPrompt(null);
      return;
    }

    setShowGuide(true);
  };

  if (isStandalone || !show) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
        <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-[#fff5fb] via-white to-[#f1edff] p-6 text-center shadow-2xl">

          <button
            onClick={dismiss}
            className="absolute right-4 top-4 text-xl text-gray-400"
          >
            ×
          </button>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 text-3xl shadow-md">
            💖
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-pink-400">
            Dear My Darling
          </p>

          <h2 className="mb-3 text-xl font-semibold text-[#60435f]">
            Mang thế giới nhỏ này lên màn hình chính nhé!
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-gray-500">
            Để mỗi lần muốn ghé thăm, em chỉ cần một chạm.
            Lưu lại Dear My Darling và khám phá những điều
            đáng yêu mỗi ngày nhé.
          </p>

          <button
            onClick={install}
            className="w-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.02] active:scale-95"
          >
            Thêm vào màn hình chính ♡
          </button>

          <button
            onClick={dismiss}
            className="mt-4 text-sm text-gray-400 transition hover:text-gray-600"
          >
            Để sau nhé
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
            <div className="mb-3 text-3xl">📲</div>

            <h3 className="mb-3 text-lg font-semibold text-[#60435f]">
              Cài đặt Dear My Darling
            </h3>

            {isIOS ? (
              <p className="text-sm leading-relaxed text-gray-600">
                1. Nhấn nút Chia sẻ ở thanh công cụ Safari.
                <br /><br />
                2. Chọn <b>Add to Home Screen</b>.
                <br /><br />
                3. Nhấn <b>Add</b> để hoàn tất nhé!
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-gray-600">
                Trình duyệt hiện tại chưa cung cấp tính năng
                cài đặt tự động. Em hãy mở menu trình duyệt
                và tìm mục <b>Cài đặt lối tắt</b> hoặc
                <b> Install App </b>.
              </p>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full rounded-full bg-pink-400 py-3 font-medium text-white"
            >
              Đã hiểu ♡
            </button>
          </div>
        </div>
      )}
    </>
  );
}
