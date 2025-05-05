//@ts-check
function removeLoadingScreen() {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    loader.classList.add('hidden');
    loader.remove();
  }
}
