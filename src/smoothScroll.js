// src/smoothScroll.js
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
  });

  // 🔥 Connecte Lenis à ScrollTrigger
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
  ScrollTrigger.defaults({ scroller: document.body });


  lenis.on("scroll", ScrollTrigger.update);

  let rafId = 0;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // important: refresh après proxy
  ScrollTrigger.refresh();

  return () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    ScrollTrigger.killAll(false);
  };
}
