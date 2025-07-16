import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const TermsAndConditions = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = t('termsAndConditions.sections', { returnObjects: true });

  return (
    <div
      className="bg-white text-gray-800"
      style={{
        paddingTop: '8rem',
        paddingBottom: '4rem'
      }}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--xaga-black)' }}>
          {t('termsAndConditions.title')}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          {t('termsAndConditions.lastUpdated')}
        </p>

        <div className="space-y-8">
          {Array.isArray(sections) && sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--xaga-gold-dark)' }}>
                {section.title}
              </h2>
              <p className="text-base leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;