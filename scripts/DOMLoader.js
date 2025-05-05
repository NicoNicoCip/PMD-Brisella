//@ts-check
function includeJs(url) {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', url, false); // <-- the 'false' makes it synchronous
  ajax.onreadystatechange = function () {
    var script = ajax.response || ajax.responseText;
    if (ajax.readyState === 4) {
      switch (ajax.status) {
        case 200:
          eval.apply(window, [script]);
          //console.warn("script loaded: ", url);
          break;
        default:
          console.error("ERROR: script not loaded: ", url);
      }
    }
  };
  ajax.send(null);
}

includeJs("/PMD-Brisella/scripts/burger.js")
includeJs("/PMD-Brisella/scripts/loadingScreen.js")
includeJs("/PMD-Brisella/scripts/inprinter.js")
includeJs("/PMD-Brisella/scripts/productManager.js")
includeJs("/PMD-Brisella/scripts/tooltips.js")

document.addEventListener("DOMContentLoaded", () => {
  burgerMenu()
  iconTooltips()
  
  inprint();
  autoInjectProducts()

  window.addEventListener('resize', shrinkWrapMainProducts)
})

const observer = new MutationObserver((mutations, obs) => {
  // Wait a bit to see if new mutations come in
  // @ts-ignore
  clearTimeout(observer._timeout);
  // @ts-ignore
  observer._timeout = setTimeout(() => {
      obs.disconnect();
      shrinkWrapMainProducts()
      removeLoadingScreen()
  }, 200); // tune this delay
});

observer.observe(document.body, { childList: true, subtree: true });

