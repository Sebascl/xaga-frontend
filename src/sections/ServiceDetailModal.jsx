import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(modalRef.current, { opacity: 0, scale: 0.9, y: -20, duration: 0.3, ease: 'power3.in' });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, delay: 0.1 });
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${service.id}`}
    >
      <div
        ref={modalRef}
        className="max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: 'var(--xaga-white)',
          maxHeight: '90vh',
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-64 md:h-80 relative">
          <img
            src={service.imagePath}
            alt={service.category}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 focus:outline-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--xaga-white)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
            aria-label="Cerrar modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.636a1 1 0 00-1.414 0L12 10.586 7.05 5.636a1 1 0 10-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 101.414 1.414L12 13.414l4.95 4.95a1 1 0 001.414-1.414L13.414 12l4.95-4.95a1 1 0 000-1.414z"/></svg>
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          <h2
            id={`modal-title-${service.id}`}
            className="text-2xl lg:text-3xl font-semibold mb-4"
            style={{ color: 'var(--xaga-gold-dark)' }}
          >
            {service.category}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
            {service.items.map((item, index) => (
              <li key={index} style={{ color: 'var(--xaga-black)' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;