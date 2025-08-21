class Header {
  constructor(options = {}) {
    this.title = options.title || 'Cestinho'
    this.currentLanguage = options.currentLanguage || 'pt'
    this.languages = options.languages || [
      { code: 'pt', flag: '🇧🇷', title: 'Português' },
      { code: 'en', flag: '🇬🇧', title: 'English' },
      { code: 'es', flag: '🇪🇸', title: 'Español' }
    ]
    this.onLanguageChange = options.onLanguageChange || (() => {})
    this.className = options.className || ''
    this.id = options.id || ''
  }

  render() {
    const header = document.createElement('header')
    header.className = this.className
    if (this.id) header.id = this.id

    const titleElement = document.createElement('h1')
    titleElement.id = 'app-title'
    titleElement.textContent = this.title

    const languageSelector = document.createElement('div')
    languageSelector.className = 'language-selector'

    this.languages.forEach(lang => {
      const button = Button.create({
        variant: 'flag',
        icon: lang.flag,
        title: lang.title,
        className: lang.code === this.currentLanguage ? 'active' : '',
        onClick: () => this.onLanguageChange(lang.code)
      })
      button.dataset.lang = lang.code
      languageSelector.appendChild(button)
    })

    header.appendChild(titleElement)
    header.appendChild(languageSelector)

    return header
  }

  static create(options) {
    return new Header(options).render()
  }

  updateActiveLanguage(languageCode) {
    this.currentLanguage = languageCode
    const header = this.render()
    return header
  }
}
