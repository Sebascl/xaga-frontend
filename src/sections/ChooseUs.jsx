import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const strengthsData = [
  { id: 'equipo', iconText: "👥", title: "Equipo Calificado" },
  { id: 'resultados', iconText: "📈", title: "Resultados Comprobados" },
  { id: 'atencion', iconText: "🤝", title: "Atención Personalizada" },
  { id: 'etica', iconText: "⚖️", title: "Ética Sólida" }
];

const ChooseUs = () => {
  const sectionRef = useRef(null);
  const mainTextRef = useRef(null);
  const strengthsGridRef = useRef(null);
  const conclusionTextRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    tl.from(mainTextRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
      .from(gsap.utils.toArray(strengthsGridRef.current.children), {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out'
      }, "-=0.3")
      .from(conclusionTextRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, "-=0.3");

  }, { scope: sectionRef });

  return (
    <section
      id="porque-elegirnos"
      ref={sectionRef}
      className=""
      style={{ backgroundColor: 'var(--xaga-beige)' }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="¿POR QUÉ ELEGIRNOS?"
          sub="Nuestra Promesa de Valor y Compromiso"
        />

        <div
          ref={mainTextRef}
          className="max-w-3xl mx-auto mt-8 md:mt-12 text-center"
        >
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: 'var(--xaga-black)' }}
          >
            En XAGA Abogados nuestro compromiso es la entera satisfacción de nuestros clientes. Contamos con equipo altamente calificado, valores, historial de éxitos comprobados, atención personalizada, costos competitivos, eficiencia en la gestión de asuntos y una sólida ética.
          </p>
        </div>

        <div
          ref={strengthsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-16 max-w-5xl mx-auto"
        >
          {strengthsData.map((strength) => (
            <div
              key={strength.id}
              className="p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
              style={{
                backgroundColor: 'var(--xaga-white)',
                border: '1px solid var(--xaga-gold-light)',
              }}
            >
              <div
                className="text-4xl mb-4"
                style={{ color: 'var(--xaga-gold-dark)' }}
                aria-hidden="true"
              >
                {strength.iconText}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--xaga-gold-dark)' }}
              >
                {strength.title}
              </h3>
            </div>
          ))}
        </div>

        <div
          ref={conclusionTextRef}
          className="max-w-3xl mx-auto mt-10 md:mt-16 text-center"
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