import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-[999999999] pb-2 pt-1 shadow-xs backdrop-blur-md bg-[#f5f9fb] border-b border-[#CDCDCD]">
      <nav className="container ">
        <Link href="/" className="flex">
          <Image src="/logo-new.png" alt="Logo" width={280} height={60} />
        </Link>
      </nav>
    </header>
  );
}