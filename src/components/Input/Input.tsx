interface InputProps {
    type?: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

function Input({ type, value, onChange, placeholder, className }: InputProps) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`base-input ${className}`}
      />
    );
}
  
  export default Input;