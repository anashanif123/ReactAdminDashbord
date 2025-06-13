import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      className={clsx(
        'glass rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
        'transition-all duration-200',
        hover && 'hover:shadow-md',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;