'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useStagger } from './StaggerContainer';
import { useAnimation } from '../AnimationContext';

export default function Heading({black, green, className, delay: customDelay}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { delay: autoDelay } = useStagger();
  const { isPageTransitionComplete } = useAnimation();
  const delay = customDelay !== undefined ? customDelay : autoDelay;

  const shouldAnimate = isInView && isPageTransitionComplete;

  return (
    <motion.h2 
      ref={ref}
      className={`font-normal text-4xl ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: shouldAnimate ? delay : 0, ease: 'easeOut' }}
    >
      <strong className="text-black"> {black} <span className="text-prime">{green}</span></strong>
    </motion.h2>
  )
}
