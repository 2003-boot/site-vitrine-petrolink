import { useEffect } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/hero/Hero";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import Footer from "./sections/Footer";
import { initSmoothScroll } from "./smoothScroll";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();

  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });

  // utile si tu ajoutes des sections dynamiquement
  setTimeout(() => AOS.refresh(), 50);

  return cleanup;
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
