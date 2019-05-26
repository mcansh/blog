import React from 'react';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    const scroll = window.pageYOffset; // window.scrollY is less supported
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
    const maxMinscroll = Math.min(100, Math.max(0, scrollPercent));
    setScrollProgress(maxMinscroll);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollProgress;
};

export default useScrollProgress;
