export default function Footer() {
  return (
    <footer className="bg-[#0a2540] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div data-aos="fade-right">
            <p className="text-lg font-bold">Petrolink</p>
            <p className="mt-2 text-white/70">
              Transport & Logistique — (placeholder)
            </p>
          </div>

          <div className="flex gap-6 text-white/80">
            <a href="#hero" className="hover:text-white" data-aos="fade-down" data-aos-duration="300">Home</a>
            <a href="#services" className="hover:text-white" data-aos="fade-down" data-aos-duration="400">Services</a>
            <a href="#testimonials" className="hover:text-white" data-aos="fade-down" data-aos-duration="500">Testimonials</a>
          </div>
        </div>

        <div data-aos="fade-right" className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} Petrolink. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
