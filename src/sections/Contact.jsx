import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = {
  title: "CONTÁCTANOS",
  subtitle: "Estamos Listos para Asesorarte",
  phones: [
    { display: "(81) 1030-2865", number: "528110302865" },
    { display: "(81) 2719-5935", number: "528127195935" }
  ],
  address: "Olimpia No. 1521 Col. Nueva Linda Vista, Guadalupe, N.L.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898.7363824624719!2d-100.227786022294!3d25.706227442182158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eaed14aa0705%3A0x1a6264716003490d!2sOlimpia%201521%2C%20Nueva%20Linda%20Vista%2C%2067129%20Guadalupe%2C%20N.L.%2C%20M%C3%A9xico!5e0!3m2!1ses!2sco!4v1746983147815!5m2!1ses!2sco", // RECUERDA REEMPLAZAR ESTA URL
  firmLeaders: [
    "Lic. Ana María Mendoza",
    "Lic. Izza Mariana Mendoza"
  ]
};

const Contact = () => {
  const sectionRef = useRef(null);
  const contactPanelRef = useRef(null);
  const mapPanelRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    if (contactPanelRef.current) {
      tl.from(contactPanelRef.current, { 
        opacity: 0, 
        x: -100, 
        duration: 1, 
        ease: 'power3.out' 
      });
      gsap.utils.toArray(contactPanelRef.current.querySelectorAll('.contact-item-group')).forEach((item, index) => {
        tl.from(item, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', delay: index * 0.15 }, "-=0.8");
      });
    }
    if (mapPanelRef.current) {
      tl.from(mapPanelRef.current, { 
        opacity: 0, 
        x: 100, 
        duration: 1, 
        ease: 'power3.out' 
      }, "<0.3"); 
    }
  }, { scope: sectionRef });

  const PhoneIcon = ({ className = "mr-3" }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
  );

  const WhatsAppIcon = ({ className = "mr-2" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16.6 14.2c-.1-.1-.3-.1-.4 0l-1.1 1.1c-.1.1-.3.2-.5.1-.9-.5-1.9-1.2-2.8-2.2-.9-1-1.7-2-2.2-2.8-.1-.2-.1-.4.1-.5l1.1-1.1c.1-.1.1-.3 0-.4-.5-1.1-1-2.3-1.1-3.5-.1-.3-.3-.4-.5-.4h-2.9c-.2 0-.4.1-.5.3-.1.8-.1 1.7.2 2.6.5 1.8 1.5 3.5 2.9 4.9 1.4 1.4 3.1 2.4 4.9 2.9.9.2 1.8.3 2.6.2.2-.1.3-.3.3-.5v-2.9c0-.2-.2-.4-.4-.5-1.2-.1-2.4-.5-3.5-1.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>
  );
  
  const LocationIcon = ({ className = "mr-3 mt-1 flex-shrink-0" }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
  );

  const baseButtonStyle = {
    backgroundColor: 'var(--xaga-gold-dark)',
    color: 'var(--xaga-white)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };
  const hoverButtonStyle = {
    backgroundColor: 'var(--xaga-gold-medium)',
    transform: 'scale(1.03)',
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-5 md:py-5 overflow-hidden" 
      style={{ backgroundColor: 'var(--xaga-beige)' }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader title={contactInfo.title} sub={contactInfo.subtitle} />

        <div className="mt-10 md:mt-12 grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
          
          <div 
            ref={contactPanelRef} 
            className="md:col-span-3 p-8 md:p-10 rounded-xl shadow-xl space-y-10"
            style={{ backgroundColor: 'var(--xaga-white)' }}
          >
            <div className="contact-item-group">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-5 border-b-2 pb-3" style={{ color: 'var(--xaga-gold-dark)', borderColor: 'var(--xaga-gold-light)' }}>
                Llámanos o Escríbenos
              </h3>
              {contactInfo.phones.map((phone, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <a
                    href={`tel:${phone.number}`}
                    className="flex items-center text-lg md:text-xl transition-colors duration-300 group"
                    style={{ color: 'var(--xaga-black)'}}
                  >
                    <PhoneIcon className="mr-3 group-hover:fill-[var(--xaga-gold-medium)] transition-colors duration-300" /> 
                    <span className="group-hover:text-[var(--xaga-gold-medium)] transition-colors duration-300">{phone.display}</span>
                  </a>
                  <a
                    href={`https://wa.me/${phone.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center py-3 px-6 rounded-lg text-base font-semibold shadow-md hover:shadow-lg"
                    style={baseButtonStyle}
                    onMouseEnter={e => Object.assign(e.currentTarget.style, hoverButtonStyle)}
                    onMouseLeave={e => Object.assign(e.currentTarget.style, baseButtonStyle)}
                  >
                    <WhatsAppIcon /> Chatea por WhatsApp
                  </a>
                </div>
              ))}
            </div>

            <div className="contact-item-group">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 border-b-2 pb-3" style={{ color: 'var(--xaga-gold-dark)', borderColor: 'var(--xaga-gold-light)' }}>
                Visítanos
              </h3>
              <div className="flex items-start text-lg md:text-xl" style={{ color: 'var(--xaga-black)' }}>
                <LocationIcon />
                <p>{contactInfo.address}</p>
              </div>
            </div>

            <div className="contact-item-group">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 border-b-2 pb-3" style={{ color: 'var(--xaga-gold-dark)', borderColor: 'var(--xaga-gold-light)' }}>
                Socios Directores
              </h3>
              <ul className="space-y-2 text-lg md:text-xl" style={{ color: 'var(--xaga-black)'}}>
                {contactInfo.firmLeaders.map((leader, index) => (
                  <li key={index} className="flex items-center">
                     <span className="mr-3 text-xl" style={{color: 'var(--xaga-gold-medium)'}}>●</span> {leader}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={mapPanelRef} className="md:col-span-2 rounded-xl overflow-hidden shadow-xl h-96 md:h-[600px] lg:h-[650px] min-h-[400px]">
            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border:0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de XAGA Abogados"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;