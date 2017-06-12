const header = document.querySelector('.header__content');

function headerBlur() {
  const scroll = window.pageYOffset;
  const maxMinBlur = Math.min(100, Math.max(0, scroll / 2));
  const blur = `blur(${maxMinBlur}px`;
  header.style.backdropFilter = blur;
  header.style.webkitBackdropFilter = blur;
}

window.addEventListener('scroll', headerBlur);
