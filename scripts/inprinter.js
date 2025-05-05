//@ts-check

function inprint() {
  const htmlLoaders = document.querySelectorAll('[id$=".html"]')
  let loaded = 0


  htmlLoaders.forEach((el) => {
    const file = el.id
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${file}`)
        return res.text()
      })
      .then(html => {
        el.innerHTML = html;
        if (typeof reinitializeDynamicUI === "function") {
          reinitializeDynamicUI();
        }
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Error loading "${file}"</p>`
      })
      .finally(() => {
        loaded++
      });
  });
}

function reinitializeDynamicUI() {
  burgerMenu();
  iconTooltips();
}
