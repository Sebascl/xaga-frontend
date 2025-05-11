import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".hero-accent-line",
      { width: 0, opacity: 0 },
      { width: "80px", opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".hero-title-line",
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(".hero-cta-button",
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6"
    );
  }, { scope: sectionRef });

  const textShadowStyle = '1px 1px 3px rgba(0,0,0,0.5)';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100dvh] flex items-center justify-center"
      style={{
        backgroundImage: 'url(/images/bg_legal_abstract.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'var(--xaga-black)'
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)'
        }}
      />

      <div className="relative z-10 flex items-center justify-center w-full min-h-[100dvh] py-16 md:py-20">
        <header className="flex flex-col justify-center items-center text-center md:px-10 px-5 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 md:gap-8">
            <div
              className="hero-accent-line h-1.5 mb-4 md:mb-6 self-center"
              style={{ backgroundColor: 'var(--xaga-gold-dark)' }}
            ></div>
            <div className="hero-text space-y-2 md:space-y-3">
              <h1
                className="hero-title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{ color: 'var(--xaga-white)', textShadow: textShadowStyle }}
              >
                XAGA Abogados
              </h1>
              <h2
                className="hero-title-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold"
                style={{ color: 'var(--xaga-gold-dark)', textShadow: textShadowStyle }}
              >
                Defensa Legal, Resultados Reales.
              </h2>
            </div>

            <p
              className="hero-subtitle text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--xaga-beige)', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
            >
              Comprometidos con la excelencia y la protección de sus derechos. Su confianza es nuestro mayor compromiso.
            </p>

            <div className="hero-cta-button mt-8 md:mt-10">
              <Button
                text="Contáctanos Hoy"
                targetId="contacto"
                className="md:w-80 md:h-16 w-64 h-14 text-lg md:text-xl"
              />
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Hero;