import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { socialImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);

  useGSAP(() => {
    if (footerRef.current) {
      gsap.set(footerRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(footerRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top bottom-=75px', toggleActions: 'play none none none' }
      });
    }
  }, { scope: footerRef });

  const currentYear = new Date().getFullYear();
  const primaryPhone = { display: "(81) 1030-2865", number: "528110302865" };

  return (
    <footer
      ref={footerRef}
      className="w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--xaga-black)',
        color: 'var(--xaga-beige)',
        paddingTop: '4rem',
        paddingBottom: '3rem',
        visibility: 'hidden'
      }}
    >
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 text-sm">
        <div className="flex flex-col space-y-3 items-center md:items-start text-center md:text-left">
          <Link to="/" className="mb-2 inline-block self-center md:self-start">
            <img
              src="/images/logo_xaga.png"
              alt={t('navbar.logoAlt')}
              className="h-12 w-auto max-w-[180px]"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <h3 className="text-xl font-semibold w-full" style={{ color: 'var(--xaga-white)' }}>
            {t('footer.firmName')}
          </h3>
          <p className="text-xs leading-relaxed max-w-none w-full" style={{ color: 'var(--xaga-beige)' }}>
            {t('footer.copyrightLine1', { year: currentYear })} <br />
            {t('footer.copyrightLine2')}
          </p>
        </div>

        <div className="flex flex-col space-y-3 items-center md:items-start text-center md:text-left">
          <h4 className="font-semibold text-lg mb-1 w-full" style={{ color: 'var(--xaga-white)' }}>{t('footer.contactTitle')}</h4>
          <p className="max-w-none w-full" style={{ color: 'var(--xaga-beige)' }}>{t('footer.address')}</p>
          <a href={`tel:${primaryPhone.number}`} className="hover:underline inline-block" style={{ color: 'var(--xaga-gold-medium)' }}>
            {primaryPhone.display}
          </a>
          <Link to="/#contacto" className="text-xs hover:underline inline-block" style={{ color: 'var(--xaga-gold-light)' }}>
            {t('footer.allContactOptions')}
          </Link>
        </div>

        <div className="flex flex-col space-y-3 items-center md:items-start text-center md:text-left">
          <h4 className="font-semibold text-lg mb-1 w-full" style={{ color: 'var(--xaga-white)' }}>{t('footer.linksTitle')}</h4>
          
          <Link to="/aviso-de-privacidad" className="hover:underline max-w-none w-full inline-block" style={{ color: 'var(--xaga-beige)' }}>
            {t('footer.privacyPolicy')}
          </Link>
          <Link to="/terminos-y-condiciones" className="hover:underline max-w-none w-full inline-block" style={{ color: 'var(--xaga-beige)' }}>
            {t('footer.termsAndConditions')}
          </Link>
          
          {socialImgs && socialImgs.length > 0 && (
            <div className="flex flex-wrap space-x-3 pt-2 justify-center md:justify-start w-full">
              {socialImgs.map((social, index) => (
                <a
                  key={index}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-full transition-all duration-300 hover:opacity-75 hover:scale-110 block"
                  style={{ backgroundColor: 'var(--xaga-gold-dark)' }}
                >
                  <img
                    src={social.imgPath}
                    alt={social.name}
                    className="h-5 w-5"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;