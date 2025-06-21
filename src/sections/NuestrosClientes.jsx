import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { logoIconsList } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const LogoIcon = ({ icon }) => {
  return (
    <div
      className="flex-none flex items-center justify-center mx-8 md:mx-12 h-28 md:h-32"
    >
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
        style={{ filter: 'grayscale(100%) opacity(0.75)', mixBlendMode: 'multiply' }}
      />
    </div>
  );
};

const NuestrosClientes = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useGSAP(() => {
    const marqueeContainer = sectionRef.current.querySelector('.marquee');
    if (marqueeContainer) {
      gsap.fromTo(marqueeContainer,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, { scope: sectionRef });

  const xagaBeigeColor = "var(--xaga-beige)";
  const xagaBeigeRgbForGradient = "228, 232, 238";
  
  return (
    <section
      id="clientes"
      ref={sectionRef}
      className="py-10 md:py-18"
      style={{ backgroundColor: xagaBeigeColor }}
    >
      <div className="container mx-auto px-0 md:px-6 lg:px-8">
        <TitleHeader
          title={t('clients.title')}
          sub={t('clients.subtitle')}
        />
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '12rem' }} 
        >
          <div
            className="absolute left-0 top-0 bottom-0 z-10 w-16 md:w-28 lg:w-40"
            style={{ background: `linear-gradient(to right, ${xagaBeigeColor} 20%, rgba(${xagaBeigeRgbForGradient},0) 100%)` }}
          ></div>
          
          <div className="marquee h-full">
            <div className="marquee-box flex items-center h-full animate-marquee">
              {/* Se usa la lista original de constantes, sin cambios */}
              {logoIconsList.concat(logoIconsList).map((icon, index) => (
                <LogoIcon key={`${icon.name}-${index}-A`} icon={icon} />
              ))}
            </div>
          </div>

          <div
            className="absolute right-0 top-0 bottom-0 z-10 w-16 md:w-28 lg:w-40"
            style={{ background: `linear-gradient(to left, ${xagaBeigeColor} 20%, rgba(${xagaBeigeRgbForGradient},0) 100%)` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default NuestrosClientes;