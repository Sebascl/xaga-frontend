import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const MisionVision = () => {
  const sectionRef = useRef(null);
  const misionCardRef = useRef(null);
  const visionCardRef = useRef(null);

  const misionText =
    "Proporcionar asesoría legal estratégica e integral de manera eficaz y especializada en asuntos de derecho penal, civil y mercantil, comprometidos en todos los casos a ofrecerle a nuestros clientes el apoyo necesario para la búsqueda de justicia y resolución de conflictos legales.";
  const visionText =
    "Ser lideres en el campo legal, destacando nuestro compromiso, resultados exitosos y amplia experiencia. Buscamos ser reconocidos como los mejores aliados de nuestros clientes para alcanzar sus objetivos en el ámbito legal.";

  useGSAP(
    () => {
      const cards = [
        { ref: misionCardRef.current, delay: 0 },
        { ref: visionCardRef.current, delay: 0.2 },
      ].filter((c) => c.ref);

      cards.forEach((cardItem) => {
        const card = cardItem.ref;
        const iconEl = card.querySelector(".card-icon-area span");
        const titleEl = card.querySelector("h3");
        const textEl = card.querySelector("p");

        gsap.fromTo(
          card,
          { opacity: 0, y: 70, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: cardItem.delay,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              gsap.fromTo(
                [iconEl, titleEl, textEl],
                { opacity: 0, y: 25 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.15,
                  ease: "power2.out",
                }
              );
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const cardBaseStyle = {
    backgroundColor: "var(--xaga-white)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--xaga-gold-light)",
    borderRadius: "1rem", // .rounded-xl
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05)", // Sombra más sutil
    transition:
      "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.35s ease",
    minHeight: "380px", // Mayor altura para dar espacio al nuevo diseño
    padding: "2rem", // p-8
  };

  const cardHoverStyle = {
    transform: "translateY(-10px)",
    boxShadow:
      "0 20px 25px -5px rgba(166,145,103,0.15), 0 10px 10px -5px rgba(166,145,103,0.1)",
    borderColor: "var(--xaga-gold-medium)",
  };

  return (
    <section
      id="mision-vision"
      ref={sectionRef}
      className="overflow-hidden"
      style={{
        backgroundColor: "var(--xaga-beige)",
      }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader
          title="Nuestra Filosofía"
          sub="Compromiso y Dirección Estratégica"
        />

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          <div
            ref={misionCardRef}
            className="flex flex-col text-center items-center"
            style={cardBaseStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardBaseStyle)
            }
          >
            <div
              className="card-icon-area w-20 h-20 mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--xaga-gold-light)" }}
            >
              <span
                className="text-4xl"
                style={{ color: "var(--xaga-gold-dark)" }}
                aria-hidden="true"
              >
                💡
              </span>
            </div>

            <h3
              className="text-3xl lg:text-4xl font-semibold mb-5"
              style={{ color: "var(--xaga-gold-dark)" }}
            >
              Misión
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed flex-grow"
              style={{ color: "var(--xaga-black)" }}
            >
              {misionText}
            </p>
          </div>

          <div
            ref={visionCardRef}
            className="flex flex-col text-center items-center"
            style={cardBaseStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardBaseStyle)
            }
          >
            <div
              className="card-icon-area w-20 h-20 mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--xaga-gold-light)" }}
            >
              <span
                className="text-4xl"
                style={{ color: "var(--xaga-gold-dark)" }}
                aria-hidden="true"
              >
                🧩
              </span>
            </div>
            <h3
              className="text-3xl lg:text-4xl font-semibold mb-5"
              style={{ color: "var(--xaga-gold-dark)" }}
            >
              Visión
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed flex-grow"
              style={{ color: "var(--xaga-black)" }}
            >
              {visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MisionVision;
