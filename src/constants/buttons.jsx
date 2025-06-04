import React from 'react';

// Base button styles
const baseStyle = {
  padding: '0.5rem 1.2rem',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background-color 0.3s ease',
};

// Variants styles
const variants = {
  primary: {
    backgroundColor: '#7c3aed',
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#10b981',
    color: '#fff',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#7c3aed',
    border: '2px solid #7c3aed',
  },
  disabled: {
    backgroundColor: '#ccc',
    color: '#666',
    cursor: 'not-allowed',
  },
};

/**
 * Button component
 * @param {string} variant - Button style variant ('primary', 'secondary', 'outline')
 * @param {boolean} disabled - Disable the button
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button content
 * @param {object} style - Additional inline styles
 */
const Button = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  style = {},
  ...props
}) => {
  const variantStyle = disabled ? variants.disabled : variants[variant] || variants.primary;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variantStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
