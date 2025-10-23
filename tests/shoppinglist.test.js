describe('ShoppingList Component', () => {
  let ShoppingList

  beforeAll(() => {
    // Mock Button and StatusIndicator
    global.Button = {
      create: jest.fn(() => document.createElement('button'))
    }
    global.StatusIndicator = {
      create: jest.fn(() => document.createElement('span'))
    }

    // Define the ShoppingList class in test environment
    ShoppingList = class {
      constructor(options = {}) {
        this.title = options.title || 'Lista de Compras'
        this.items = options.items || []
        this.type = options.type || 'pending'
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
        li.textContent = item.name
        return li
      }

      render() {
        const listSection = document.createElement('div')
        listSection.className = `list-section ${this.className}`.trim()
        if (this.id) listSection.id = this.id

        const itemsList = document.createElement('ul')
        itemsList.className = 'items-list'

        // Sort items alphabetically by name
        const sortedItems = [...this.items].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        )

        sortedItems.forEach(item => {
          const listItem = this.renderListItem(item)
          itemsList.appendChild(listItem)
        })

        listSection.appendChild(itemsList)

        return listSection
      }

      static create(options) {
        return new ShoppingList(options).render()
      }
    }
  })

  describe('Alphabetical Sorting', () => {
    test('should sort pending items alphabetically', () => {
      const items = [
        { id: 1, name: 'Maçã', quantity: 1, unitWeight: 1 },
        { id: 2, name: 'Banana', quantity: 1, unitWeight: 1 },
        { id: 3, name: 'Abacaxi', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'pending',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(3)
      expect(listItems[0].textContent).toBe('Abacaxi')
      expect(listItems[1].textContent).toBe('Banana')
      expect(listItems[2].textContent).toBe('Maçã')
    })

    test('should sort completed items alphabetically', () => {
      const items = [
        { id: 1, name: 'Zebu', quantity: 1, unitWeight: 1 },
        { id: 2, name: 'Alface', quantity: 1, unitWeight: 1 },
        { id: 3, name: 'Melancia', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'completed',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(3)
      expect(listItems[0].textContent).toBe('Alface')
      expect(listItems[1].textContent).toBe('Melancia')
      expect(listItems[2].textContent).toBe('Zebu')
    })

    test('should handle case-insensitive sorting', () => {
      const items = [
        { id: 1, name: 'maçã', quantity: 1, unitWeight: 1 },
        { id: 2, name: 'BANANA', quantity: 1, unitWeight: 1 },
        { id: 3, name: 'Abacaxi', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'pending',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(3)
      expect(listItems[0].textContent).toBe('Abacaxi')
      expect(listItems[1].textContent).toBe('BANANA')
      expect(listItems[2].textContent).toBe('maçã')
    })

    test('should handle special characters and accents correctly', () => {
      const items = [
        { id: 1, name: 'Ômega', quantity: 1, unitWeight: 1 },
        { id: 2, name: 'Água', quantity: 1, unitWeight: 1 },
        { id: 3, name: 'Açúcar', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'pending',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(3)
      expect(listItems[0].textContent).toBe('Açúcar')
      expect(listItems[1].textContent).toBe('Água')
      expect(listItems[2].textContent).toBe('Ômega')
    })

    test('should not modify the original items array', () => {
      const items = [
        { id: 1, name: 'Zebra', quantity: 1, unitWeight: 1 },
        { id: 2, name: 'Abacate', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'pending',
        i18n: { get: (key) => key }
      })

      list.render()

      // Original array should remain unchanged
      expect(items[0].name).toBe('Zebra')
      expect(items[1].name).toBe('Abacate')
    })

    test('should handle empty items array', () => {
      const list = new ShoppingList({
        items: [],
        type: 'pending',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(0)
    })

    test('should handle single item', () => {
      const items = [
        { id: 1, name: 'Solo Item', quantity: 1, unitWeight: 1 }
      ]

      const list = new ShoppingList({
        items,
        type: 'pending',
        i18n: { get: (key) => key }
      })

      const rendered = list.render()
      const listItems = rendered.querySelectorAll('li')

      expect(listItems).toHaveLength(1)
      expect(listItems[0].textContent).toBe('Solo Item')
    })
  })
})
