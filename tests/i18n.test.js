describe('I18n Class', () => {
  let I18n
  let i18n

  beforeAll(() => {
    // Define the I18n class in test environment
    I18n = class {
      constructor() {
        this.currentLanguage = 'pt'
        this.translations = {}
        this.supportedLanguages = ['pt', 'en', 'es']
      }

      async init(language = 'pt') {
        this.currentLanguage = language
        await this.loadTranslations(language)
        this.updateUI()
      }

      async loadTranslations(language) {
        try {
          const response = await fetch(`locales/${language}.json`)
          if (!response.ok) {
            throw new Error(`Failed to load ${language} translations`)
          }
          this.translations = await response.json()
        } catch (error) {
          console.error('Error loading translations:', error)
          if (language !== 'pt') {
            await this.loadTranslations('pt')
          }
        }
      }

      get(key) {
        return this.translations[key] || key
      }

      updateUI() {
        const elementsToTranslate = [
          'app-title', 'max-items-label', 'max-weight-label',
          'item-name-label', 'item-quantity-label', 'item-weight-label',
          'add-button', 'pending-title', 'completed-title',
          'export-button', 'import-button'
        ]

        elementsToTranslate.forEach(key => {
          const element = document.getElementById(key)
          if (element) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
              element.value = this.get(key)
            } else {
              element.textContent = this.get(key)
            }
          }
        })

        const footer = document.querySelector('footer')
        if (footer) {
          footer.innerHTML = `
                        <a href="https://github.com/dwildt/cestinho" target="_blank">${this.get('footer-github')}</a> | 
                        <a href="https://github.com/sponsors/dwildt" target="_blank">${this.get('footer-sponsors')}</a> | 
                        <span>${this.get('footer-made-with')}</span>
                    `
        }

        const languageSelect = document.getElementById('language-select')
        if (languageSelect) {
          languageSelect.value = this.currentLanguage
        }

        document.documentElement.lang = this.currentLanguage
      }

      async changeLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
          await this.init(language)
          return true
        }
        return false
      }

      getCurrentLanguage() {
        return this.currentLanguage
      }
    }
  })

  beforeEach(() => {
    i18n = new I18n()
    jest.clearAllMocks()

    // Mock DOM elements
    document.body.innerHTML = `
            <h1 id="app-title">Test</h1>
            <label id="max-items-label">Test</label>
            <button id="add-button">Test</button>
            <select id="language-select"></select>
            <footer></footer>
        `
  })

  describe('Initialization', () => {
    test('should initialize with default language', () => {
      expect(i18n.currentLanguage).toBe('pt')
      expect(i18n.supportedLanguages).toEqual(['pt', 'en', 'es'])
    })

    test('should load translations for specified language', async () => {
      const mockTranslations = {
        'app-title': 'Test App',
        'max-items-label': 'Max Items'
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTranslations)
      })

      await i18n.init('en')

      expect(fetch).toHaveBeenCalledWith('locales/en.json')
      expect(i18n.currentLanguage).toBe('en')
      expect(i18n.translations).toEqual(mockTranslations)
    })

    test('should fallback to Portuguese on load error', async () => {
      const mockPtTranslations = {
        'app-title': 'Aplicativo Teste'
      }

      fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPtTranslations)
        })

      console.error = jest.fn()

      await i18n.init('invalid')

      expect(fetch).toHaveBeenCalledWith('locales/invalid.json')
      expect(fetch).toHaveBeenCalledWith('locales/pt.json')
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Translation', () => {
    test('should return translation for existing key', () => {
      i18n.translations = { 'test-key': 'Test Value' }

      expect(i18n.get('test-key')).toBe('Test Value')
    })

    test('should return key when translation not found', () => {
      i18n.translations = {}

      expect(i18n.get('non-existent-key')).toBe('non-existent-key')
    })
  })

  describe('UI Updates', () => {
    test('should update UI elements with translations', () => {
      i18n.translations = {
        'app-title': 'Cestinho',
        'max-items-label': 'Máximo de itens:',
        'add-button': 'Adicionar',
        'footer-github': 'GitHub',
        'footer-sponsors': 'Sponsors',
        'footer-made-with': 'Feito com Claude Code'
      }

      i18n.updateUI()

      expect(document.getElementById('app-title').textContent).toBe('Cestinho')
      expect(document.getElementById('max-items-label').textContent).toBe('Máximo de itens:')
      expect(document.getElementById('add-button').textContent).toBe('Adicionar')
    })

    test('should update footer with correct links', () => {
      i18n.translations = {
        'footer-github': 'GitHub',
        'footer-sponsors': 'Sponsors',
        'footer-made-with': 'Made with Claude Code'
      }

      i18n.updateUI()

      const footer = document.querySelector('footer')
      expect(footer.innerHTML).toContain('href="https://github.com/dwildt/cestinho"')
      expect(footer.innerHTML).toContain('href="https://github.com/sponsors/dwildt"')
      expect(footer.innerHTML).toContain('Made with Claude Code')
    })

    test('should update document language', () => {
      i18n.currentLanguage = 'es'
      i18n.updateUI()

      expect(document.documentElement.lang).toBe('es')
    })
  })

  describe('Language Change', () => {
    test('should change to supported language', async () => {
      const mockTranslations = { 'test': 'prueba' }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTranslations)
      })

      const result = await i18n.changeLanguage('es')

      expect(result).toBe(true)
      expect(i18n.currentLanguage).toBe('es')
      expect(fetch).toHaveBeenCalledWith('locales/es.json')
    })

    test('should reject unsupported language', async () => {
      const result = await i18n.changeLanguage('invalid')

      expect(result).toBe(false)
      expect(i18n.currentLanguage).toBe('pt')
    })
  })

  describe('Utility Methods', () => {
    test('should return current language', () => {
      i18n.currentLanguage = 'en'

      expect(i18n.getCurrentLanguage()).toBe('en')
    })
  })
})
