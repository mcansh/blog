import React from 'react';

const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scroll = window.pageYOffset;
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = scroll / (bodyHeight - windowHeight);
      const minMaxScroll = Math.min(1, Math.max(0, scrollPercent));
      setScrollProgress(minMaxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollProgress,
    formatted: formatter.format(scrollProgress),
    percent: scrollProgress * 100,
  };
};

export default useScrollProgress;
