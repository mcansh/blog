const header = document.querySelector('.header__content');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', function () {
  const scroll = window.scrollY;
  // const headerOffset = headerHeight - scroll;
  const maxMinBlur = Math.min(100, Math.max(0, scroll / 2));
  const blur = `blur(${maxMinBlur}px`;
  header.style.backdropFilter = blur;
  header.style.webkitBackdropFilter = blur;
});
