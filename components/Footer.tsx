import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/15 ">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">

        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-center">

          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent"
            >
              Dear My Darling
            </Link>

            {/* <p className="mt-3 text-lg font-medium text-white">
              Đẹp hơn mỗi ngày cùng Đại Ca Xinh
            </p> */}

            <p className="mt-2 text-sm leading-6 text-fuchsia-300 whitespace-pre-line">
              Mắt em đẹp lắm nên là đừng khóc <br />
              Môi em xinh lắm nên hãy mỉm cười 
            </p>
          </div>

          {/* Contact */}
          <div className="md:min-w-[320px]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
              Thông tin liên hệ
            </h3>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/daicaxinhvaembe/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  group flex h-11 w-11 items-center justify-center rounded-full
                  border border-violet-400/20
                  bg-violet-500/5
                  text-violet-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-violet-300/60
                  hover:bg-violet-500/15
                  hover:text-violet-100
                  hover:shadow-[0_0_22px_rgba(139,92,246,0.35)]
                "
              >
                <FaFacebookF
                  size={17}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_7px_rgba(167,139,250,0.9)]"
                />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@daica.xinh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="
                  group flex h-11 w-11 items-center justify-center rounded-full
                  border border-fuchsia-400/20
                  bg-fuchsia-500/5
                  text-fuchsia-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-fuchsia-300/60
                  hover:bg-fuchsia-500/15
                  hover:text-fuchsia-100
                  hover:shadow-[0_0_22px_rgba(217,70,239,0.35)]
                "
              >
                <FaTiktok
                  size={17}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_7px_rgba(232,121,249,0.9)]"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/daicaxinh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group flex h-11 w-11 items-center justify-center rounded-full
                  border border-pink-400/20
                  bg-pink-500/5
                  text-pink-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-pink-300/60
                  hover:bg-pink-500/15
                  hover:text-pink-100
                  hover:shadow-[0_0_22px_rgba(236,72,153,0.35)]
                "
              >
                <FaInstagram
                  size={18}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_7px_rgba(249,168,212,0.9)]"
                />
              </a>

            </div>

            {/* Email */}
            <a
              href="mailto:daicaxinh.dear@gmail.com"
              className="
                group my-2 flex items-center gap-3
                text-sm text-white/70
                transition-colors duration-300
                hover:text-fuchsia-300
              "
            >
              <FiMail
                size={17}
                className="
                  text-white
                  transition-all duration-300
                  group-hover:text-fuchsia-300
                  group-hover:drop-shadow-[0_0_7px_rgba(232,121,249,0.8)]
                "
              />

              <span>daicaxinh.dear@gmaii.com</span>
            </a>
            {/* <span  className="text-white/50 text-[12px]"> <i>Hiện tại website không có bất kì thông tin liên hệ nào khác ngoài các thông tin công bố ở trên. Nếu em nhận được bất kì lời đề nghị nào liên quan đến website, vui lòng xác minh thông tin chính thức trước khi trả lời.</i></span> */}
          </div>
          
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/30 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} Đại Ca Xinh. All rights reserved.
            </p>

            {/* <div className="flex gap-5">
              <Link
                href="/privacy"
                className="transition-colors hover:text-violet-300"
              >
                Chính sách bảo mật
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-pink-300"
              >
                Điều khoản sử dụng
              </Link>
            </div> */}

          </div>
        </div>

      </div>
    </footer>
  );
}