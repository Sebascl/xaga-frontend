import React from 'react';

const VisaTeaserCard = ({ visa, onClick }) => {
  const cardBaseStyle = {
    backgroundColor: 'var(--xaga-white)',
    borderRadius: '0.75rem',
    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08), 0 4px 8px -6px rgba(0,0,0,0.05)',
    transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px -10px rgba(166,145,103,0.18), 0 8px 16px -8px rgba(166,145,103,0.12)',
  };

  return (
    <div
      style={cardBaseStyle}
      onClick={onClick}
      onMouseEnter={e => Object.assign(e.currentTarget.style, { ...cardBaseStyle, ...cardHoverStyle })}
      onMouseLeave={e => Object.assign(e.currentTarget.style, cardBaseStyle)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`Más información sobre ${visa.name}`}
    >
      <div className="w-full h-52 md:h-56 overflow-hidden">
        <img
          src={visa.imagePath}
          alt={`Imagen para ${visa.name}`}
          className="w-full h-full object-cover transition-transform duration-350 ease-out"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h4 className="text-lg lg:text-xl font-semibold mb-2" style={{ color: 'var(--xaga-gold-dark)' }}>
          {visa.name}
        </h4>
        <p className="text-xs md:text-sm leading-snug text-gray-600 mb-3 flex-grow">
          {visa.description}
        </p>
        <div
          className="mt-auto self-start inline-flex items-center text-sm font-medium py-1.5 px-3 rounded-md"
          style={{
            color: 'var(--xaga-black)',
            backgroundColor: 'var(--xaga-gold-light)',
          }}
        >
          Ver Detalles
          <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default VisaTeaserCard;