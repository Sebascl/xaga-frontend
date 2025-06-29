import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.667232338531!2d-100.2312960888809!3d25.68160407730602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866295555462c07b%3A0x64c8d5696f8f7493!2sOLIMPIA%201521-S%20XAGA%20ABOGADOS!5e0!3m2!1ses-419!2smx!4v1718843939634!5m2!1ses-419!2smx";


const Contact = () => {
  const { t, i18n } = useTranslation(); 
  const sectionRef = useRef(null);
  const contactPanelRef = useRef(null);
  const mapPanelRef = useRef(null);

  const isEnglish = i18n.language.startsWith('en');

  const callNumber = {
    display: isEnglish ? "+52 (81) 2719-5935" : "(81) 2719-5935",
    number: "528127195935"
  };

  const whatsappNumber = {
    display: isEnglish ? "+52 (81) 1030-2865" : "(81) 1030-2865",
    number: "528110302865"
  };

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" }});
    if (contactPanelRef.current) {
      tl.from(contactPanelRef.current, { opacity: 0, x: -100, duration: 1, ease: 'power3.out' });
      const contactItems = contactPanelRef.current.querySelectorAll('.contact-item-group');
      if (contactItems.length > 0) {
        gsap.utils.toArray(contactItems).forEach((item, index) => {
          tl.from(item, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', delay: index * 0.1 }, "-=0.8");
        });
      }
    }
    if (mapPanelRef.current) tl.from(mapPanelRef.current, { opacity: 0, x: 100, duration: 1, ease: 'power3.out' }, "<0.3");
  }, { scope: sectionRef });

  const PhoneIcon = ({ className = "mr-3" }) => ( <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> );
  const LocationIcon = ({ className = "mr-3 mt-1 flex-shrink-0" }) => ( <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg> );
  
  const baseButtonStyle = { backgroundColor: 'var(--xaga-gold-dark)', color: 'var(--xaga-white)', transition: 'background-color 0.3s ease, transform 0.2s ease' };
  const hoverButtonStyle = { backgroundColor: 'var(--xaga-gold-medium)', transform: 'scale(1.03)' };

  return (
    <section id="contacto" ref={sectionRef} className="overflow-hidden" style={{ backgroundColor: 'var(--xaga-beige)' }}>
      <div className="container mx-auto px-6 lg:px-8">
        <TitleHeader 
            title={t('navbar.contact')} 
            sub={t('contact.pageSubtitle')} 
        />

        <div className="mt-10 md:mt-14 grid md:grid-cols-5 gap-10 lg:gap-16 md:items-stretch">
          <div ref={contactPanelRef} className="md:col-span-3 p-8 md:p-10 rounded-xl shadow-xl space-y-10 flex flex-col" style={{ backgroundColor: 'var(--xaga-white)' }}>
            
            <div className="contact-item-group">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-5 border-b-2 pb-3" style={{ color: 'var(--xaga-gold-dark)', borderColor: 'var(--xaga-gold-light)' }}>
                {t('contact.phoneSectionTitle')}
              </h3>
              
              <div className="mb-6">
                <p className="text-sm mb-1" style={{color: 'var(--xaga-black)'}}>{t('contact.phoneInstruction')}</p>
                <a href={`tel:${callNumber.number}`} className="flex items-center text-lg md:text-xl group" style={{ color: 'var(--xaga-black)'}} onMouseEnter={e => e.currentTarget.style.color = 'var(--xaga-gold-medium)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--xaga-black)'}>
                  <PhoneIcon className="mr-3 transition-colors duration-300 group-hover:fill-[var(--xaga-gold-medium)]" /> 
                  {/* Este span mostrará el número en el formato correcto */}
                  <span className="transition-colors duration-300 group-hover:text-[var(--xaga-gold-medium)]">{callNumber.display}</span>
                </a>
              </div>

              <div>
                <p className="text-sm mb-1" style={{color: 'var(--xaga-black)'}}>{t('contact.whatsappInstruction')}</p>
                <a href={`https://wa.me/${whatsappNumber.number}?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios.`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center py-3 px-6 rounded-lg text-base font-semibold shadow-md hover:shadow-lg" style={baseButtonStyle} onMouseEnter={e => Object.assign(e.currentTarget.style, hoverButtonStyle)} onMouseLeave={e => Object.assign(e.currentTarget.style, baseButtonStyle)}>
                  {/* El número dentro del botón también se actualizará */}
                  {t('contact.whatsappButtonText', { number: whatsappNumber.display })}
                </a>
              </div>
            </div>

            <div className="contact-item-group">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 border-b-2 pb-3" style={{ color: 'var(--xaga-gold-dark)', borderColor: 'var(--xaga-gold-light)' }}>
                {t('contact.addressSectionTitle')}
              </h3>
              <div className="flex items-start text-lg md:text-xl" style={{ color: 'var(--xaga-black)' }}>
                <LocationIcon />
                <p className="max-w-none">{t('contact.address')}</p>
              </div>
            </div>
          </div>

          <div ref={mapPanelRef} className="md:col-span-2 rounded-xl overflow-hidden shadow-xl h-96 md:h-auto flex flex-col">
            <iframe
              src={mapEmbedUrl}
              className="w-full flex-grow min-h-[300px] md:min-h-[400px]"
              style={{ border:0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('contact.mapTitle')}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;