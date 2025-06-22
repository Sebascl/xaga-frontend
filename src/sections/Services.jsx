import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import TitleHeader from '../components/TitleHeader';
import ServiceTeaserCard from './ServiceTeaserCard';
import ServiceDetailModal from './ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

const localServicesInfo = [
  { id: 'penal', imagePath: "/images/services/penal_hero.jpeg" },
  { id: 'mercantil-civil', imagePath: "/images/services/mercantil_hero.png" },
  { id: 'laboral', imagePath: "/images/services/laboral_hero.webp" },
  { id: 'administrativo', imagePath: "/images/services/administrativo_hero.jpg" }
];

const NuestrosServicios = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const rawTranslatedServices = t('services.data', { returnObjects: true }) || [];
  const translatedServices = Array.isArray(rawTranslatedServices) ? rawTranslatedServices : [];

  const servicesData = localServicesInfo.map(localService => {
    const translatedData = translatedServices.find(ts => ts.id === localService.id) || {};
    return { ...localService, ...translatedData };
  });

  useGSAP(() => {
    const cards = gsap.utils.toArray(sectionRef.current.querySelectorAll('.service-teaser-entry'));
    cards.forEach((card, index) => {
      gsap.set(card, { autoAlpha: 0, y: 70, scale: 0.9 });
      gsap.to(card, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.12,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    });
  }, { scope: sectionRef, dependencies: [] });

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    gsap.delayedCall(0.4, () => setSelectedService(null));
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-10 md:py-14 overflow-hidden"
      style={{ backgroundColor: 'var(--xaga-beige)' }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title={t('navbar.links.services')}
          sub={t('services.subtitle')}
        />
        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="service-teaser-entry">
              <ServiceTeaserCard
                service={service}
                onClick={() => openModal(service)}
              />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default NuestrosServicios;