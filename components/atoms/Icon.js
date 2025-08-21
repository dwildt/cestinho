class Icon {
  constructor(options = {}) {
    this.name = options.name || ''
    this.emoji = options.emoji || ''
    this.size = options.size || 'medium'
    this.className = options.className || ''
    this.title = options.title || ''
    this.color = options.color || null
  }

  static icons = {
    cart: '🛒',
    add: '➕',
    settings: '⚙️',
    whatsapp: '📲',
    export: '📤',
    import: '📥',
    clipboard: '📋',
    complete: '✅',
    restore: '↩️',
    delete: '🗑️',
    close: '×',
    flag_br: '🇧🇷',
    flag_gb: '🇬🇧',
    flag_es: '🇪🇸',
    status_green: '●',
    status_yellow: '●',
    status_red: '●'
  }

  getSizeClass() {
    const sizes = {
      small: 'icon-small',
      medium: 'icon-medium',
      large: 'icon-large'
    }
    return sizes[this.size] || 'icon-medium'
  }

  getIcon() {
    if (this.emoji) return this.emoji
    if (this.name && Icon.icons[this.name]) return Icon.icons[this.name]
    return this.name
  }

  render() {
    const span = document.createElement('span')

    const classes = [
      'icon',
      this.getSizeClass(),
      this.className
    ].filter(Boolean).join(' ')

    span.className = classes
    span.textContent = this.getIcon()

    if (this.title) span.title = this.title
    if (this.color) span.style.color = this.color

    return span
  }

  static create(options) {
    return new Icon(options).render()
  }
}
