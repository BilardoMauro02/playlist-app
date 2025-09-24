import '../styles/Button.css';

function Button({ type = 'button', children, variant = 'primary', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;