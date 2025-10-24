import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function StyleButton({ href, text, className = "" }) {
    return (
        <Link 
            href={href}
            className={`inline-flex items-center p-1 bg-prime rounded-full text-white transition-all duration-300 font-medium ${className}`}
        >
            <span className="bg-white py-2 px-6 text-prime rounded-full text-center min-w-40">{text}</span>
            <ChevronRight size={20} className="mx-2" />
        </Link>
    );
}
