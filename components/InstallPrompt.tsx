
"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type InstallStatus = "idle" | "installing" | "success";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showGuide, setShowGuide] = useState(false);
  const [status, setStatus] = useState<InstallStatus>("idle");

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & {
        standalone?: boolean;
      }).standalone === true;

    if (standalone) return;

    const ios = /iPhone|iPad|iPod/i.test(
      window.navigator.userAgent
    );

    if (localStorage.getItem("dmd-installed") === "true") return;

    const dismissedUntil = Number(
      localStorage.getItem("dmd-install-dismissed") || 0
    );

    if (Date.now() < dismissedUntil) return;

    const timer = window.setTimeout(() => {
      setIsIOS(ios);
      setShow(true);
    }, 5000);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setStatus("success");
      setDeferredPrompt(null);

      localStorage.setItem("dmd-installed", "true");

      window.setTimeout(() => {
        setShow(false);
      }, 2500);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener(
        "beforeinstallprompt",
        handleInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  // Đóng popup
  const dismiss = () => {
    setShow(false);

    localStorage.setItem(
      "dmd-install-dismissed",
      String(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );
  };

  // Bắt đầu cài đặt
  const install = async () => {
    if (deferredPrompt) {
      try {
        setStatus("installing");

        await deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        if (result.outcome === "dismissed") {
          setStatus("idle");
        }

        setDeferredPrompt(null);
      } catch (error) {
        console.error("Install error:", error);
        setStatus("idle");
      }

      return;
    }

    setShowGuide(true);
  };

  if (!show) return null;

  return (
    <>
      {/* MAIN POPUP */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 px-5 backdrop-blur-sm">

        <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 text-center shadow-[0_20px_60px_rgba(100,70,100,0.12)]">

          {/* CLOSE */}
          <button
            onClick={dismiss}
            disabled={status === "installing"}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-xl text-gray-400 transition hover:bg-pink-50 hover:text-pink-400 disabled:opacity-30"
          >
            ×
          </button>

          {/* LOGO */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 text-3xl shadow-sm">
            💖
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-pink-400">
            Dear My Darling
          </p>

          {/* INSTALL SUCCESS */}
          {status === "success" ? (
            <>
              <div className="mb-4 text-4xl">💖</div>

              <h2 className="mb-3 text-xl font-semibold text-[#60435f]">
                Cài đặt thành công!
              </h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Dear My Darling đã sẵn sàng
                trên màn hình chính của em.
                Hẹn gặp em mỗi ngày nhé!
              </p>

              <div className="mt-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                  <span className="text-2xl text-emerald-500">
                    ✓
                  </span>
                </div>
              </div>
            </>
          ) : status === "installing" ? (
            <>
              <div className="mb-5 flex justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-pink-100 border-t-pink-400" />
                  <span className="text-2xl">💗</span>
                </div>
              </div>

              <h2 className="mb-3 text-xl font-semibold text-[#60435f]">
                Đang chờ xác nhận...
              </h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Hãy hoàn tất xác nhận trong
                hộp thoại cài đặt của trình duyệt nhé.
              </p>

              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-pink-50">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-pink-300 to-purple-300" />
              </div>

              <p className="mt-3 text-[10px] text-gray-400">
                Đang chờ trình duyệt...
              </p>
            </>
          ) : (
            <>
              <div className="mb-3 text-xl font-semibold leading-relaxed text-[#60435f]">
                Đưa thế giới nhỏ này lên màn hình chính nhé!
              </div>

              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Để mỗi lần muốn ghé thăm,
                em chỉ cần một chạm.
                Lưu lại Dear My Darling và
                khám phá những điều đáng yêu mỗi ngày.
              </p>

              <button
                onClick={install}
                className="w-full rounded-full bg-gradient-to-r from-pink-300 to-purple-300 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-100 transition hover:scale-[1.02] hover:shadow-pink-200 active:scale-95"
              >
                Thêm vào màn hình chính ♡
              </button>

              <button
                onClick={dismiss}
                className="mt-4 text-sm text-gray-400 transition hover:text-pink-400"
              >
                Để sau nhé
              </button>
            </>
          )}
        </div>
      </div>

      {/* INSTALL GUIDE */}
      {showGuide && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/25 px-5 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl border border-pink-100 bg-white p-7 text-center shadow-[0_20px_60px_rgba(100,70,100,0.15)]">

            <div className="mb-5 text-4xl">📲</div>

            <h3 className="mb-4 text-lg font-semibold text-[#60435f]">
              Cài đặt Dear My Darling
            </h3>

            {isIOS ? (
              <p className="text-sm leading-relaxed text-gray-500">
                1. Nhấn nút <b className="text-[#60435f]">Chia sẻ</b> ở thanh công cụ Safari.
                <br /><br />
                2. Chọn <b className="text-[#60435f]">Add to Home Screen</b>.
                <br /><br />
                3. Nhấn <b className="text-[#60435f]">Add</b> để hoàn tất nhé!
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-gray-500">
                Mở menu trình duyệt và tìm mục
                <b className="text-[#60435f]"> Install Shortcut (Cài đặt lối tắt) </b>
                hoặc
                <b className="text-[#60435f]"> Add to Home Screen </b>
                để thêm ứng dụng nhé!
              </p>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-7 w-full rounded-full bg-gradient-to-r from-pink-300 to-purple-300 py-3 font-semibold text-white shadow-md shadow-pink-100 transition hover:opacity-90 active:scale-95"
            >
              Đã hiểu ♡
            </button>
          </div>
        </div>
      )}
    </>
  );
}
