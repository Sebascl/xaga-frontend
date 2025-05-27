// Sugerencia para tu Button.jsx (puedes adaptarlo)
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
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={targetId ? `#${targetId}` : undefined}
      onClick={targetId ? handleClick : undefined}
      className={`${className || ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <span className="cta-button-text">{text}</span>
        <span className="cta-button-arrow" aria-hidden="true">
          &darr;
        </span>
      </div>
    </a>
  );
};

export default Button;