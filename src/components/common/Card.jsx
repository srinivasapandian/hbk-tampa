import { motion } from 'motion/react';

export const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden hover:border-[#FFD700]/30 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};
