import { motion } from 'motion/react';

export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "px-6 py-2.5 rounded-sm font-medium transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-[#FFD700] text-black hover:bg-white",
    secondary: "bg-transparent border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black",
    outline: "border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700]"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
