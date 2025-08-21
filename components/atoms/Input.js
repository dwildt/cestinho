class Input {
  constructor(options = {}) {
    this.type = options.type || 'text'
    this.value = options.value || ''
    this.placeholder = options.placeholder || ''
    this.required = options.required || false
    this.disabled = options.disabled || false
    this.min = options.min || null
    this.max = options.max || null
    this.step = options.step || null
    this.className = options.className || ''
    this.id = options.id || ''
    this.name = options.name || ''
    this.onChange = options.onChange || (() => {})
    this.onInput = options.onInput || (() => {})
    this.onFocus = options.onFocus || (() => {})
    this.onBlur = options.onBlur || (() => {})
  }

  render() {
    const input = document.createElement('input')

    input.type = this.type
    input.value = this.value
    input.placeholder = this.placeholder
    input.required = this.required
    input.disabled = this.disabled
    input.className = this.className

    if (this.id) input.id = this.id
    if (this.name) input.name = this.name
    if (this.min !== null) input.min = this.min
    if (this.max !== null) input.max = this.max
    if (this.step !== null) input.step = this.step

    input.addEventListener('change', this.onChange)
    input.addEventListener('input', this.onInput)
    input.addEventListener('focus', this.onFocus)
    input.addEventListener('blur', this.onBlur)

    return input
  }

  static create(options) {
    return new Input(options).render()
  }
}
