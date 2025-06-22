import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import TitleHeader from '../components/TitleHeader';
import VisaDetailModal from './VisaDetailModal';

gsap.registerPlugin(ScrollTrigger);

const localVisaInfo = [
  { id: 'h2a', imagePath: '/images/visas/visa1.png' },
  { id: 'h2b', imagePath: '/images/visas/visa2.jpg' },
  { id: 'b1b2', imagePath: '/images/visas/visa3.jpeg' },
  { id: 'tn', imagePath: '/images/visas/visa5.png' }
];

const TramitesVisa = () => {
  const { t } = useTranslation();
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const rawTranslatedVisas = t('visaServices.data', { returnObjects: true }) || [];
  const translatedVisas = Array.isArray(rawTranslatedVisas) ? rawTranslatedVisas : [];

  const visaServicesData = localVisaInfo.map(localVisa => {
    const translatedData = translatedVisas.find(tv => tv.id === localVisa.id) || {};
    return { ...localVisa, ...translatedData };
  });

  useGSAP(() => {
    const sectionCurrent = sectionRef.current;
    if (!sectionCurrent) return;
    const introP = sectionCurrent.querySelector(".visa-intro-text");
    const visaCards = gsap.utils.toArray(sectionCurrent.querySelectorAll(".visa-card-item"));
    gsap.set([introP, ...visaCards], { autoAlpha: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionCurrent, start: "top 80%", toggleActions: "play none none none", once: true }
    });
    if (introP) tl.to(introP, { autoAlpha: 1, y: 0, x: 0, duration: 0.7, ease: "power2.out" }, "+=0.2");
    if (visaCards.length > 0) tl.to(visaCards, { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, introP ? "-=0.3" : "+=0.2");
  }, { scope: sectionRef, dependencies: [] });

  const openModal = (visa) => {
    setSelectedVisa(visa);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    gsap.delayedCall(0.4, () => setSelectedVisa(null));
  };

  useEffect(() => {
    const handleEscKey = (event) => { if (event.key === "Escape" && isModalOpen) closeModal(); };
    if (isModalOpen) window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isModalOpen]);

  const cardBaseStyle = {
    backgroundColor: 'var(--xaga-white)',
    borderRadius: '0.75rem',
    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08), 0 4px 8px -6px rgba(0,0,0,0.05)',
    transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  };
  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px -10px rgba(166,145,103,0.18), 0 8px 16px -8px rgba(166,145,103,0.12)'
  };

  return (
    <section id="tramites-visa" ref={sectionRef} className="overflow-hidden" style={{ backgroundColor: "var(--xaga-beige)" }}>
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title={t('navbar.links.visas')}
          sub={t('visaServices.subtitle')}
        />
        <p
          className="visa-intro-text max-w-2xl mx-auto text-center text-base md:text-lg mt-6 md:mt-8 leading-relaxed"
          style={{ color: "var(--xaga-black)", autoAlpha: 0, y: 30 }}
        >
          {t('visaServices.introduction')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
          {visaServicesData.map((visa) => (
            <div
              key={visa.id}
              className="visa-card-item group"
              style={{ ...cardBaseStyle, autoAlpha: 0, y: 50, scale: 0.9 }}
              onClick={() => openModal(visa)}
              onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, cardBaseStyle)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(visa); }}
              aria-label={t('visaServices.teaser.cardAriaLabel', { name: visa.name })}
            >
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img
                  src={visa.imagePath}
                  alt={t('visaServices.teaser.imageAlt', { name: visa.name })}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-grow items-start text-left">
                <h4 className="text-lg lg:text-xl font-semibold mb-2" style={{ color: 'var(--xaga-gold-dark)' }}>
                  {visa.name}
                </h4>
                <p className="text-xs md:text-sm leading-snug text-gray-600 mb-4 flex-grow">
                  {visa.description}
                </p>
                <div
                  className="mt-auto inline-flex items-center text-xs font-semibold py-1.5 px-3.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ color: 'var(--xaga-black)', backgroundColor: 'var(--xaga-gold-light)' }}
                >
                  {t('visaServices.teaser.buttonText')}
                  <svg className="ml-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedVisa && (
        <VisaDetailModal
          visa={selectedVisa}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default TramitesVisa;