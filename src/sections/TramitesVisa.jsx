import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';
// import Button from '../components/Button'; // Comentado porque el CTA final se eliminó
import VisaTeaserCard from './VisaTeaserCard';
import VisaDetailModal from './VisaDetailModal';

gsap.registerPlugin(ScrollTrigger);

const visaServicesData = [
  { id: 'h2a', name: 'Visas de Trabajo H-2A', description: 'Para trabajadores agrícolas con ofertas de empleo temporal o estacional en los Estados Unidos.', imagePath: '/images/visas/visa1.png', detailedInfo: [ "La visa H-2A permite a empleadores estadounidenses que anticipan una escasez de trabajadores domésticos traer ciudadanos extranjeros a los EE.UU. para llenar puestos de trabajo agrícolas temporales.", "Este programa es vital para el sector agrícola...", /* ...más info... */ ] },
  { id: 'h2b', name: 'Visas de Trabajo H-2B', description: 'Destinadas a trabajadores no agrícolas para cubrir empleos temporales en EE.UU. en diversos sectores.', imagePath: '/images/visas/visa2.jpg', detailedInfo: [ "La visa H-2B es para trabajadores en ocupaciones no agrícolas...", /* ...más info... */ ] },
  { id: 'b1b2', name: 'Visa B1/B2 (Turismo y Negocios)', description: 'Permite la entrada a EE.UU. por turismo, visitas, tratamientos médicos o actividades de negocios temporales.', imagePath: '/images/visas/visa3.jpeg', detailedInfo: [ "La visa B-1 es para visitantes de negocios temporales...", /* ...más info... */ ] },
  { id: 'tn', name: 'Visa TN (Profesionistas T-MEC)', description: 'Para profesionales cualificados de México y Canadá bajo el T-MEC para trabajar temporalmente en EE.UU.', imagePath: '/images/visas/visa5.png', detailedInfo: [ "La visa TN, derivada del Tratado entre México, Estados Unidos y Canadá...", /* ...más info... */ ] }
];
// NOTA: Eliminé la visa 'cruce' de este ejemplo si solo eran 4 tarjetas en el grid anterior, ajusta si son 5.
// Si son 5, el grid lg:grid-cols-3 es mejor. Si son 4, lg:grid-cols-4 está bien.


const TramitesVisa = () => {
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const sectionCurrent = sectionRef.current;
    if (!sectionCurrent) return;

    const introP = sectionCurrent.querySelector(".visa-intro-text");
    const visaCards = gsap.utils.toArray(sectionCurrent.querySelectorAll(".visa-card-item"));
    
    gsap.set([introP, ...visaCards], {autoAlpha: 0}); // Estado inicial oculto

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionCurrent,
        start: "top 80%", // Ajusta el inicio para que la animación completa tenga más margen
        toggleActions: "play none none none",
        once: true, // La timeline completa se ejecuta una vez
      },
    });

    if (introP) {
      tl.to(introP, { autoAlpha: 1, y: 0, x:0, duration: 0.7, ease: "power2.out" }, "+=0.2");
    }
    if (visaCards.length > 0) {
      tl.to(visaCards, 
        { autoAlpha: 1, y: 0, x:0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, 
        introP ? "-=0.3" : "+=0.2" // Ajusta el timing relativo
      );
    }
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
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleEscKey);
    }
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen, closeModal]);
  
  const cardBaseStyle = {
    backgroundColor: 'var(--xaga-white)',
    borderRadius: '0.75rem',
    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08), 0 4px 8px -6px rgba(0,0,0,0.05)',
    transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px -10px rgba(166,145,103,0.18), 0 8px 16px -8px rgba(166,145,103,0.12)',
  };


  return (
    <section
      id="tramites-visa"
      ref={sectionRef}
      className="overflow-hidden" // Añadido overflow-hidden aquí
      style={{ backgroundColor: "var(--xaga-beige)" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="Asesoría Consular y Trámites de Visa"
          sub="Expertos en Procesos Migratorios en Monterrey"
        />
        <p
          className="visa-intro-text max-w-2xl mx-auto text-center text-base md:text-lg mt-6 md:mt-8 leading-relaxed"
          style={{ color: "var(--xaga-black)", autoAlpha: 0, y: 30 }} // Estado inicial para GSAP
        >
          Desde Monterrey, XAGA Abogados le ofrece asesoría experta y gestión profesional para una amplia gama de visas estadounidenses. Simplificamos procesos complejos, maximizando sus posibilidades de éxito.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
          {visaServicesData.map((visa) => (
            <div
              key={visa.id}
              className="visa-card-item group" // GSAP ahora apunta a esta clase para la animación individual de la tarjeta
              style={{ ...cardBaseStyle, autoAlpha: 0, y: 50, scale: 0.9 }} // Estado inicial para GSAP
              onClick={() => openModal(visa)}
              onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, cardBaseStyle)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(visa); }}
              aria-label={`Ver detalles sobre ${visa.name}`}
            >
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img
                  src={visa.imagePath}
                  alt={`Imagen representativa de ${visa.name}`}
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
                  style={{
                    color: 'var(--xaga-black)',
                    backgroundColor: 'var(--xaga-gold-light)',
                  }}
                >
                  Ver Detalles
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