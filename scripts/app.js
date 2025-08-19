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
        // Add item button
        document.getElementById('add-item-btn').addEventListener('click', () => {
            this.openAddItemModal();
        });

        // Add item modal form submission
        document.getElementById('add-item-modal-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItemFromModal();
        });

        // Language change with flag buttons
        document.querySelectorAll('.flag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.changeLanguage(lang);
                
                // Update active flag
                document.querySelectorAll('.flag-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Integrations Modal
        document.getElementById('integrations-button').addEventListener('click', () => {
            this.openIntegrationsModal();
        });

        document.getElementById('close-integrations').addEventListener('click', () => {
            this.closeIntegrationsModal();
        });

        document.getElementById('close-integrations-btn').addEventListener('click', () => {
            this.closeIntegrationsModal();
        });

        // Export/Import
        document.getElementById('export-button').addEventListener('click', () => {
            this.storage.exportData();
        });

        document.getElementById('export-whatsapp').addEventListener('click', () => {
            this.exportToWhatsApp();
        });

        document.getElementById('export-whatsapp-modal').addEventListener('click', () => {
            this.exportToWhatsApp();
        });

        document.getElementById('copy-clipboard').addEventListener('click', () => {
            this.copyToClipboard();
        });

        document.getElementById('import-file').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // Add Item Modal
        document.getElementById('close-add-item').addEventListener('click', () => {
            this.closeAddItemModal();
        });

        document.getElementById('cancel-add-item').addEventListener('click', () => {
            this.closeAddItemModal();
        });

        // Settings Modal
        document.getElementById('settings-button').addEventListener('click', () => {
            this.openSettingsModal();
        });

        document.querySelector('.close').addEventListener('click', () => {
            this.closeSettingsModal();
        });

        document.getElementById('cancel-settings').addEventListener('click', () => {
            this.closeSettingsModal();
        });

        document.getElementById('save-settings').addEventListener('click', () => {
            this.saveSettingsFromModal();
        });

        // Close modals when clicking outside
        document.getElementById('add-item-modal').addEventListener('click', (e) => {
            if (e.target.id === 'add-item-modal') {
                this.closeAddItemModal();
            }
        });

        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') {
                this.closeSettingsModal();
            }
        });

        document.getElementById('integrations-modal').addEventListener('click', (e) => {
            if (e.target.id === 'integrations-modal') {
                this.closeIntegrationsModal();
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAddItemModal();
                this.closeSettingsModal();
                this.closeIntegrationsModal();
            }
        });
    }

    openAddItemModal() {
        // Show modal
        const modal = document.getElementById('add-item-modal');
        modal.classList.add('show');
        
        // Focus on first input
        document.getElementById('modal-item-name').focus();
    }

    closeAddItemModal() {
        const modal = document.getElementById('add-item-modal');
        modal.classList.remove('show');
        
        // Clear form
        document.getElementById('add-item-modal-form').reset();
        document.getElementById('modal-item-quantity').value = 1;
        document.getElementById('modal-item-weight').value = 1;
    }

    openIntegrationsModal() {
        const modal = document.getElementById('integrations-modal');
        modal.classList.add('show');
    }

    closeIntegrationsModal() {
        const modal = document.getElementById('integrations-modal');
        modal.classList.remove('show');
    }

    addItemFromModal() {
        const name = document.getElementById('modal-item-name').value.trim();
        const quantity = parseInt(document.getElementById('modal-item-quantity').value);
        const weight = parseFloat(document.getElementById('modal-item-weight').value);

        if (!name || quantity <= 0 || weight <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const item = {
            id: this.nextId++,
            name,
            quantity,
            unitWeight: parseFloat(weight.toFixed(2)),
            totalWeight: parseFloat((quantity * weight).toFixed(2)),
            dateAdded: new Date().toISOString()
        };

        this.data.pending.push(item);
        this.saveData();
        this.updateLists();
        this.updateTotals();
        this.updateStatus();

        // Close modal
        this.closeAddItemModal();
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
            list.splice(itemIndex, 1);
            this.saveData();
            this.updateLists();
            this.updateTotals();
            this.updateStatus();
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
                        ${item.quantity} ${this.i18n.get('total-items')} • ${item.unitWeight || item.weight} ${this.i18n.get('total-weight')}/un • Total: ${item.totalWeight || (item.quantity * (item.weight || 0)).toFixed(2)} ${this.i18n.get('total-weight')}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-complete" onclick="app.completeItem(${item.id})" title="${this.i18n.get('complete-button')}">
                        ✅
                    </button>
                    <button class="btn-delete" onclick="app.deleteItem(${item.id})" title="${this.i18n.get('delete-button')}">
                        🗑️
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
                        ${item.quantity} ${this.i18n.get('total-items')} • ${item.unitWeight || item.weight} ${this.i18n.get('total-weight')}/un • Total: ${item.totalWeight || (item.quantity * (item.weight || 0)).toFixed(2)} ${this.i18n.get('total-weight')}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-restore" onclick="app.restoreItem(${item.id})" title="${this.i18n.get('restore-button')}">
                        ↩️
                    </button>
                    <button class="btn-delete" onclick="app.deleteItem(${item.id}, true)" title="${this.i18n.get('delete-button')}">
                        🗑️
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    updateTotals() {
        // Pending totals
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + (item.totalWeight || (item.quantity * (item.weight || 0))), 0);

        document.getElementById('total-items').textContent = 
            `${totalItems} ${this.i18n.get('total-items')}`;
        document.getElementById('total-weight').textContent = 
            `${totalWeight.toFixed(1)} ${this.i18n.get('total-weight')}`;

        // Completed totals
        const completedItems = this.data.completed.reduce((sum, item) => sum + item.quantity, 0);
        const completedWeight = this.data.completed.reduce((sum, item) => sum + (item.totalWeight || (item.quantity * (item.weight || item.unitWeight || 0))), 0);

        document.getElementById('completed-total-items').textContent = 
            `${completedItems} ${this.i18n.get('total-items')}`;
        document.getElementById('completed-total-weight').textContent = 
            `${completedWeight.toFixed(1)} ${this.i18n.get('total-weight')}`;
    }

    updateStatus() {
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + (item.totalWeight || (item.quantity * (item.weight || 0))), 0);

        const statusIcon = document.getElementById('status-icon');
        
        // Remove existing status classes
        statusIcon.classList.remove('warning', 'danger');

        // Check limits
        const itemsExceeded = totalItems > this.settings.maxItems;
        const weightExceeded = totalWeight > this.settings.maxWeight;
        const itemsDoubleExceeded = totalItems > (this.settings.maxItems * 2);
        const weightDoubleExceeded = totalWeight > (this.settings.maxWeight * 2);

        if (itemsDoubleExceeded || weightDoubleExceeded) {
            statusIcon.classList.add('danger');
            statusIcon.title = this.i18n.get('status-danger');
        } else if (itemsExceeded || weightExceeded) {
            statusIcon.classList.add('warning');
            statusIcon.title = this.i18n.get('status-warning');
        } else {
            statusIcon.title = this.i18n.get('status-normal');
        }
    }

    updateSettingsUI() {
        // Update modal inputs - check if elements exist
        const maxItemsEl = document.getElementById('modal-max-items');
        const maxWeightEl = document.getElementById('modal-max-weight');
        
        if (maxItemsEl) {
            maxItemsEl.value = this.settings.maxItems;
        }
        if (maxWeightEl) {
            maxWeightEl.value = this.settings.maxWeight;
        }
        
        // Update active flag button
        document.querySelectorAll('.flag-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.settings.language) {
                btn.classList.add('active');
            }
        });
    }

    openSettingsModal() {
        // Update modal values with current settings
        document.getElementById('modal-max-items').value = this.settings.maxItems;
        document.getElementById('modal-max-weight').value = this.settings.maxWeight;
        
        // Show modal
        const modal = document.getElementById('settings-modal');
        modal.classList.add('show');
        
        // Focus on first input
        document.getElementById('modal-max-items').focus();
    }

    closeSettingsModal() {
        const modal = document.getElementById('settings-modal');
        modal.classList.remove('show');
    }

    saveSettingsFromModal() {
        const maxItems = parseInt(document.getElementById('modal-max-items').value);
        const maxWeight = parseFloat(document.getElementById('modal-max-weight').value);

        // Validate inputs
        if (maxItems < 1 || maxWeight < 0.1) {
            alert('Por favor, insira valores válidos.');
            return;
        }

        // Update settings
        this.settings.maxItems = maxItems;
        this.settings.maxWeight = maxWeight;
        
        // Save and update UI
        this.saveSettings();
        this.updateStatus();
        this.closeSettingsModal();
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

    exportToWhatsApp() {
        if (this.data.pending.length === 0) {
            alert('Lista vazia! Adicione alguns itens antes de exportar.');
            return;
        }

        // Calculate totals
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + (item.totalWeight || (item.quantity * (item.weight || 0))), 0);

        // Get current language texts
        const texts = {
            pt: {
                title: 'Lista de Compras - Cestinho',
                items: 'itens',
                weight: 'kg',
                total: 'Total',
                footer: 'Lista criada com Cestinho'
            },
            en: {
                title: 'Shopping List - Little Basket',
                items: 'items',
                weight: 'kg',
                total: 'Total',
                footer: 'List created with Little Basket'
            },
            es: {
                title: 'Lista de Compras - Cestita',
                items: 'artículos',
                weight: 'kg',
                total: 'Total',
                footer: 'Lista creada con Cestita'
            }
        };

        const lang = this.settings.language;
        const t = texts[lang] || texts.pt;

        // Build WhatsApp message
        let message = `${t.title}\n\n`;
        
        this.data.pending.forEach((item) => {
            const unitWeight = item.unitWeight || item.weight || 0;
            const totalWeight = item.totalWeight || (item.quantity * unitWeight);
            message += `- ${item.quantity}x ${item.name} (${unitWeight} ${t.weight}/un = ${totalWeight.toFixed(2)} ${t.weight})\n`;
        });

        message += `\n${t.total}: ${totalItems} ${t.items} | ${totalWeight.toFixed(1)} ${t.weight}\n\n`;
        message += `${t.footer}`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        // Open WhatsApp (works on mobile and desktop)
        window.open(whatsappUrl, '_blank');
    }

    copyToClipboard() {
        if (this.data.pending.length === 0) {
            alert('Lista vazia! Adicione alguns itens antes de copiar.');
            return;
        }

        // Calculate totals
        const totalItems = this.data.pending.reduce((sum, item) => sum + item.quantity, 0);
        const totalWeight = this.data.pending.reduce((sum, item) => sum + (item.totalWeight || (item.quantity * (item.weight || 0))), 0);

        // Get current language texts
        const texts = {
            pt: {
                title: 'Lista de Compras - Cestinho',
                items: 'itens',
                weight: 'kg',
                total: 'Total',
                footer: 'Lista criada com Cestinho'
            },
            en: {
                title: 'Shopping List - Little Basket',
                items: 'items',
                weight: 'kg',
                total: 'Total',
                footer: 'List created with Little Basket'
            },
            es: {
                title: 'Lista de Compras - Cestita',
                items: 'artículos',
                weight: 'kg',
                total: 'Total',
                footer: 'Lista creada con Cestita'
            }
        };

        const lang = this.settings.language;
        const t = texts[lang] || texts.pt;

        // Build message
        let message = `${t.title}\n\n`;
        
        this.data.pending.forEach((item) => {
            const unitWeight = item.unitWeight || item.weight || 0;
            const totalWeight = item.totalWeight || (item.quantity * unitWeight);
            message += `- ${item.quantity}x ${item.name} (${unitWeight} ${t.weight}/un = ${totalWeight.toFixed(2)} ${t.weight})\n`;
        });

        message += `\n${t.total}: ${totalItems} ${t.items} | ${totalWeight.toFixed(1)} ${t.weight}\n\n`;
        message += `${t.footer}`;

        // Copy to clipboard
        navigator.clipboard.writeText(message).then(() => {
            alert('Lista copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Erro ao copiar para a área de transferência.');
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ShoppingListApp();
});