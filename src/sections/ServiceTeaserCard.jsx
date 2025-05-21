import React from 'react';

const ServiceTeaserCard = ({ service, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-72 md:h-80 rounded-xl overflow-hidden relative group focus:outline-none focus:ring-2"
      style={{
        boxShadow: '0 10px 20px -5px rgba(0,0,0,0.07), 0 4px 8px -6px rgba(0,0,0,0.04)',
        borderColor: 'var(--xaga-gold-light)', // Borde inicial más sutil
        borderWidth: '1px',
        borderStyle: 'solid',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(166,145,103,0.2), 0 8px 16px -8px rgba(166,145,103,0.15)';
        e.currentTarget.style.borderColor = 'var(--xaga-gold-medium)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0,0,0,0.07), 0 4px 8px -6px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = 'var(--xaga-gold-light)';
      }}
      aria-label={`Ver detalles de ${service.category}`}
    >
      <img
        src={service.imagePath}
        alt={service.category}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-350 ease-in-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 w-full h-full p-5 md:p-6 flex flex-col justify-between"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.0) 100%)',
        }}
      >
        <div /> {/* Espaciador para empujar el contenido hacia abajo */}
        <div>
          <h3
            className="text-xl lg:text-2xl font-semibold tracking-tight mb-2"
            style={{ color: 'var(--xaga-white)' }}
          >
            {service.category}
          </h3>
          <div
            className="inline-flex items-center text-sm font-medium py-1 px-3 rounded-full transition-all duration-300 ease-in-out group-hover:shadow-md"
            style={{
              color: 'var(--xaga-black)',
              backgroundColor: 'var(--xaga-gold-light)',
            }}
          >
            Ver Detalles
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ServiceTeaserCard;