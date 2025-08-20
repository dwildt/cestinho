class StatusIndicator {
    constructor(options = {}) {
        this.status = options.status || 'normal'; // normal, warning, danger
        this.text = options.text || '';
        this.icon = options.icon || '●';
        this.showText = options.showText !== false;
        this.className = options.className || '';
        this.id = options.id || '';
        this.title = options.title || '';
    }

    getStatusClass() {
        const statusClasses = {
            normal: 'status-normal',
            warning: 'status-warning warning',
            danger: 'status-danger danger'
        };
        return statusClasses[this.status] || 'status-normal';
    }

    getStatusColor() {
        const colors = {
            normal: '#28a745',
            warning: '#ffc107', 
            danger: '#dc3545'
        };
        return colors[this.status] || colors.normal;
    }

    render() {
        const container = document.createElement('div');
        container.className = `status-indicator ${this.getStatusClass()} ${this.className}`.trim();
        
        if (this.id) container.id = this.id;
        
        const iconElement = Icon.create({
            emoji: this.icon,
            className: 'status-icon',
            color: this.getStatusColor(),
            title: this.title
        });
        
        container.appendChild(iconElement);
        
        if (this.showText && this.text) {
            const textElement = document.createElement('span');
            textElement.className = 'status-text';
            textElement.textContent = this.text;
            container.appendChild(textElement);
        }
        
        return container;
    }

    static create(options) {
        return new StatusIndicator(options).render();
    }

    updateStatus(status, text = '', title = '') {
        this.status = status;
        this.text = text;
        this.title = title;
        return this.render();
    }
}