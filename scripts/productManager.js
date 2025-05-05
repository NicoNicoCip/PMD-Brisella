//@ts-check

function loadFromJSON(jsonPath, containerSelector) {
  fetch(jsonPath)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
      return res.json();
    })

    .then((products) => {
      const container = document.querySelector(containerSelector);

      if (!container) return;

      container.innerHTML = products.map((product) => `
        <div class="productCard">
          <a href="${product.href}">
            <img src="${product.img}" alt="${product.alt}">
          </a>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      const container = document.querySelector(containerSelector);
      if (container) container.innerHTML = `<p style="color:red;">Error loading products</p>`;
    });
}

function autoInjectProducts() {
  // Find all elements with id ending in .json
  document.querySelectorAll('[id$=".json"]').forEach(el => {
    const jsonFile = el.id;
    fetch(jsonFile)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${jsonFile}`);
        return res.json();
      })
      .then(products => {
        // Load products from JSON and then shrink-wrap
        loadFromJSON(jsonFile, '#productRack');
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Error loading products</p>`;
      });
  });
}

function shrinkWrapMainProducts() {
  let container = document.getElementById('productRack')
  if(!container) return

  // Reset width to allow wrapping to recalculate
  container.style.width = 'auto';

  let cards = container.querySelectorAll('.productCard');

  // Use the container's offsetLeft as a reference
  let minLeft = Infinity;
  let maxRight = -Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.left < minLeft) minLeft = rect.left;
    if (rect.right > maxRight) maxRight = rect.right;
  });

  // Set the width to the bounding box
  container.style.width = (maxRight - minLeft) + 'px';
}