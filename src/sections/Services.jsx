import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';
import ServiceTeaserCard from './ServiceTeaserCard';
import ServiceDetailModal from './ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'penal',
    category: "DERECHO PENAL",
    imagePath: "/images/services/penal_hero.jpeg",
    items: [
      "Denuncias Virtuales: Acudimos a tu empresa con los dispositivos adecuados para realizar cualquier tipo de denuncia de tipo penal.",
      "Querellas: Redactamos la denuncia correspondiente y la presentamos directamente en la Fiscalía del estado.",
      "Defensa: Nuestros abogados ostentan maestría en derecho penal, te representamos y defendemos en cualquier tipo de delito.",
      "Asesoría Jurídica a Víctimas: La asesoría inicia desde que se presenta la denuncia o querella y hasta que el juicio oral penal se lleve a cabo.",
      "Amparos: Se interponen contra todo tipo de actos de autoridad en tu contra, ordenes de aprensión, comparecencia o presentación, etc."
    ]
  },
  {
    id: 'mercantil-civil',
    category: "DERECHO MERCANTIL Y CIVIL",
    imagePath: "/images/services/mercantil_hero.png",
    introduction: "En XAGA Abogados, entendemos que las relaciones civiles y las actividades comerciales son fundamentales en la vida diaria y el desarrollo empresarial. Ofrecemos una asesoría integral y representación legal experta para proteger sus intereses personales, patrimoniales y de negocios, abarcando desde la gestión de contratos y obligaciones hasta la resolución de disputas complejas. Nuestro equipo está preparado para guiarle a través de los siguientes procedimientos y servicios especializados:",
    items: [
      // Items de Civil
      "Juicio ordinario civil.",
      "Juicio especial de desahucio por falta de pago de rentas.",
      "Juicio especial hipotecario (constitución, ampliación, registro, extinción, etc.).",
      "Juicios sucesorios testamentarios e intestados.",
      "Interposición de recursos de apelación en materia civil.",
      "Análisis, elaboración y revisión de contratos civiles (compraventa, arrendamiento, donación, comodato, hipoteca, prestación de servicios, asociación y sociedad civil, entre otros).",
      // Items de Mercantil (antes en "Civil y Mercantil")
      "Asesoría y representación legal en controversias mercantiles.",
      "Cobranza judicial y extrajudicial de títulos de crédito (pagarés, cheques, etc.).",
      "Representación legal en juicios ordinarios y ejecutivos mercantiles.",
      "Estudio, elaboración y revisión de contratos mercantiles (comisión, depósito, préstamo, compraventa mercantil, suministro, transporte, seguro, fianza, fideicomiso, arrendamiento financiero, franquicia, etc.).",
      "Reclamaciones de seguros y fianzas ante compañías aseguradoras.",
      "Intervención en procesos arbitrales.",
      "Asesoría en reestructuración de deuda y concurso mercantil."
    ]
  },
  {
    id: 'laboral',
    category: "DERECHO LABORAL",
    imagePath: "/images/services/laboral_hero.webp",
    introduction: "Las dinámicas del entorno laboral requieren un manejo legal preciso y estratégico. En XAGA Abogados, nos dedicamos a la prevención y solución de conflictos laborales, defendiendo con pericia los derechos tanto de empleadores como de trabajadores. Nuestro objetivo es brindar certeza y resultados efectivos en cada caso, ofreciendo un espectro completo de servicios que incluye:",
    items: [
      "Asesoría y representación legal de empresas en materia laboral.",
      "Asesoría y representación legal de trabajadores en materia laboral.",
      "Cálculo de finiquitos e indemnizaciones.",
      "Atención de juicios ante Juntas de Conciliación y Arbitraje y Tribunales Laborales.",
      "Asesoría y participación en procesos de conciliación laboral.",
      "Negociación con trabajadores y sindicatos.",
      "Asesoría e intervención en procedimientos de huelga.",
      "Acompañamiento y asesoría durante inspecciones de la Secretaría del Trabajo y Previsión Social.",
      "Elaboración y formalización de actas administrativas laborales.",
      "Diseño, elaboración y revisión de contratos individuales y colectivos de trabajo.",
      "Elaboración, modificación y revisión de reglamentos interiores de trabajo."
    ]
  },
  {
    id: 'administrativo',
    category: "DERECHO ADMINISTRATIVO",
    imagePath: "/images/services/administrativo_hero.jpg",
    items: [
      "Nos enfocamos en asesoría urbanística que abarca desde el análisis de la zonificación de uso de suelo hasta lograr las diversas licencias municipales, en jurisdicción Municipal, Estatal y Federal."
    ]
  }
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