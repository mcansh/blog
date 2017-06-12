function headerBlur() {
  const header = document.querySelector('.header__content');
  if (!header) return;
  const scroll = window.pageYOffset;
  const maxMinBlur = Math.min(100, Math.max(0, scroll / 2));
  const blur = `blur(${maxMinBlur}px`;
  header.style.backdropFilter = blur;
  header.style.webkitBackdropFilter = blur;
}

window.addEventListener('scroll', headerBlur);

function youReadThisMuch() {
  const progress = document.querySelector('progress');
  if (!progress) return;
  const scroll = window.pageYOffset; // window.scrollY is less supported
  const bodyHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
  progress.value = scrollPercent;
}

window.addEventListener('scroll', youReadThisMuch);
