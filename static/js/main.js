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
