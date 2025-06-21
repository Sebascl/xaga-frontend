import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const PuzzleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V5H6c-1.1 0-2 .9-2 2v3.8H2.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5H4v3.05c0 1.1.9 2 2 2h4v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h4c1.1 0 2-.9 2-2v-3.5h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
  </svg>
);

const LightbulbIcon = (props) => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm0 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
  </svg>
);

const MisionVision = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const misionCardRef = useRef(null);
  const visionCardRef = useRef(null);

  useGSAP(() => {
    const cardsToAnimate = [misionCardRef.current, visionCardRef.current].filter(Boolean);
    cardsToAnimate.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 70, scale: 0.9 });
      const cardContent = card.querySelectorAll('.card-content-animate');
      gsap.set(cardContent, { opacity: 0, y: 25 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true, 
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.2,
            onComplete: () => {
              gsap.to(cardContent, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    });
  }, { scope: sectionRef, dependencies: [] });

  const cardBaseStyle = {
    backgroundColor: "var(--xaga-white)",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.07), 0 6px 10px -6px rgba(0,0,0,0.07)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
    overflow: 'hidden', 
    display: 'flex',
    flexDirection: 'column',
    minHeight: "400px",
  };

  const cardHoverStyle = {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 30px -10px rgba(166,145,103,0.2), 0 10px 15px -10px rgba(166,145,103,0.15)",
  };

  return (
    <section
      id="mision-vision"
      ref={sectionRef}
      className="py-10 md:py-14"
      style={{ backgroundColor: "var(--xaga-beige)" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title={t('missionVision.title')}
          sub={t('missionVision.subtitle')}
        />

        <div className="mt-12 md:mt-18 grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
          <div
            ref={misionCardRef}
            style={{...cardBaseStyle, opacity: 0 }} 
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle) }
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle) }
          >
            <div style={{ backgroundColor: 'var(--xaga-gold-dark)', padding: '0.75rem' }}></div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
              <div className="card-content-animate w-16 h-16 mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--xaga-gold-light)' }}>
                <PuzzleIcon style={{ color: "var(--xaga-gold-dark)" }} />
              </div>
              <h3 className="card-content-animate text-2xl lg:text-3xl font-semibold mb-4" style={{ color: "var(--xaga-gold-dark)" }}>
                {t('missionVision.missionTitle')}
              </h3>
              <p className="card-content-animate text-base md:text-lg leading-relaxed text-left" style={{ color: "var(--xaga-black)" }}>
                {t('missionVision.missionText')}
              </p>
            </div>
          </div>

          <div
            ref={visionCardRef}
            style={{...cardBaseStyle, opacity: 0 }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle) }
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle) }
          >
            <div style={{ backgroundColor: 'var(--xaga-gold-dark)', padding: '0.75rem' }}></div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
              <div className="card-content-animate w-16 h-16 mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--xaga-gold-light)' }}>
                <LightbulbIcon style={{ color: "var(--xaga-gold-dark)" }} />
              </div>
              <h3 className="card-content-animate text-2xl lg:text-3xl font-semibold mb-4" style={{ color: "var(--xaga-gold-dark)" }}>
                {t('missionVision.visionTitle')}
              </h3>
              <p className="card-content-animate text-base md:text-lg leading-relaxed text-left" style={{ color: "var(--xaga-black)" }}>
                {t('missionVision.visionText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MisionVision;