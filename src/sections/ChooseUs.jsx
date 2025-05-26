import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const strengthsData = [
  { id: 'equipo', iconText: "👥", title: "Equipo Calificado", detail: "Expertos legales con una trayectoria sólida y profundo conocimiento en diversas áreas del derecho." },
  { id: 'resultados', iconText: "📈", title: "Resultados Comprobados", detail: "Un historial de éxito y casos resueltos favorablemente que respaldan nuestra eficacia." },
  { id: 'atencion', iconText: "🤝", title: "Atención Personalizada", detail: "Brindamos soluciones legales adaptadas a sus necesidades específicas, con un trato cercano y dedicado." },
  { id: 'etica', iconText: "⚖️", title: "Ética Sólida", detail: "Actuamos con un compromiso inquebrantable con la integridad, la transparencia y la justicia." }
];

const ChooseUs = () => {
  const sectionRef = useRef(null);
  const mainTextRef = useRef(null);
  const strengthsGridRef = useRef(null);
  const conclusionTextRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    const mainText = mainTextRef.current;
    const strengthCards = gsap.utils.toArray(strengthsGridRef.current?.children || []);
    const conclusionText = conclusionTextRef.current;

    if (mainText) {
      tl.fromTo(mainText, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
    if (strengthCards.length > 0) {
      tl.fromTo(strengthCards, 
        { opacity: 0, y: 40, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, 
        mainText ? "-=0.5" : 0
      );
    }
    if (conclusionText) {
      tl.fromTo(conclusionText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, "-=0.3");
    }
  }, { scope: sectionRef, dependencies: [] });

  const cardBaseStyle = {
    backgroundColor: "var(--xaga-white)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 20px -5px rgba(0,0,0,0.06), 0 4px 8px -6px rgba(0,0,0,0.04)",
    transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out",
    borderTop: '4px solid var(--xaga-gold-dark)',
    padding: "1.75rem", 
  };

  const cardHoverStyle = {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 18px 30px -10px rgba(166,145,103,0.2), 0 8px 12px -8px rgba(166,145,103,0.15)",
  };

  return (
    <section
      id="porque-elegirnos"
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: 'var(--xaga-beige)' }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="¿POR QUÉ ELEGIRNOS?"
          sub="Nuestra Promesa de Valor y Compromiso"
        />

        <div
          ref={mainTextRef}
          className="max-w-3xl mx-auto mt-10 md:mt-12 text-left md:text-lg" 
        >
          <p
            className="leading-relaxed"
            style={{ color: 'var(--xaga-black)' }}
          >
            En XAGA Abogados, nuestro compromiso es la entera satisfacción de nuestros clientes. Contamos con equipo altamente calificado, valores, historial de éxitos comprobados, atención personalizada, costos competitivos, eficiencia en la gestión de asuntos y una sólida ética.
          </p>
        </div>

        <div
          ref={strengthsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 mt-12 md:mt-16 max-w-4xl mx-auto"
        >
          {strengthsData.map((strength) => (
            <div
              key={strength.id}
              className="flex flex-col" 
              style={cardBaseStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle) }
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle) }
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mt-1"
                  style={{ backgroundColor: "var(--xaga-gold-light)" }}
                  aria-hidden="true"
                >
                  <span className="text-3xl" style={{ color: "var(--xaga-gold-dark)" }}>
                    {strength.iconText}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: "var(--xaga-gold-dark)" }}
                  >
                    {strength.title}
                  </h3>
                  <p className="text-sm leading-normal" style={{ color: "var(--xaga-black)" }}>
                    {strength.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={conclusionTextRef}
          className="max-w-3xl mx-auto mt-12 md:mt-16 text-center" 
        >
          <p
            className="text-xl md:text-2xl font-semibold leading-relaxed"
            style={{ color: 'var(--xaga-gold-medium)' }}
          >
            Confía en nosotros, estamos aquí para ayudarte en cada paso del camino.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;