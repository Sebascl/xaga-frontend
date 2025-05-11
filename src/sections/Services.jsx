import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';
import ServiceTeaserCard from './ServiceTeaserCard';
import ServiceDetailModal from './ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { id: 'penal', category: "DERECHO PENAL", imagePath: "/images/services/penal_hero.jpeg", items: ["Denuncias Virtuales: Acudimos a tu empresa con los dispositivos adecuados para realizar cualquier tipo de denuncia de tipo penal.", "Querellas: Redactamos la denuncia correspondiente y la presentamos directamente en la Fiscalía del estado.", "Defensa: Nuestros abogados ostentan maestría en derecho penal, te representamos y defendemos en cualquier tipo de delito.", "Asesoría Jurídica a Víctimas: La asesoría inicia desde que se presenta la denuncia o querella y hasta que el juicio oral penal se lleve a cabo.", "Amparos: Se interponen contra todo tipo de actos de autoridad en tu contra, ordenes de aprensión, comparecencia o presentación, etc."] },
  { id: 'mercantil-civil', category: "DERECHO MERCANTIL Y CIVIL", imagePath: "/images/services/mercantil_hero.png", items: ["Demandas civiles y mercantiles.", "Contratos: Todo tipo de contratos civiles, mercantiles, notariados, entre particulares y/o ratificados.", "Cobranza Extrajudicial: Tres visitas de cobranza extrajudicial a clientes morosos, notificándoles el requerimiento de pago.", "Gestiones notariales: Poderes y actas constitutivas entre otras gestiones, todo a costo directo de volumen."] },
  { id: 'laboral', category: "DERECHO LABORAL", imagePath: "/images/services/laboral_hero.webp", items: ["Derecho laboral: Brindamos asesoría en todo tipo de asuntos laborales.", "Litigio ante juntas federales y locales de conciliación y arbitraje.", "Demandas laborales.", "Citas conciliatorias: buscamos soluciones amigables que te ayuden a resolver conflictos laborales.", "Constitución y operación de empresas de servicio de personal, así como la elaboración de contratos laborales sólidos."] },
  { id: 'administrativo', category: "DERECHO ADMINISTRATIVO", imagePath: "/images/services/administrativo_hero.jpg", items: ["Nos enfocamos en asesoría urbanística que abarca desde el análisis de la zonificación de uso de suelo hasta lograr las diversas licencias municipales, en jurisdicción Municipal, Estatal y Federal."] }
];

const NuestrosServicios = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray('.service-teaser-entry').forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 70, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: sectionRef });

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
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleEscKey);
    }
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-16 md:py-24"
      style={{ backgroundColor: 'var(--xaga-beige)' }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="Nuestros Servicios"
          sub="Áreas de Práctica Especializadas"
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