// Button.jsx
const Button = ({ text, className, targetId }) => {
  const handleClick = (e) => {
    if (targetId) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = window.innerHeight * 0.10;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

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
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;