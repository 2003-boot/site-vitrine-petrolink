// src/components/Hero/Hero.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fragmentShader, vertexShader } from "./shader";
import { Parallax } from "react-parallax";


gsap.registerPlugin(ScrollTrigger);

// ✅ Alternative gratuite à SplitText (word spans)
function splitToWordSpans(element) {
  if (!element) return [];
  const text = element.textContent.trim().replace(/\s+/g, " ");
  element.setAttribute("aria-label", text);
  element.textContent = "";

  const parts = text.split(" ");
  const spans = [];

  parts.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "inline-block opacity-0";
    span.textContent = word;
    element.appendChild(span);
    spans.push(span);
    if (i < parts.length - 1) element.appendChild(document.createTextNode(" "));
  });

  return spans;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0.92, g: 0.96, b: 0.87 };
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const headline = headlineRef.current;
    if (!hero || !canvas || !headline) return;

    // -------------------------
    // Three.js shader (dissolve)
    // -------------------------
    const CONFIG = {
      color: "#ebf5df",
      spread: 0.5,
      speed: 1, // plus lent
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

    const rgb = hexToRgb(CONFIG.color);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight),
        },
        uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
        uSpread: { value: CONFIG.spread },
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const width = hero.offsetWidth;
      const height = hero.offsetHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uResolution.value.set(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let renderId = 0;
    let scrollProgress = 0;

    // ✅ Dissolve piloté par ScrollTrigger (fiable avec Lenis global + scrollerProxy)
    const stDissolve = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: () => "+=" + (hero.scrollHeight - window.innerHeight),
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            scrollProgress = Math.min(self.progress * CONFIG.speed, 1);
            if (introRef.current) {
              gsap.set(introRef.current, {
                opacity: 1 - scrollProgress,
              });
            }

        },
    });


    const render = () => {
      material.uniforms.uProgress.value = scrollProgress;
      renderer.render(scene, camera);
      renderId = requestAnimationFrame(render);
    };
    renderId = requestAnimationFrame(render);

    // -------------------------
    // Text reveal word-by-word
    // -------------------------
    // const content = hero.querySelector(".hero-content");
    const words = splitToWordSpans(headline);
    gsap.set(words, { opacity: 0 });

    const START = 0.65;

    
    const stText = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: () => "+=" + (hero.scrollHeight - window.innerHeight), // ✅ même base que dissolve
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // progressText: 0->1 uniquement après START
        const progressText = Math.max(0, (self.progress - START) / (1 - START));
        const total = words.length || 1;

        for (let i = 0; i < total; i++) {
          const a = i / total;
          const b = (i + 1) / total;

          let opacity = 0;
          if (progressText >= b) opacity = 1;
          else if (progressText > a) opacity = (progressText - a) / (b - a);

          gsap.set(words[i], { opacity });
        }
      },
    });

    // -------------------------
    // Cleanup
    // -------------------------
    return () => {
      stDissolve?.kill();
      stText?.kill();

      cancelAnimationFrame(renderId);
      window.removeEventListener("resize", resize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[160vh] overflow-hidden"
    >
      <Parallax
        bgImage="/hero-image.jpg"                 
        strength={220}
        bgImageStyle={{ objectFit: "cover" }}
      >
        {/* Ce wrapper DOIT être position:relative pour tes z-index */}
        <div className="relative min-h-[160vh]">
          {/* overlay sombre AU-DESSUS de l'image parallax */}
          <div className="absolute inset-0 z-10 bg-black/45" />

          {/* canvas AU-DESSUS de l'image (et de l'overlay) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 h-full w-full pointer-events-none"
          />


          {/* Header */}
          <div ref={introRef} className="mx-auto max-w-6xl px-6 pt-28 relative z-10">
            <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
              <h1 className="uppercase text-4xl md:text-6xl font-bold tracking-tight text-white mt-16" data-aos="fade-up" data-aos-delay="0">
                petrolink pour vous servir.
              </h1>
              <p data-aos="fade-up" data-aos-delay="120" className=" bg-[#1E245C] text-base md:text-lg text-white/80 border-4 rotate-3 rounded-full border-white">
                Votre partenaire logistique de confiance, du départ à la livraison.
              </p>

              {/* Ton bouton spécial (si tu veux l’ajouter ici) */}
              <a href="#about" className="split-btn mt-10 inline-flex" data-aos="fade-up-right" data-aos-delay="240">
                {/* couche du dessous (révélée) */}
                <span className="split-btn__base">À propos de nous</span>

                {/* couche du dessus – moitié gauche */}
                <span
                  className="split-btn__top split-btn__top--left"
                  aria-hidden="true"
                >
                  À propos de nous
                </span>

                {/* couche du dessus – moitié droite */}
                <span
                  className="split-btn__top split-btn__top--right"
                  aria-hidden="true"
                >
                  À propos de nous
                </span>
              </a>

            </div>
          </div>

          {/* Content text reveal */}
          <div className="hero-content mx-auto max-w-6xl px-6 pb-16 mt-24 md:mt-36 relative z-10">
            <h2
              ref={headlineRef}
              className="mx-auto max-w-3xl text-center text-xl md:text-3xl font-semibold leading-snug text-[#1E245C]"
            >
              Nous accompagnons les entreprises avec des solutions d’approvisionnement, 
              de transport et de conseil adaptées à chaque besoin, 
              en garantissant fiabilité, efficacité et transparence à chaque étape.
            </h2>
          </div>
        </div>
      </Parallax>
    </section>
  );

}
