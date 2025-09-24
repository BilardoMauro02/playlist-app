import '../styles/Input.css';

function Input({type, onChange, placeholder, value}) {
  return (
    <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value} 
        className="input"
    />
  )
}

export default Input
