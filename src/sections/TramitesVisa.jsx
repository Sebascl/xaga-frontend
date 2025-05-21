import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import VisaTeaserCard from "./VisaTeaserCard";
import VisaDetailModal from "./VisaDetailModal";

gsap.registerPlugin(ScrollTrigger);

const visaServicesData = [
  {
    id: "h2a",
    name: "Visas de Trabajo H-2A",
    imagePath: "/images/visas/visa1.png",
    description:
      "Para trabajadores agrícolas con ofertas de empleo temporal o estacional en los Estados Unidos.", // Teaser
    detailedInfo: [
      "La visa H-2A permite a empleadores estadounidenses que anticipan una escasez de trabajadores domésticos traer ciudadanos extranjeros a los EE.UU. para llenar puestos de trabajo agrícolas temporales.",
      "Este programa es vital para el sector agrícola, asegurando que las cosechas y otras labores esenciales se realicen a tiempo.",
      "En XAGA Abogados, asistimos tanto a empleadores como a trabajadores en este complejo proceso, incluyendo:",
      "- Verificación de elegibilidad y cumplimiento de requisitos del Departamento de Trabajo (DOL).",
      "- Preparación y presentación de la Petición I-129 ante USCIS.",
      "- Asesoría para la entrevista consular y obtención de la visa.",
    ],
  },
  {
    id: "h2b",
    name: "Visas de Trabajo H-2B",
    imagePath: "/images/visas/visa2.jpg",
    description:
      "Destinadas a trabajadores no agrícolas para cubrir empleos temporales en EE.UU. en diversos sectores.", // Teaser
    detailedInfo: [
      "La visa H-2B es para trabajadores en ocupaciones no agrícolas cuando existe una necesidad temporal (estacional, pico de carga, intermitente o de única ocasión) por parte del empleador en EE.UU.",
      "Común en industrias como hotelería, turismo, construcción, paisajismo, procesamiento de mariscos, entre otros.",
      "XAGA Abogados ofrece asesoría completa para:",
      "- Determinar la naturaleza temporal de la necesidad del empleador.",
      "- Obtener la Certificación de Trabajo Temporal del DOL.",
      "- Presentar la Petición I-129 y guiar a los beneficiarios en el proceso consular.",
    ],
  },
  {
    id: "b1b2",
    name: "Visa B1/B2 (Turismo y Negocios)",
    imagePath: "/images/visas/visa3.jpeg",
    description:
      "Permite la entrada a EE.UU. por turismo, visitas, tratamientos médicos o actividades de negocios temporales.", // Teaser
    detailedInfo: [
      "La visa B-1 es para visitantes de negocios temporales, mientras que la visa B-2 es para turismo, visitas a familiares/amigos o tratamientos médicos.",
      "Comúnmente, se expiden de manera combinada (B1/B2).",
      "Es crucial demostrar la intención de una visita temporal y lazos fuertes con el país de origen.",
      "En XAGA Abogados, le ayudamos a:",
      "- Preparar una solicitud convincente y bien documentada.",
      "- Reunir evidencia de solvencia económica y arraigo.",
      "- Prepararse para la entrevista consular, maximizando sus posibilidades de aprobación.",
    ],
  },
  {
    id: "cruce",
    name: "Tarjeta de Cruce Fronterizo (BCC)",
    imagePath: "/images/visas/visa4.png",
    description:
      'Conocida como "Visa Láser", facilita a ciudadanos mexicanos la entrada ágil a la zona fronteriza de EE.UU.', // Teaser
    detailedInfo: [
      "La Tarjeta de Cruce Fronterizo (BCC), o 'Visa Láser', es una tarjeta laminada con múltiples medidas de seguridad, que también funciona como visa B1/B2.",
      "Permite a los ciudadanos mexicanos ingresar a los Estados Unidos dentro de una zona fronteriza específica por un período limitado (generalmente hasta 30 días y dentro de 25-75 millas de la frontera, dependiendo del estado).",
      "Para viajar más allá de la zona fronteriza o por períodos más largos, se requiere un permiso I-94.",
      "XAGA Abogados le asiste en el proceso de solicitud o renovación de su BCC, un documento esencial para residentes de la región.",
    ],
  },
  {
    id: "tn",
    name: "Visa TN (Profesionistas T-MEC)",
    imagePath: "/images/visas/visa5.png",
    description:
      "Para profesionales cualificados de México y Canadá bajo el T-MEC para trabajar temporalmente en EE.UU.", // Teaser
    detailedInfo: [
      "La visa TN, derivada del Tratado entre México, Estados Unidos y Canadá (T-MEC, antes TLCAN), permite a ciudadanos mexicanos y canadienses cualificados trabajar en los EE.UU. en ocupaciones profesionales preestablecidas.",
      "No está sujeta a cuotas anuales como otras visas de trabajo.",
      "Requiere una oferta de empleo de un empleador estadounidense en una de las profesiones listadas y que el solicitante posea las credenciales necesarias.",
      "En XAGA Abogados, ofrecemos:",
      "- Evaluación detallada de elegibilidad profesional y de la oferta laboral.",
      "- Preparación del paquete de solicitud para presentación en el puerto de entrada o consulado.",
      "- Asesoría continua durante todo el proceso.",
    ],
  },
];

const TramitesVisa = () => {
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const introP = sectionRef.current.querySelector(".visa-intro-text");
    const visaCards = gsap.utils.toArray(sectionRef.current.querySelectorAll(".visa-card-item"));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    if (introP) {
      tl.fromTo( introP, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
    }
    if (visaCards.length > 0) {
      tl.fromTo( visaCards,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
        introP ? "-=0.4" : 0
      );
    }
  }, { scope: sectionRef });

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
      className=""
      style={{ backgroundColor: "var(--xaga-beige)" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="Asesoría Consular y Trámites de Visa"
          sub="Expertos en Procesos Migratorios en Monterrey"
        />
        <p
          className="visa-intro-text max-w-2xl mx-auto text-center text-base md:text-lg mt-6 md:mt-8 leading-relaxed"
          style={{ color: "var(--xaga-black)" }}
        >
          Desde Monterrey, XAGA Abogados le ofrece asesoría experta y gestión profesional para una amplia gama de visas estadounidenses. Simplificamos procesos complejos, maximizando sus posibilidades de éxito.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
          {visaServicesData.map((visa) => (
            <div
              key={visa.id}
              className="visa-card-item group" // Añadido 'group' para el hover de la imagen
              style={cardBaseStyle}
              onClick={() => openModal(visa)}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { ...cardBaseStyle, ...cardHoverStyle })}
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