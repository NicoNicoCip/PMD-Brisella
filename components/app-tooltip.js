class AppTooltip extends HTMLElement {
  constructor() {
    super()
    this._enterTimeout = null
    this._tooltip = null
    
    // Bind event handlers to maintain context
    this._handleMouseEnter = this._handleMouseEnter.bind(this)
    this._handleMouseLeave = this._handleMouseLeave.bind(this)
    this._handleFocus = this._handleFocus.bind(this)
    this._handleBlur = this._handleBlur.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  connectedCallback() {
    this.style.position = "relative"
    
    // Create tooltip element
    this._createTooltip()
    
    // Add event listeners
    this.addEventListener("mouseenter", this._handleMouseEnter)
    this.addEventListener("mouseleave", this._handleMouseLeave)
    this.addEventListener("focus", this._handleFocus)
    this.addEventListener("blur", this._handleBlur)
    this.addEventListener("keydown", this._handleKeyDown)
    
    // Make element focusable if it isn't already
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }
  }
  
  disconnectedCallback() {
    // Clean up event listeners when the element is removed
    this.removeEventListener("mouseenter", this._handleMouseEnter)
    this.removeEventListener("mouseleave", this._handleMouseLeave)
    this.removeEventListener("focus", this._handleFocus)
    this.removeEventListener("blur", this._handleBlur)
    this.removeEventListener("keydown", this._handleKeyDown)
    
    // Clear any pending timeouts
    if (this._enterTimeout) {
      clearTimeout(this._enterTimeout)
      this._enterTimeout = null
    }
  }
  
  _createTooltip() {
    if (!this._tooltip) {
      this._tooltip = document.createElement("div")
      this._tooltip.className = "tbubble"
      
      // Set ARIA attributes for accessibility
      this._tooltip.setAttribute("role", "tooltip")
      this._tooltip.id = `tooltip-${Math.random().toString(36).substr(2, 9)}`
      this.setAttribute("aria-describedby", this._tooltip.id)
      
      // Get tooltip content - check for HTML content first
      if (this.hasAttribute("html-content")) {
        this._tooltip.innerHTML = this.getAttribute("html-content")
      } else {
        this._tooltip.innerText = this.getAttribute("data") || ''
      }
      
      this._tooltip.style.cssText = `
        position: absolute
        top: 0
        left: 0
        opacity: 0
        pointer-events: none
        transition: opacity 0.2s ease
        z-index: 9999
      `
      this.appendChild(this._tooltip)
    }
  }
  
  _handleMouseEnter() {
    this._showTooltip()
  }
  
  _handleMouseLeave() {
    this._hideTooltip()
  }
  
  _handleFocus() {
    this._showTooltip()
  }
  
  _handleBlur() {
    this._hideTooltip()
  }
  
  _handleKeyDown(event) {
    // Hide tooltip on Escape key
    if (event.key === "Escape" && this._tooltip.style.opacity === "1") {
      this._hideTooltip()
    }
  }
  
  _showTooltip() {
    const delay = parseInt(this.getAttribute("delay") || "400", 10)
    
    if (this._enterTimeout) {
      clearTimeout(this._enterTimeout)
    }
    
    this._enterTimeout = setTimeout(() => {
      this._tooltip.style.opacity = "1"
      this._tooltip.style.pointerEvents = "auto"
      this._positionTooltip()
    }, delay)
  }
  
  _hideTooltip() {
    if (this._enterTimeout) {
      clearTimeout(this._enterTimeout)
      this._enterTimeout = null
    }
    
    this._tooltip.style.opacity = "0"
    this._tooltip.style.pointerEvents = "none"
  }
  
  _positionTooltip() {
    const vOffset = parseInt(this.getAttribute("v-offset") || "6", 10)
    
    // Get element and tooltip positions
    const rect = this.getBoundingClientRect()
    const tipRect = this._tooltip.getBoundingClientRect()
    
    // Initialize top and left positions (relative to the AppTooltip element)
    let top = this.offsetHeight + vOffset
    let left = (this.offsetWidth - tipRect.width) / 2
    
    // Check if tooltip would go beyond right edge of window
    if (rect.left + left + tipRect.width > window.innerWidth - 8) {
      left = window.innerWidth - 8 - rect.left - tipRect.width
    }
    
    // Check if tooltip would go beyond left edge of window
    if (rect.left + left < 8) {
      left = 8 - rect.left
    }
    
    // Check if tooltip would go beyond bottom of window
    const spaceBelow = window.innerHeight - rect.bottom
    if (spaceBelow < tipRect.height + vOffset) {
      // Place tooltip above the element
      top = -tipRect.height - vOffset
    }
    
    // Apply position with a class indicating position (for styling)
    this._tooltip.style.top = `${top}px`
    this._tooltip.style.left = `${left}px`
    
    // Add class indicating whether tooltip is above or below
    if (top < 0) {
      this._tooltip.classList.add("tooltip-above")
      this._tooltip.classList.remove("tooltip-below")
    } else {
      this._tooltip.classList.add("tooltip-below")
      this._tooltip.classList.remove("tooltip-above")
    }
  }
  
  // Getters and setters for tooltip content
  get content() {
    return this.getAttribute("data") || ''
  }
  
  set content(value) {
    this.setAttribute("data", value)
    if (this._tooltip) {
      this._tooltip.innerText = value
    }
  }
  
  get htmlContent() {
    return this.getAttribute("html-content") || ''
  }
  
  set htmlContent(value) {
    this.setAttribute("html-content", value)
    if (this._tooltip) {
      this._tooltip.innerHTML = value
    }
  }
  
  // Observer for attribute changes
  static get observedAttributes() {
    return ["data", "html-content", "delay", "v-offset"]
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._tooltip) return
    
    if (name === "data" && !this.hasAttribute("html-content")) {
      this._tooltip.innerText = newValue || ''
    } else if (name === "html-content") {
      this._tooltip.innerHTML = newValue || ''
    }
  }
}

customElements.define("app-tooltip", AppTooltip)