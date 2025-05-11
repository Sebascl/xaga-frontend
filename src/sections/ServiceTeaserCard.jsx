import React from 'react';

const ServiceTeaserCard = ({ service, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-64 md:h-72 rounded-xl overflow-hidden relative group focus:outline-none focus:ring-2"
      style={{
        boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1), 0 6px 12px -6px rgba(0,0,0,0.07)',
        borderColor: 'var(--xaga-gold-medium)', 
        borderWidth: '0px', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-width 0.3s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(166,145,103,0.25), 0 8px 16px -8px rgba(166,145,103,0.2)';
        e.currentTarget.style.borderWidth = '2px';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0,0,0,0.1), 0 6px 12px -6px rgba(0,0,0,0.07)';
        e.currentTarget.style.borderWidth = '0px';
      }}
      aria-label={`Ver detalles de ${service.category}`}
    >
      <img
        src={service.imagePath}
        alt={service.category}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        }}
      >
        <h3
          className="text-xl lg:text-2xl font-semibold tracking-tight"
          style={{ color: 'var(--xaga-white)' }}
        >
          {service.category}
        </h3>
      </div>
    </button>
  );
};

export default ServiceTeaserCard;