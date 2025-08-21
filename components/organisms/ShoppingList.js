class ShoppingList {
  constructor(options = {}) {
    this.title = options.title || 'Lista de Compras'
    this.items = options.items || []
    this.type = options.type || 'pending' // pending or completed
    this.totalItems = options.totalItems || 0
    this.totalWeight = options.totalWeight || 0
    this.status = options.status || 'normal'
    this.statusText = options.statusText || ''
    this.showActions = options.showActions !== false
    this.onItemComplete = options.onItemComplete || (() => {})
    this.onItemRestore = options.onItemRestore || (() => {})
    this.onItemDelete = options.onItemDelete || (() => {})
    this.onAddItem = options.onAddItem || (() => {})
    this.onExportWhatsApp = options.onExportWhatsApp || (() => {})
    this.i18n = options.i18n || { get: (key) => key }
    this.className = options.className || ''
    this.id = options.id || ''
  }

  renderListItem(item) {
    const li = document.createElement('li')
    li.className = `item ${this.type === 'completed' ? 'completed' : ''}`

    const itemInfo = document.createElement('div')
    itemInfo.className = 'item-info'

    const itemName = document.createElement('div')
    itemName.className = 'item-name'
    itemName.textContent = item.name

    const itemDetails = document.createElement('div')
    itemDetails.className = 'item-details'
    const unitWeight = item.unitWeight || item.weight || 0
    const totalWeight = item.totalWeight || (item.quantity * unitWeight)
    itemDetails.textContent = `${item.quantity} ${this.i18n.get('total-items')} • ${unitWeight} ${this.i18n.get('total-weight')}/un • Total: ${totalWeight.toFixed(2)} ${this.i18n.get('total-weight')}`

    itemInfo.appendChild(itemName)
    itemInfo.appendChild(itemDetails)

    const itemActions = document.createElement('div')
    itemActions.className = 'item-actions'

    if (this.type === 'pending') {
      const completeBtn = Button.create({
        variant: 'action',
        icon: '✅',
        title: this.i18n.get('complete-button'),
        onClick: () => this.onItemComplete(item.id)
      })
      itemActions.appendChild(completeBtn)
    } else {
      const restoreBtn = Button.create({
        variant: 'action',
        icon: '↩️',
        title: this.i18n.get('restore-button'),
        onClick: () => this.onItemRestore(item.id)
      })
      itemActions.appendChild(restoreBtn)
    }

    const deleteBtn = Button.create({
      variant: 'action',
      icon: '🗑️',
      title: this.i18n.get('delete-button'),
      onClick: () => this.onItemDelete(item.id, this.type === 'completed')
    })
    itemActions.appendChild(deleteBtn)

    li.appendChild(itemInfo)
    li.appendChild(itemActions)

    return li
  }

  render() {
    const listSection = document.createElement('div')
    listSection.className = `list-section ${this.className}`.trim()
    if (this.id) listSection.id = this.id

    const listHeader = document.createElement('div')
    listHeader.className = 'list-header'

    const titleSection = document.createElement('div')
    titleSection.className = 'list-title-section'

    const titleWithStatus = document.createElement('div')
    titleWithStatus.className = 'title-with-status'

    const title = document.createElement('h2')
    title.textContent = this.title
    titleWithStatus.appendChild(title)

    if (this.type === 'pending' && this.status !== 'normal') {
      const statusIcon = StatusIndicator.create({
        status: this.status,
        showText: false,
        title: this.statusText,
        className: this.status
      })
      titleWithStatus.appendChild(statusIcon)
    }

    const listTotals = document.createElement('div')
    listTotals.className = 'list-totals'
    listTotals.innerHTML = `
            <span>${this.totalItems} ${this.i18n.get('total-items')}</span> | 
            <span>${this.totalWeight.toFixed(1)} ${this.i18n.get('total-weight')}</span>
        `

    titleSection.appendChild(titleWithStatus)
    titleSection.appendChild(listTotals)

    listHeader.appendChild(titleSection)

    if (this.showActions && this.type === 'pending') {
      const listActions = document.createElement('div')
      listActions.className = 'list-actions'

      const whatsappBtn = Button.create({
        variant: 'action',
        icon: '📲',
        title: 'Compartilhar no WhatsApp',
        onClick: this.onExportWhatsApp
      })

      const addBtn = Button.create({
        variant: 'add',
        icon: '➕',
        title: 'Adicionar item',
        onClick: this.onAddItem
      })

      listActions.appendChild(whatsappBtn)
      listActions.appendChild(addBtn)
      listHeader.appendChild(listActions)
    }

    const itemsList = document.createElement('ul')
    itemsList.className = 'items-list'

    this.items.forEach(item => {
      const listItem = this.renderListItem(item)
      itemsList.appendChild(listItem)
    })

    listSection.appendChild(listHeader)
    listSection.appendChild(itemsList)

    return listSection
  }

  static create(options) {
    return new ShoppingList(options).render()
  }
}
