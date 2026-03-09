import Link from "next/link"
export default function Navbar() {
  return (
    <header className="w-full p-4 shadow">

      <div className="max-w-6xl mx-auto flex justify-between">

        <h1 className="font-bold text-xl">
          Chào em bé
        </h1>

        <nav className="flex gap-6">
           <Link href="/">Home</Link>
           <Link href="/xinh-dep">Xinh Đẹp</Link>
           <Link href="/di-bien">Đi Biển</Link>
           <Link href="/nhan-qua">Nhận Quà</Link>

        </nav>

      </div>

    </header>
  );
}