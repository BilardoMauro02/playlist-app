import '../styles/Input.css';

function Input({type, onChange, placeholder, value , name}) {
  return (
    <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value} 
        className="input"
    />
  )
}

export default Input
