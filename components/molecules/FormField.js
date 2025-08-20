class FormField {
    constructor(options = {}) {
        this.label = options.label || '';
        this.input = options.input || {};
        this.helpText = options.helpText || '';
        this.required = options.required || false;
        this.className = options.className || '';
        this.id = options.id || '';
    }

    render() {
        const formGroup = document.createElement('div');
        formGroup.className = `form-group ${this.className}`.trim();
        
        if (this.id) formGroup.id = this.id;
        
        if (this.label) {
            const label = document.createElement('label');
            label.textContent = this.label;
            if (this.input.id) label.setAttribute('for', this.input.id);
            if (this.required) {
                const required = document.createElement('span');
                required.textContent = ' *';
                required.style.color = 'red';
                label.appendChild(required);
            }
            formGroup.appendChild(label);
        }
        
        const input = Input.create(this.input);
        formGroup.appendChild(input);
        
        if (this.helpText) {
            const help = document.createElement('small');
            help.textContent = this.helpText;
            help.style.color = '#666';
            help.style.fontSize = '12px';
            help.style.fontStyle = 'italic';
            formGroup.appendChild(help);
        }
        
        return formGroup;
    }

    static create(options) {
        return new FormField(options).render();
    }
}