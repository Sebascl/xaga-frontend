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
  { id: 'mercantil-civil', category: "DERECHO MERCANTIL Y CIVIL", imagePath: "/images/services/mercantil_hero.png", introduction: "En XAGA Abogados, entendemos que las relaciones civiles y las actividades comerciales son fundamentales en la vida diaria y el desarrollo empresarial...", items: ["Juicio ordinario civil.", "Juicio especial de desahucio por falta de pago de rentas...", /* Items completos aquí */ ] },
  { id: 'laboral', category: "DERECHO LABORAL", imagePath: "/images/services/laboral_hero.webp", introduction: "Las dinámicas del entorno laboral requieren un manejo legal preciso y estratégico...", items: ["Asesoría y representación legal de empresas en materia laboral.", "Asesoría y representación legal de trabajadores...", /* Items completos aquí */ ] },
  { id: 'administrativo', category: "DERECHO ADMINISTRATIVO", imagePath: "/images/services/administrativo_hero.jpg", items: ["Nos enfocamos en asesoría urbanística que abarca desde el análisis de la zonificación de uso de suelo hasta lograr las diversas licencias municipales, en jurisdicción Municipal, Estatal y Federal."] }
];


const NuestrosServicios = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

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
          once: true, 
        },
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
      window.addEventListener('keydown', handleEscKey);
    }
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen, closeModal]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-10 md:py-14 overflow-hidden"
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