// Hero.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const heroAccentLine = sectionRef.current.querySelector(".hero-accent-line");
    const heroTitleLines = sectionRef.current.querySelectorAll(".hero-title-line");
    const heroSubtitle = sectionRef.current.querySelector(".hero-subtitle");
    const heroCtaButton = sectionRef.current.querySelector(".hero-cta-button");

    gsap.set([heroAccentLine, ...heroTitleLines, heroSubtitle, heroCtaButton], { autoAlpha: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    if (heroAccentLine) {
      tl.to(heroAccentLine, { width: "80px", autoAlpha: 1, duration: 0.8, ease: "power3.out" });
    }
    if (heroTitleLines.length > 0) {
      tl.to(heroTitleLines, { y: 0, autoAlpha: 1, stagger: 0.2, duration: 1, ease: "power3.out" }, heroAccentLine ? "-=0.6" : 0 );
    }
    if (heroSubtitle) {
      tl.to(heroSubtitle, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, "-=0.7" );
    }
    if (heroCtaButton) {
      tl.to(heroCtaButton, { scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6" );
    }
    
    if (heroTitleLines.length > 0) {
      gsap.set(heroTitleLines, { y: 70 });
    }
    if (heroSubtitle) {
      gsap.set(heroSubtitle, { y: 50 });
    }
    if (heroCtaButton) {
      gsap.set(heroCtaButton, { scale: 0.7 });
    }
    if(heroAccentLine){
      gsap.set(heroAccentLine, { width: 0});
    }


  }, { scope: sectionRef, dependencies: [] });

  const textShadowStyle = '1px 1px 4px rgba(0,0,0,0.6)';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center justify-center w-full min-h-[100svh] md:min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/images/bg_legal_abstract.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'var(--xaga-black)'
      }}
    >
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.75)' }}
      />
      <div className="relative z-[2] w-full max-w-5xl mx-auto px-5 md:px-10 py-20 text-center flex flex-col justify-center items-center min-h-[100svh]">
        <header className="flex flex-col items-center">
          <div className="flex flex-col gap-6 md:gap-8 items-center">
            <div
              className="hero-accent-line h-1 md:h-[5px] mb-4 md:mb-6 self-center rounded-full"
              style={{ backgroundColor: 'var(--xaga-gold-dark)'}}
            ></div>
            <div className="hero-text space-y-2 md:space-y-3">
              <h1
                className="hero-title-line text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-tight"
                style={{ color: 'var(--xaga-white)', textShadow: textShadowStyle, letterSpacing: '-0.02em' }}
              >
                XAGA Abogados
              </h1>
              <h2
                className="hero-title-line text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold leading-tight"
                style={{ color: 'var(--xaga-gold-dark)', textShadow: textShadowStyle, letterSpacing: '-0.01em' }}
              >
                Defensa Legal, Resultados Reales.
              </h2>
            </div>
            <p
              className="hero-subtitle text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed md:leading-loose mt-4"
              style={{ color: 'var(--xaga-beige)', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
            >
              Comprometidos con la excelencia y la protección de sus derechos. Su confianza es nuestro mayor compromiso.
            </p>
            <div className="hero-cta-button mt-8 md:mt-10">
              <Button
                text="Contáctanos Hoy"
                targetId="contacto"
                className="md:w-80 md:h-16 w-full max-w-xs h-14 text-lg md:text-xl"
              />
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Hero;