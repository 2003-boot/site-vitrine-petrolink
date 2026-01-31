import { Parallax } from "react-parallax";
import Slider from "react-slick";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import 'aos/dist/aos.css';


gsap.registerPlugin(ScrollTrigger);
const testimonials = [
  {
    id: 1,
    name: "Kristen",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio.",
    img: "/testimonials/user-1.jpg",
    delay: 0.0,
  },
  {
    id: 2,
    name: "Amadou",
    text: "Service rapide et pro. Très bonne communication et livraison dans les délais annoncés.",
    img: "/testimonials/user-2.jpg",
    delay: 0.05,
  },
  {
    id: 3,
    name: "Aïcha",
    text: "Équipe réactive, prise en charge efficace et suivi clair. Je recommande.",
    img: "/testimonials/user-3.jpg",
    delay: 0.1,
  },
  {
    id: 4,
    name: "David",
    text: "Excellent rapport qualité/prix. Les colis arrivent en parfait état.",
    img: "/testimonials/user-4.jpg",
    delay: 0.15,
  },
  {
    id: 5,
    name: "Fatou",
    text: "Le service client est top. On est informé à chaque étape du transport.",
    img: "/testimonials/user-5.jpg",
    delay: 0.2,
  },
  {
    id: 6,
    name: "Jean",
    text: "Gestion très sérieuse, organisation au niveau, je suis satisfait.",
    img: "/testimonials/user-6.jpg",
    delay: 0.25,
  },
  {
    id: 7,
    name: "Mariam",
    text: "Stockage sécurisé et livraison rapide. Très bonne expérience.",
    img: "/testimonials/user-7.jpg",
    delay: 0.3,
  },
  {
    id: 8,
    name: "Koffi",
    text: "Une équipe fiable. Les délais sont respectés et les prix sont corrects.",
    img: "/testimonials/user-8.jpg",
    delay: 0.35,
  },
  {
    id: 9,
    name: "Sarah",
    text: "Service premium. J’ai apprécié le suivi et la transparence.",
    img: "/testimonials/user-9.jpg",
    delay: 0.4,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const titleMaskRef = useRef(null);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // tablette
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };
  useEffect(() => {
    const section = sectionRef.current;
    const titleMask = titleMaskRef.current;
    if (!section || !titleMask) return;

    gsap.set(titleMask, { "--reveal": 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "top 25%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(titleMask, {
          "--reveal": self.progress,
        });
      },
    });

    return () => st.kill();
  }, []);


  return (
    <section id="testimonials" className="relative" ref={sectionRef}>
      <Parallax
        bgImage="/testimonials-image.jpg"
        strength={220}
        bgImageStyle={{ objectFit: "cover" }}
      >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <h2
            ref={titleMaskRef}
            className="
              services-title-reveal
              text-center
              text-3xl md:text-5xl
              font-extrabold
              text-white
              py-2 leading-[1.05]
              mt-6
            "
          >
            Témoignages
          </h2>
        </div>
        <p className=" text-1xl mx-auto mt-4 max-w-2xl font-extrabold text-center text-[#1E245C]">
          Ce que nos clients disent de nos services de transport & logistique.
        </p>

        <div className="mt-8 mb-16">
          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-3">
                <TestimonialCard t={t} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      </Parallax>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <article
      className="
        rounded-2xl
        bg-black/25 backdrop-blur-sm
        border border-white/10
        p-6
        shadow-lg shadow-black/20
        min-h-[220px]
      "
      style={{ animationDelay: `${t.delay}s` }}
    >
      {/* Header: avatar + name */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
          <img
            src={t.img}
            alt={t.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="leading-tight">
          <p className="text-white font-semibold text-lg">{t.name}</p>
          <p className="text-white/60 text-sm">{t.name}</p>
        </div>
      </div>

      {/* Text */}
      <p className="mt-5 text-white/75 text-sm leading-relaxed">
        {t.text}
      </p>

      {/* Stars */}
      <div className="mt-5 flex gap-1">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
    </article>
  );
}

function Star() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-yellow-400"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}