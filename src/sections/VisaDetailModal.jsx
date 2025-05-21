import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const VisaDetailModal = ({ visa, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const primaryWhatsAppNumber = "528110302865"; // Número principal para contacto por WhatsApp

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: -30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, delay: 0.1 });
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !visa) return null;

  const baseButtonStyle = {
    backgroundColor: "var(--xaga-gold-dark)",
    color: "var(--xaga-white)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };
  const hoverButtonStyle = {
    backgroundColor: "var(--xaga-gold-medium)",
    transform: "scale(1.03)",
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${visa.id}`}
      aria-describedby={`modal-description-${visa.id}`}
    >
      <div
        ref={modalRef}
        className="max-w-xl lg:max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: "var(--xaga-white)",
          maxHeight: "90vh",
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-56 md:h-64 relative">
          <img
            src={visa.imagePath}
            alt={`Imagen para ${visa.name}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 focus:outline-none"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "var(--xaga-white)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")
            }
            aria-label="Cerrar modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.364 5.636a1 1 0 00-1.414 0L12 10.586 7.05 5.636a1 1 0 10-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 101.414 1.414L12 13.414l4.95 4.95a1 1 0 001.414-1.414L13.414 12l4.95-4.95a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
        <div
          id={`modal-description-${visa.id}`}
          className="p-6 md:p-8 overflow-y-auto"
        >
          <h2
            id={`modal-title-${visa.id}`}
            className="text-2xl lg:text-3xl font-semibold mb-3"
            style={{ color: "var(--xaga-gold-dark)" }}
          >
            {visa.name}
          </h2>
          {visa.introduction && (
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              {visa.introduction}
            </p>
          )}

          <div
            className="prose prose-sm md:prose-base max-w-none"
            style={{ color: "var(--xaga-black)" }}
          >
            {visa.detailedInfo &&
              visa.detailedInfo.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <div
            className="mt-8 pt-6 border-t"
            style={{ borderColor: "var(--xaga-gold-light)" }}
          >
            <h4
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--xaga-gold-dark)" }}
            >
              ¿Interesado en este trámite?
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              Contáctanos directamente para una asesoría personalizada sobre su
              caso.
            </p>
            <a
              href={`https://wa.me/${primaryWhatsAppNumber}?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20la%20${encodeURIComponent(
                visa.name
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto py-3 px-6 rounded-lg text-base font-semibold shadow-md hover:shadow-lg"
              style={baseButtonStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, hoverButtonStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, baseButtonStyle)
              }
            >
              Consulta Personalizada
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetailModal;
