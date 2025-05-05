function burgerMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerIcon = document.querySelector('.burger-icon');
  if (!burgerMenu || !burgerIcon) return;

  burgerIcon.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && burgerMenu.classList.contains('active')) {
      burgerMenu.classList.remove('active');
    }
  });
}
