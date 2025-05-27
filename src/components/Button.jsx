// src/components/Button.jsx
const Button = ({ text, className, targetId }) => {
  const handleClick = (e) => {
    if (targetId) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbar = document.querySelector('.navbar'); 
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const extraOffset = 20;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight - extraOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <a
      href={targetId ? `#${targetId}` : undefined}
      onClick={handleClick}
      className={`${className || ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="Flecha" className="w-5 h-5" />
        </div>
      </div>
    </a>
  );
};

export default Button;