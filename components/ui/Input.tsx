import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerClassName = '',
  className = '',
  ...props
}) => {
  const inputClasses = `input-field font-mono ${className}`;
  
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-bold mb-1 text-cyan-400 tracking-widest">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500 tracking-wider">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-magenta-400 tracking-wider">{error}</p>
      )}
    </div>
  );
};

export default Input;