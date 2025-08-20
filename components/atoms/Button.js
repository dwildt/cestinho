class Button {
    constructor(options = {}) {
        this.text = options.text || '';
        this.type = options.type || 'button';
        this.variant = options.variant || 'primary';
        this.size = options.size || 'medium';
        this.icon = options.icon || null;
        this.onClick = options.onClick || (() => {});
        this.className = options.className || '';
        this.disabled = options.disabled || false;
        this.title = options.title || '';
        this.id = options.id || '';
    }

    getVariantClass() {
        const variants = {
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            icon: 'settings-button',
            action: 'list-action-btn',
            add: 'add-item-btn',
            integration: 'integration-btn',
            flag: 'flag-btn'
        };
        return variants[this.variant] || 'btn-primary';
    }

    getSizeClass() {
        const sizes = {
            small: 'btn-small',
            medium: 'btn-medium',
            large: 'btn-large'
        };
        return sizes[this.size] || 'btn-medium';
    }

    render() {
        const button = document.createElement('button');
        button.type = this.type;
        
        const classes = [
            this.getVariantClass(),
            this.getSizeClass(),
            this.className
        ].filter(Boolean).join(' ');
        
        button.className = classes;
        
        if (this.id) button.id = this.id;
        if (this.title) button.title = this.title;
        if (this.disabled) button.disabled = this.disabled;
        
        if (this.icon && this.text) {
            button.innerHTML = `<span class="btn-icon">${this.icon}</span><span class="btn-text">${this.text}</span>`;
        } else if (this.icon) {
            button.innerHTML = this.icon;
        } else {
            button.textContent = this.text;
        }
        
        button.addEventListener('click', this.onClick);
        
        return button;
    }

    static create(options) {
        return new Button(options).render();
    }
}