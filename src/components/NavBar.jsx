import { useEffect, useState } from "react";
import {SlideTabs} from "./SlideTabs";
import logo from "../assets/website-logo.png";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);


    useEffect(() => {
    let rafId = 0;
    let last = window.scrollY;

    const loop = () => {
        const y = window.scrollY;
        const delta = y - last;
        const THRESHOLD = 8;

        if (y < 20) {
        setHidden(false);
        } else if (delta > THRESHOLD) {
        setHidden(true);
        } else if (delta < -THRESHOLD) {
        setHidden(false);
        }

        last = y;
        rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
    }, []);


  return (
    <header
      className={`
        fixed left-1/2 top-6 z-50
        -translate-x-1/2
        transition-all duration-300 ease-out
        ${hidden ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
      `}
    >
      <div
        className="
          flex items-center justify-between gap-8
          px-6 py-3
          rounded-full
          bg-white/80 backdrop-blur-md
          shadow-lg shadow-black/10
          border border-black/5
          w-[60vw] max-w-7xl
        "
      >
        {/* Logo */}
        <a href="/">
          <img src={logo} 
            alt="website logo"
            className="h-10 w-auto object-contain shrink-0"
          />
        </a>

        {/* Links */}
        <nav>
          <SlideTabs />
        </nav>
      </div>
    </header>
  );
}
