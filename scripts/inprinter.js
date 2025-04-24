document.addEventListener("DOMContentLoaded", () => {
  let injected = false;
  let fullyLoaded = false;

  fileInjecter(() => {
    injected = true;
    if (fullyLoaded) removeLoadingScreen();
  });

  window.addEventListener('load', () => {
    document.body.classList.add("loaded");
    fullyLoaded = true;
    if (injected) removeLoadingScreen();
  });

  burgerMenu();
  iconTooltips();
  autoInjectProductLists();
  window.addEventListener('resize', shrinkWrapMainProducts);
});


function fileInjecter(callback) {
  const htmlLoaders = document.querySelectorAll('[id$=".html"]');
  let loaded = 0;

  if (htmlLoaders.length === 0) {
    callback?.();
    return;
  }

  htmlLoaders.forEach(el => {
    const file = el.id;
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
        if (typeof reinitializeDynamicUI === "function") {
          reinitializeDynamicUI();
        }
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Error loading "${file}"</p>`;
      })
      .finally(() => {
        loaded++;
        if (loaded === htmlLoaders.length) {
          callback?.();
        }
      });
  });
}

function removeLoadingScreen() {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    loader.classList.add('hidden');
    loader.remove();
  }
}

function iconTooltips() {
  document.querySelectorAll('.icon-tooltip').forEach(el => {
    let tooltip = el.querySelector('.tooltip-bubble');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip-bubble';
      tooltip.innerText = el.getAttribute('data-tooltip') || '';
      el.appendChild(tooltip);
    }

    let enterTimeout = null;

    el.addEventListener('mouseenter', () => {
      // Start a 1 second timer to show the tooltip
      enterTimeout = setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.pointerEvents = 'auto';

        const elRect = el.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();

        let top = el.offsetHeight + 6; // show below
        let left = (el.offsetWidth - tipRect.width) / 2;

        // Adjust if tooltip would go off-screen right
        const parentRight = el.offsetLeft + left + tipRect.width;
        const maxRight = el.offsetParent.offsetWidth - 8;
        if (parentRight > maxRight) {
          left = maxRight - el.offsetLeft - tipRect.width;
        }

        // Adjust if tooltip would go off-screen left
        if (el.offsetLeft + left < 8) {
          left = 8 - el.offsetLeft;
        }

        // If it doesn't fit below, show above
        const spaceBelow = window.innerHeight - elRect.bottom;
        if (spaceBelow < tipRect.height + 12) {
          top = -tipRect.height - 6;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      }, 1000); // 1000ms = 1 second delay
    });

    el.addEventListener('mouseleave', () => {
      // Cancel the timer if mouse leaves before delay
      clearTimeout(enterTimeout);
      enterTimeout = null;
      // Hide tooltip immediately
      tooltip.style.opacity = '0';
      tooltip.style.pointerEvents = 'none';
    });
  });
}


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

function shrinkWrapMainProducts() {
  const container = document.getElementById('productRack');
  if (!container) return;

  // Reset width to allow wrapping to recalculate
  container.style.width = 'auto';

  const cards = container.querySelectorAll('.productCard');
  if (!cards.length) return;

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

function waitForProductImagesThenShrinkWrap() {
  const container = document.getElementById('productRack');
  if (!container) return;
  const images = container.querySelectorAll('img');
  let loaded = 0;
  if (images.length === 0) {
    shrinkWrapMainProducts();
    return;
  }
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) shrinkWrapMainProducts();
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === images.length) shrinkWrapMainProducts();
      });
      img.addEventListener('error', () => {
        loaded++;
        if (loaded === images.length) shrinkWrapMainProducts();
      });
    }
  });
}

function loadProductsFromJSON(jsonPath, containerSelector) {
  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
      return res.json();
    })
    .then(products => {
      const container = document.querySelector(containerSelector);
      if (!container) return;
      container.innerHTML = products.map(product => `
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

function autoInjectProductLists() {
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
        loadProductsFromJSON(jsonFile, '#productRack');
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Error loading products</p>`;
      });
  });
}



function reinitializeDynamicUI() {
  burgerMenu();
  iconTooltips();
  waitForProductImagesThenShrinkWrap();
}
