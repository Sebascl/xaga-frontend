import { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants";
import { gsap } from "gsap";

const MenuIcon = (props) => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (props) => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null); // Ref para el <header> para obtener su altura

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const currentMenu = mobileMenuRef.current;
    if (!currentMenu) return;
    gsap.killTweensOf(currentMenu);

    if (isMobileMenuOpen) {
      currentMenu.style.display = 'flex';
      gsap.fromTo(currentMenu,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(currentMenu, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          if (currentMenu) currentMenu.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenuOnly = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      closeMobileMenuOnly();
    }

    const id = targetId.startsWith("#") ? targetId.substring(1) : targetId;
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const navbarHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      const extraOffset = 20; // Un pequeño offset adicional si quieres más espacio
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - extraOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (targetId === "#hero") {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  };

  const navBarDynamicClasses = scrolled
    ? "bg-[var(--xaga-white)] shadow-lg"
    : "bg-transparent md:top-5";
  
  const iconColor = (isMobileMenuOpen || !scrolled) ? 'var(--xaga-white)' : 'var(--xaga-black)';
  const desktopLinkColor = scrolled ? 'var(--xaga-black)' : 'var(--xaga-white)';

  return (
    <header
      ref={headerRef} // Añadido ref aquí
      className={`fixed w-full left-0 top-0 z-[100] transition-all duration-300 ease-in-out ${navBarDynamicClasses}`}
      style={{ paddingLeft: 'calc(max(1.25rem, env(safe-area-inset-left)))', paddingRight: 'calc(max(1.25rem, env(safe-area-inset-right)))' }}
    >
      <div
        className="container mx-auto flex items-center justify-between h-20 md:h-24 transition-all duration-300"
      >
        <a href="#hero" className="logo z-[101]" onClick={(e) => handleNavLinkClick(e, "#hero")}>
          <img
            src="/images/logo_xaga.png"
            alt="XAGA Abogados Logo"
            className="h-10 md:h-12 w-auto"
            style={{ filter: (isMobileMenuOpen && !scrolled) ? 'brightness(0) invert(1)' : 'none' }}
          />
        </a>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map(({ link, name }) => (
            <li key={name} className="group list-none">
              <a
                href={link}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-base font-medium relative pb-1"
                style={{ color: desktopLinkColor }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--xaga-gold-dark)'}
                onMouseLeave={e => e.currentTarget.style.color = desktopLinkColor}
              >
                <span>{name}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'var(--xaga-gold-dark)' }}
                />
              </a>
            </li>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href="#contacto"
            onClick={(e) => handleNavLinkClick(e, "#contacto")}
            className="px-6 py-3 rounded-lg text-base font-medium transition-colors duration-300"
            style={{ backgroundColor: 'var(--xaga-gold-dark)', color: 'var(--xaga-white)'}}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--xaga-gold-medium)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--xaga-gold-dark)'}
          >
            Contáctanos
          </a>
        </div>

        <div className="lg:hidden z-[101]">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
            className="p-2"
            style={{ color: iconColor }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 z-[99] flex flex-col items-center justify-center space-y-6 p-8"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'none',
          transform: 'translateX(100%)',
          opacity: 0,
          paddingTop: 'calc(6rem + env(safe-area-inset-top))',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        onClick={(e) => { if (e.target === mobileMenuRef.current) closeMobileMenuOnly();}}
      >
        {navLinks.map(({ link, name }) => (
          <a
            key={name}
            href={link}
            onClick={(e) => handleNavLinkClick(e, link)}
            className="block text-2xl font-medium text-center py-3"
            style={{ color: 'var(--xaga-white)' }}
          >
            {name}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={(e) => handleNavLinkClick(e, "#contacto")}
          className="mt-8 inline-block px-8 py-4 rounded-lg text-lg font-medium"
          style={{ backgroundColor: 'var(--xaga-gold-dark)', color: 'var(--xaga-white)' }}
        >
          Contáctanos
        </a>
      </div>
    </header>
  );
};

export default NavBar;