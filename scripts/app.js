class ShoppingListApp {
    constructor() {
        this.storage = new Storage();
        this.i18n = new I18n();
        this.data = { pending: [], completed: [] };
        this.settings = { maxItems: 10, maxWeight: 15.0, language: 'pt' };
        this.nextId = 1;
        
        this.init();
    }

    async init() {
        // Load data and settings
        this.data = this.storage.loadData();
        this.settings = this.storage.loadSettings();
        
        // Calculate next ID
        const allItems = [...this.data.pending, ...this.data.completed];
        this.nextId = allItems.length > 0 ? Math.max(...allItems.map(item => item.id)) + 1 : 1;
        
        // Initialize i18n
        await this.i18n.init(this.settings.language);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update UI
        this.updateSettingsUI();
        this.updateLists();
        this.updateTotals();
        this.updateStatus();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('add-item-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Language change
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Settings change
        document.getElementById('max-items').addEventListener('change', (e) => {
            this.settings.maxItems = parseInt(e.target.value);
            this.saveSettings();
            this.updateStatus();
        });

        document.getElementById('max-weight').addEventListener('change', (e) => {
            this.settings.maxWeight = parseFloat(e.target.value);
            this.saveSettings();
            this.updateStatus();
        });

        // Export/Import
        document.getElementById('export-button').addEventListener('click', () => {
            this.storage.exportData();
        });

        document.getElementById('import-file').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    addItem() {
        const name = document.getElementById('item-name').value.trim();
        const quantity = parseInt(document.getElementById('item-quantity').value);
        const weight = parseFloat(document.getElementById('item-weight').value);

        if (!name || quantity <= 0 || weight <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const item = {
            id: this.nextId++,
            name,
            quantity,
            weight: parseFloat(weight.toFixed(2)),
            dateAdded: new Date().toISOString()
        };

        this.data.pending.push(item);
        this.saveData();
        this.updateLists();
        this.updateTotals();
        this.updateStatus();

        // Clear form
        document.getElementById('add-item-form').reset();
        document.getElementById('item-quantity').value = 1;
        document.getElementById('item-weight').value = 0.1;
    }

    completeItem(id) {
        const itemIndex = this.data.pending.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const item = this.data.pending.splice(itemIndex, 1)[0];
            item.dateCompleted = new Date().toISOString();
            this.data.completed.push(item);
            
            this.saveData();
            this.updateLists();
            this.updateTotals();
            this.updateStatus();
        }
    }

    restoreItem(id) {
        const itemIndex = this.data.completed.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const item = this.data.completed.splice(itemIndex, 1)[0];
            delete item.dateCompleted;
            this.data.pending.push(item);
            
            this.saveData();
            this.updateLists();
            this.updateTotals();
            this.updateStatus();
        }
    }

    deleteItem(id, fromCompleted = false) {
        const list = fromCompleted ? this.data.completed : this.data.pending;
        const itemIndex = list.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (confirm('Tem certeza que deseja excluir este item?')) {
                list.splice(itemIndex, 1);
                this.saveData();
                this.updateLists();
                this.updateTotals();
                this.updateStatus();
            }
        }
    }

    updateLists() {
        this.updatePendingList();
        this.updateCompletedList();
    }

    updatePendingList() {
        const list = document.getElementById('pending-list');
        list.innerHTML = '';

        this.data.pending.forEach(item => {
            const li = document.createElement('li');
            li.className = 'item';
            li.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">
                        ${item.quantity} ${this.i18n.get('total-items')} • ${item.weight} ${this.i18n.get('total-weight')}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-complete" onclick="app.completeItem(${item.id})">
                        ${this.i18n.get('complete-button')}
                    </button>
                    <button class="btn-delete" onclick="app.deleteItem(${item.id})">
                        ${this.i18n.get('delete-button')}
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    updateCompletedList() {
        const list = document.getElementById('completed-list');
        list.innerHTML = '';

        this.data.completed.forEach(item => {
            const li = document.createElement('li');
            li.className = 'item completed';
            li.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">
                        ${item.quantity} ${this.i18n.get('total-items')} • ${item.weight} ${this.i18n.get('total-weight')}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-restore" onclick="app.restoreItem(${item.id})">
                        ${this.i18n.get('restore-button')}
                    </button>
                    <button class="btn-delete" onclick="app.deleteItem(${item.id}, true)">
                        ${this.i18n.get('delete-button')}
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    updateTotals() {
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + item.weight, 0);

        document.getElementById('total-items').textContent = 
            `${totalItems} ${this.i18n.get('total-items')}`;
        document.getElementById('total-weight').textContent = 
            `${totalWeight.toFixed(1)} ${this.i18n.get('total-weight')}`;
    }

    updateStatus() {
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + item.weight, 0);

        const statusBar = document.querySelector('.status-bar');
        const statusText = document.getElementById('status-text');
        
        // Remove existing status classes
        statusBar.classList.remove('warning', 'danger');

        // Check limits
        const itemsExceeded = totalItems > this.settings.maxItems;
        const weightExceeded = totalWeight > this.settings.maxWeight;
        const itemsDoubleExceeded = totalItems > (this.settings.maxItems * 2);
        const weightDoubleExceeded = totalWeight > (this.settings.maxWeight * 2);

        if (itemsDoubleExceeded || weightDoubleExceeded) {
            statusBar.classList.add('danger');
            statusText.textContent = this.i18n.get('status-danger');
        } else if (itemsExceeded || weightExceeded) {
            statusBar.classList.add('warning');
            statusText.textContent = this.i18n.get('status-warning');
        } else {
            statusText.textContent = this.i18n.get('status-normal');
        }
    }

    updateSettingsUI() {
        document.getElementById('max-items').value = this.settings.maxItems;
        document.getElementById('max-weight').value = this.settings.maxWeight;
        document.getElementById('language-select').value = this.settings.language;
    }

    async changeLanguage(language) {
        this.settings.language = language;
        this.saveSettings();
        await this.i18n.changeLanguage(language);
        this.updateLists();
        this.updateTotals();
        this.updateStatus();
    }

    async importData(file) {
        if (!file) return;

        try {
            const importedData = await this.storage.importData(file);
            this.data = importedData;
            
            // Recalculate next ID
            const allItems = [...this.data.pending, ...this.data.completed];
            this.nextId = allItems.length > 0 ? Math.max(...allItems.map(item => item.id)) + 1 : 1;
            
            // Reload settings and update UI
            this.settings = this.storage.loadSettings();
            await this.i18n.changeLanguage(this.settings.language);
            this.updateSettingsUI();
            this.updateLists();
            this.updateTotals();
            this.updateStatus();
            
            alert('Lista importada com sucesso!');
        } catch (error) {
            console.error('Import error:', error);
            alert('Erro ao importar lista. Verifique se o arquivo é válido.');
        }
        
        // Clear file input
        document.getElementById('import-file').value = '';
    }

    saveData() {
        this.storage.saveData(this.data);
    }

    saveSettings() {
        this.storage.saveSettings(this.settings);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ShoppingListApp();
});