class AppCarousel extends HTMLElement {
  constructor() {
    super();
    // Default properties
    this._theme = 'linear';
    this._itemsToShow = 3;
    this._currentIndex = 0;
    this._isDragging = false;
    this._startX = 0;
    this._currentX = 0;
    this._angle = 45;
    this._rotationAxis = 'y';

    // Bind event handlers
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onPrevClick = this._onPrevClick.bind(this);
    this._onNextClick = this._onNextClick.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onSlotChange = this._onSlotChange.bind(this);
  }

  connectedCallback() {
    // Get attributes or use defaults
    this._theme = this.getAttribute('theme') || 'linear';
    this._itemsToShow = parseInt(this.getAttribute('items-to-show')) || 3;
    this._angle = parseInt(this.getAttribute('angle')) || 45;
    this._rotationAxis = this.getAttribute('rotation-axis') || 'y';

    this.render();
    this._setupEventListeners();

    // Initial update after DOM is ready
    setTimeout(() => {
      this._updateCarousel();
    }, 0);

    // Handle window resize
    window.addEventListener('resize', this._onResize);
  }

  disconnectedCallback() {
    this._removeEventListeners();
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    // Only render once
    if (this._rendered) return;
    this._rendered = true;

    // Save and move children into slot container
    const slot = document.createElement('div');
    slot.className = 'carousel-slot';
    while (this.firstChild) {
      slot.appendChild(this.firstChild);
    }

    // Build structure
    this.innerHTML = `
      <div class="carousel-container">
        <div class="carousel-stage">
          <div class="carousel-track"></div>
        </div>
        <button class="nav-button prev" aria-label="Previous">&#10094;</button>
        <button class="nav-button next" aria-label="Next">&#10095;</button>
      </div>
    `;
    // Insert slot content into track
    this.querySelector('.carousel-track').appendChild(slot);

    // Set CSS variable for items to show
    this.style.setProperty('--items-to-show', this._itemsToShow);
  }

  _setupEventListeners() {
    const track = this.querySelector('.carousel-track');
    const prevButton = this.querySelector('.nav-button.prev');
    const nextButton = this.querySelector('.nav-button.next');
    const slot = this.querySelector('.carousel-slot');

    // Drag events
    track.addEventListener('mousedown', this._onDragStart);
    track.addEventListener('touchstart', this._onDragStart, { passive: true });

    // Navigation buttons
    prevButton.addEventListener('click', this._onPrevClick);
    nextButton.addEventListener('click', this._onNextClick);

    // Slot change (if you dynamically add/remove items)
    const observer = new MutationObserver(this._onSlotChange);
    observer.observe(slot, { childList: true });
    this._slotObserver = observer;
  }

  _removeEventListeners() {
    const track = this.querySelector('.carousel-track');
    const prevButton = this.querySelector('.nav-button.prev');
    const nextButton = this.querySelector('.nav-button.next');
    const slot = this.querySelector('.carousel-slot');

    track.removeEventListener('mousedown', this._onDragStart);
    track.removeEventListener('touchstart', this._onDragStart);
    window.removeEventListener('mousemove', this._onDragMove);
    window.removeEventListener('touchmove', this._onDragMove);
    window.removeEventListener('mouseup', this._onDragEnd);
    window.removeEventListener('touchend', this._onDragEnd);

    prevButton.removeEventListener('click', this._onPrevClick);
    nextButton.removeEventListener('click', this._onNextClick);

    if (this._slotObserver) this._slotObserver.disconnect();
  }

  _onSlotChange() {
    this._updateCarousel();
  }

  _onResize() {
    this._updateCarousel();
  }

  _onPrevClick() {
    if (this._currentIndex > 0) {
      this._currentIndex--;
      this._updateCarousel(true);
    }
  }

  _onNextClick() {
    const items = this._getItems();
    const maxIndex = Math.max(0, items.length - this._itemsToShow);

    if (this._currentIndex < maxIndex) {
      this._currentIndex++;
      this._updateCarousel(true);
    }
  }

