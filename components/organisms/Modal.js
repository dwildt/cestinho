class Modal {
  constructor(options = {}) {
    this.title = options.title || ''
    this.content = options.content || null
    this.footer = options.footer || null
    this.size = options.size || 'medium'
    this.closable = options.closable !== false
    this.onClose = options.onClose || (() => {})
    this.className = options.className || ''
    this.id = options.id || ''
    this.isVisible = false
  }

  getSizeClass() {
    const sizes = {
      small: 'modal-small',
      medium: 'modal-medium',
      large: 'modal-large'
    }
    return sizes[this.size] || 'modal-medium'
  }

  render() {
    const modal = document.createElement('div')
    modal.className = `modal ${this.getSizeClass()} ${this.className}`.trim()
    if (this.id) modal.id = this.id

    const modalContent = document.createElement('div')
    modalContent.className = 'modal-content'

    if (this.title || this.closable) {
      const modalHeader = document.createElement('div')
      modalHeader.className = 'modal-header'

      if (this.title) {
        const titleElement = document.createElement('h2')
        titleElement.textContent = this.title
        modalHeader.appendChild(titleElement)
      }

      if (this.closable) {
        const closeBtn = Button.create({
          variant: 'icon',
          icon: '×',
          className: 'close',
          onClick: () => this.close()
        })
        modalHeader.appendChild(closeBtn)
      }

      modalContent.appendChild(modalHeader)
    }

    if (this.content) {
      const modalBody = document.createElement('div')
      modalBody.className = 'modal-body'

      if (typeof this.content === 'string') {
        modalBody.innerHTML = this.content
      } else if (this.content instanceof HTMLElement) {
        modalBody.appendChild(this.content)
      }

      modalContent.appendChild(modalBody)
    }

    if (this.footer) {
      const modalFooter = document.createElement('div')
      modalFooter.className = 'modal-footer'

      if (typeof this.footer === 'string') {
        modalFooter.innerHTML = this.footer
      } else if (this.footer instanceof HTMLElement) {
        modalFooter.appendChild(this.footer)
      } else if (Array.isArray(this.footer)) {
        this.footer.forEach(item => {
          if (typeof item === 'string') {
            modalFooter.innerHTML += item
          } else if (item instanceof HTMLElement) {
            modalFooter.appendChild(item)
          }
        })
      }

      modalContent.appendChild(modalFooter)
    }

    modal.appendChild(modalContent)

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.close()
      }
    })

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.close()
      }
    })

    return modal
  }

  show() {
    this.isVisible = true
    const modal = this.render()
    modal.classList.add('show')

    // Focus first input if exists
    const firstInput = modal.querySelector('input, textarea, select')
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100)
    }

    return modal
  }

  close() {
    this.isVisible = false
    this.onClose()
    const modal = document.getElementById(this.id)
    if (modal) {
      modal.classList.remove('show')
    }
  }

  static create(options) {
    return new Modal(options)
  }

  static createForm(options = {}) {
    const form = document.createElement('form')
    form.className = 'settings-form'
    if (options.id) form.id = options.id

    if (options.fields) {
      options.fields.forEach(field => {
        const formField = FormField.create(field)
        form.appendChild(formField)
      })
    }

    if (options.onSubmit) {
      form.addEventListener('submit', options.onSubmit)
    }

    return form
  }
}
