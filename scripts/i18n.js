class I18n {
    constructor() {
        this.currentLanguage = 'pt';
        this.translations = {};
        this.supportedLanguages = ['pt', 'en', 'es'];
    }

    async init(language = 'pt') {
        this.currentLanguage = language;
        await this.loadTranslations(language);
        this.updateUI();
    }

    async loadTranslations(language) {
        try {
            const response = await fetch(`locales/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${language} translations`);
            }
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Portuguese if loading fails
            if (language !== 'pt') {
                await this.loadTranslations('pt');
            }
        }
    }

    get(key) {
        return this.translations[key] || key;
    }

    updateUI() {
        // Update all elements with translation keys
        const elementsToTranslate = [
            'app-title', 'max-items-label', 'max-weight-label',
            'item-name-label', 'item-quantity-label', 'item-weight-label',
            'add-button', 'pending-title', 'completed-title',
            'export-button', 'import-button', 'modal-title',
            'modal-max-items-label', 'modal-max-weight-label',
            'modal-max-items-help', 'modal-max-weight-help',
            'save-settings', 'cancel-settings',
            'add-item-modal-title', 'modal-item-name-label', 'modal-item-quantity-label',
            'modal-item-weight-label', 'modal-add-button', 'cancel-add-item'
        ];

        elementsToTranslate.forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = this.get(key);
                } else {
                    element.textContent = this.get(key);
                }
            }
        });

        // Update footer
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.innerHTML = `
                <a href="https://github.com/dwildt/cestinho" target="_blank">${this.get('footer-github')}</a> | 
                <a href="https://github.com/sponsors/dwildt" target="_blank">${this.get('footer-sponsors')}</a> | 
                <span>${this.get('footer-made-with')}</span>
            `;
        }

        // Update language select
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }

        // Update document language
        document.documentElement.lang = this.currentLanguage;
    }

    async changeLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
            await this.init(language);
            return true;
        }
        return false;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}