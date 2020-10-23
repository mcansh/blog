import React from 'react';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scroll = window.pageYOffset;
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
      const minMaxScroll = Math.min(100, Math.max(0, scrollPercent));
      setScrollProgress(minMaxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

export default useScrollProgress;
