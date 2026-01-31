import { useEffect, useRef } from "react";
import { Parallax } from "react-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Approvisionnement & achat",
    desc: "Livraisons rapides et sécurisées, suivi en temps réel et respect des délais.",
    img: "/service-1.png",
    link: "/services/transport-routier",
  },
  {
    title: "Le transport et le stockage",
    desc: "Stockage, préparation de commandes, gestion des flux et optimisation des coûts.",
    img: "/service-2.png",
    link: "/services/logistique-entrepot",
  },
  {
    title: "Services & conseils",
    desc: "Solutions flexibles pour l’expédition nationale et internationale, accompagnement complet.",
    img: "/service-3.png",
    link: "/services/fret-expedition",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const titleMaskRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleMask = titleMaskRef.current;
    if (!section || !titleMask) return;

    // Titre : reveal du centre vers l’extérieur
    // On anime une variable CSS --reveal (0 -> 1)
    gsap.set(titleMask, { "--reveal": 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "top 25%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(titleMask, { "--reveal": self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative">
      <Parallax
        bgImage="/service-image.avif"
        strength={180}
        blur={{ min: -6, max: 12 }}
        bgImageStyle={{ objectFit: "cover" }}
      >
        <div className="relative min-h-[120vh] px-6 py-24">
          {/* overlay léger pour lisibilité */}
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative mx-auto max-w-6xl">
            {/* Titre centré avec reveal clip-path */}
            <div className="flex justify-center">
              <h2
                ref={titleMaskRef}
                className="services-title-reveal text-center text-3xl md:text-5xl font-extrabold tracking-tight text-white"
              >
                Nos services
              </h2>
            </div>

            {/* Cards */}
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="
                    rounded-3xl border border-white/10
                    bg-[#E5E5E5] backdrop-blur-xl
                    shadow-lg shadow-black/15
                    p-7
                  "
                  data-aos="zoom-in"
                >
                  {/* image ronde en haut au centre */}
                  <div className="flex justify-center">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-white/60"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="mt-5 text-center text-lg font-bold text-[#0a2540]">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-center text-sm leading-relaxed text-[#0a2540]/75">
                    {s.desc}
                  </p>

                  {/* bouton clip-path gauche -> droite */}
                  <div className="mt-6 flex justify-center">
                    <a href={s.link} className="wipe-btn">
                      <span className="wipe-btn__base">
                        En savoir plus
                        <span className="wipe-btn__icon" aria-hidden="true">→</span>
                      </span>

                      <span className="wipe-btn__top" aria-hidden="true">
                        En savoir plus
                        <span className="wipe-btn__icon" aria-hidden="true">→</span>
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
