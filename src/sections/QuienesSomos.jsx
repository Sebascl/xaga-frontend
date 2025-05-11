import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const QuienesSomos = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const founderRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const title = titleRef.current;
    const founder = founderRef.current;
    const mainText = textRef.current;
    const accentLine = section.querySelector('.title-accent-line');

    gsap.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.inOut" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    if (imageContainer) {
      tl.fromTo(imageContainer,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "start"
      );
    }

    if (accentLine) {
      tl.fromTo(accentLine,
        { width: 0 },
        { width: '50px', duration: 0.7, ease: 'power2.out'},
        imageContainer ? "-=0.5" : "start+=0.2"
      );
    }
    
    tl.fromTo(title,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      imageContainer ? "-=0.4" : "start+=0.2"
    )
    .fromTo(founder,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(mainText,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

  }, { scope: sectionRef });

  return (
    <section
      id="quienes-somos"
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: 'var(--xaga-beige)',
        color: 'var(--xaga-black)'
      }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          
          <div 
            ref={imageContainerRef} 
            className="w-full md:w-2/5 lg:w-[45%] flex-shrink-0"
          >
            <div
              className="relative w-full aspect-[4/3] md:aspect-auto md:h-[450px] lg:h-[400px] rounded-xl shadow-2xl overflow-hidden border-4 border-solid"
              style={{
                borderColor: 'var(--xaga-gold-medium)',
              }}
            >
              <img
                src="/images/quienes-somos.jpg" 
                alt="Equipo y valores de XAGA Abogados"
                className="w-full h-full object-cover object-bottom"
                style={{ objectPosition: 'center 85%' }}
              />
              <div 
                className="absolute inset-0"
                style={{boxShadow: 'inset 0 0 15px 5px rgba(0,0,0,0.1)'}}
              ></div>
            </div>
          </div>

          <div ref={contentRef} className="w-full md:w-3/5 lg:w-[55%] md:pt-4">
            <div 
              className="title-accent-line h-1 mb-4" 
              style={{backgroundColor: 'var(--xaga-gold-dark)', width: '0px'}}
            ></div>
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-wider"
              style={{ color: 'var(--xaga-gold-dark)' }}
            >
              ¿QUIÉNES SOMOS?
            </h2>
            <p
              ref={founderRef}
              className="text-lg md:text-xl mb-6 font-medium"
              style={{ color: 'var(--xaga-black)' }}
            >
              Fundado por el{' '}
              <span
                className="font-semibold"
                style={{ color: 'var(--xaga-gold-dark)' }} 
              >
                Lic. Jesús Alonso Mendoza Martínez
              </span>.
            </p>
            <div
              ref={textRef}
              className="text-base md:text-lg space-y-5 leading-relaxed prose prose-neutral max-w-none"
              style={{ color: 'var(--xaga-black)'}} 
            >
              <p>
                Con más de 20 años de experiencia,{' '}
                <strong style={{ color: 'var(--xaga-gold-dark)' }}>
                  XAGA Abogados
                </strong>{' '}
                es un despacho líder, comprometido con la excelencia y dedicados a brindar asesoría jurídica integral.
              </p>
              <p>
                Contamos con una establecida reputación, ya que prestamos nuestros servicios legales de manera oportuna a cada uno de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;