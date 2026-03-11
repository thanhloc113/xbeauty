"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
 

 

  const linkStyle =
    "relative text-pink-200 hover:text-[#ff6adf] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#ff6adf] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <section
      className={`w-full transition-all duration-300  
        sticky top-0 left-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-lg
        `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#ff6adf]">
      <Image
        src="/image/logo.png"
        alt="logo"
        width={40}
        height={40}
        className="animate-[spin_6s_linear_infinite]"
      />
        <span>Chào em bé</span>
      </Link>

        {/* mobile button */}
        <button
          className="md:hidden text-2xl text-[#ff6adf]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* desktop menu */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className={linkStyle}>Home</Link>
          <Link href="/xinh-dep" className={linkStyle}>Xinh Đẹp</Link>
          <Link href="/di-bien" className={linkStyle}>Đi Biển</Link>
          <Link href="/nhan-qua" className={linkStyle}>Nhận Quà</Link>
        </nav>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 p-4">
          <Link href="/" className={linkStyle}>Home</Link>
          <Link href="/xinh-dep" className={linkStyle}>Xinh Đẹp</Link>
          <Link href="/di-bien" className={linkStyle}>Đi Biển</Link>
          <Link href="/nhan-qua" className={linkStyle}>Nhận Quà</Link>
        </nav>
      )}
    </section>
  );
}