  _onDragStart(e) {
    this._isDragging = true;
    this._startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this._currentX = this._startX;

    const track = this.querySelector('.carousel-track');
    track.classList.add('dragging');

    window.addEventListener('mousemove', this._onDragMove);
    window.addEventListener('touchmove', this._onDragMove, { passive: true });
    window.addEventListener('mouseup', this._onDragEnd);
    window.addEventListener('touchend', this._onDragEnd);

    if (e.type.includes('mouse')) {
      e.preventDefault();
    }
  }

  _onDragMove(e) {
    if (!this._isDragging) return;

    this._currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const dragDist = this._startX - this._currentX;

    const items = this._getItems();
    if (items.length === 0) return;

    const itemWidth = items[0].offsetWidth;
    const indexChange = dragDist / itemWidth;
    let newIndex = this._currentIndex + indexChange;

    const maxIndex = Math.max(0, items.length - this._itemsToShow);
    newIndex = Math.max(0, Math.min(newIndex, maxIndex));

    const translateX = -(newIndex * (100 / this._itemsToShow));
    const track = this.querySelector('.carousel-track');
    track.style.transform = `translateX(${translateX}%)`;

    this._applyItemTransforms(items, newIndex);
  }

  _onDragEnd() {
    if (!this._isDragging) return;
    this._isDragging = false;

    const track = this.querySelector('.carousel-track');
    track.classList.remove('dragging');

    const transform = track.style.transform || 'translateX(0%)';
    const translateX = parseFloat(transform.replace('translateX(', '').replace('%)', ''));

    const newIndex = Math.round(-translateX / (100 / this._itemsToShow));

    const items = this._getItems();
    const maxIndex = Math.max(0, items.length - this._itemsToShow);
    this._currentIndex = Math.max(0, Math.min(newIndex, maxIndex));

    this._updateCarousel(true);

    window.removeEventListener('mousemove', this._onDragMove);
    window.removeEventListener('touchmove', this._onDragMove);
    window.removeEventListener('mouseup', this._onDragEnd);
    window.removeEventListener('touchend', this._onDragEnd);
  }

  _getItems() {
    const slot = this.querySelector('.carousel-slot');
    return slot ? Array.from(slot.children) : [];
  }

  _updateCarousel(animate = true) {
    this.style.setProperty('--items-to-show', this._itemsToShow);

    const track = this.querySelector('.carousel-track');
    const items = this._getItems();

    if (items.length === 0) return;

    track.style.transition = animate ? 'transform 0.3s ease' : 'none';

    const translateX = -(this._currentIndex * (100 / this._itemsToShow));
    track.style.transform = `translateX(${translateX}%)`;

    this._applyItemTransforms(items, this._currentIndex);

    this._updateNavButtons();

    const stage = this.querySelector('.carousel-stage');
    stage.style.perspective = this._theme === 'carousel' ? '1200px' : 'none';
  }

  _applyItemTransforms(items, currentIndex) {
    const centerIndex = currentIndex + (this._itemsToShow / 2) - 0.5;

    items.forEach((item, index) => {
      const distanceFromCenter = index - centerIndex;

      switch (this._theme) {
        case 'linear':
          item.style.transform = '';
          item.style.zIndex = '';
          break;

        case 'spotlight':
          const scale = Math.max(0.7, 1 - Math.abs(distanceFromCenter) * 0.15);
          item.style.transform = `scale(${scale})`;
          item.style.zIndex = 1000 - Math.abs(Math.round(distanceFromCenter * 100));
          break;

        case 'carousel':
          const carouselScale = Math.max(0.7, 1 - Math.abs(distanceFromCenter) * 0.15);
          const rotationAngle = distanceFromCenter * this._angle;
          const axis = this._rotationAxis.toLowerCase() === 'x' ? 'X' : 'Y';

          item.style.transform = `rotate${axis}(${rotationAngle}deg) scale(${carouselScale})`;
          item.style.zIndex = 1000 - Math.abs(Math.round(rotationAngle));
          break;
      }
    });
  }

  _updateNavButtons() {
    const prevButton = this.querySelector('.nav-button.prev');
    const nextButton = this.querySelector('.nav-button.next');
    const items = this._getItems();

    const maxIndex = Math.max(0, items.length - this._itemsToShow);

    prevButton.disabled = this._currentIndex <= 0;
    nextButton.disabled = this._currentIndex >= maxIndex;
  }
}

customElements.define("app-carousel", AppCarousel);
