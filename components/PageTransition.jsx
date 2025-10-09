'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './SplashScreen';
import { usePreloader } from './PreloaderContext';
import { useAnimation } from './AnimationContext';

export default function PageTransition({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const { isLoading, stopLoading } = usePreloader();
  const { setIsPageTransitionComplete } = useAnimation();

  useEffect(() => {
    if (isInitialLoad) {
      // Initial load
      setIsPageTransitionComplete(false);
      const timer = setTimeout(() => {
        setShowSplash(false);
        setIsInitialLoad(false);
        setIsPageTransitionComplete(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Route change - show splash immediately when loading starts
      if (isLoading) {
        setIsPageTransitionComplete(false);
        setShowSplash(true);
      }
    }
  }, [isInitialLoad, isLoading, setIsPageTransitionComplete]);

  useEffect(() => {
    if (!isInitialLoad && !isLoading) {
      // Page loaded, hide splash after short delay
      const timer = setTimeout(() => {
        setShowSplash(false);
        setIsPageTransitionComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad, isLoading, setIsPageTransitionComplete]);

  useEffect(() => {
    if (!isInitialLoad) {
      // Stop loading when pathname changes (page loaded)
      stopLoading();
    }
  }, [pathname, isInitialLoad, stopLoading]);

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}