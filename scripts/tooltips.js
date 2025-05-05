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