class Storage {
  constructor() {
    this.STORAGE_KEY = 'cestinho-data'
    this.SETTINGS_KEY = 'cestinho-settings'
  }

  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Error saving data:', error)
      return false
    }
  }

  loadData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      return data ? JSON.parse(data) : { pending: [], completed: [] }
    } catch (error) {
      console.error('Error loading data:', error)
      return { pending: [], completed: [] }
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings))
      return true
    } catch (error) {
      console.error('Error saving settings:', error)
      return false
    }
  }

  loadSettings() {
    try {
      const settings = localStorage.getItem(this.SETTINGS_KEY)
      return settings ? JSON.parse(settings) : {
        maxItems: 10,
        maxWeight: 15.0,
        language: 'pt'
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      return { maxItems: 10, maxWeight: 15.0, language: 'pt' }
    }
  }

  exportData() {
    const data = this.loadData()
    const settings = this.loadSettings()
    const exportData = {
      ...data,
      settings,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)],
      { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `cestinho-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)

          // Validate data structure
          if (!importedData.pending || !importedData.completed) {
            throw new Error('Invalid data format')
          }

          // Save data
          const dataToSave = {
            pending: importedData.pending || [],
            completed: importedData.completed || []
          }

          this.saveData(dataToSave)

          // Save settings if present
          if (importedData.settings) {
            this.saveSettings(importedData.settings)
          }

          resolve(dataToSave)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error('Error reading file'))
      reader.readAsText(file)
    })
  }

  clearAllData() {
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.SETTINGS_KEY)
  }
}
