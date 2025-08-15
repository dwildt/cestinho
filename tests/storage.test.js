describe('Storage Class', () => {
    let CestinhoStorage;
    let storage;

    beforeAll(() => {
        // Define the Storage class in test environment
        CestinhoStorage = class {
            constructor() {
                this.STORAGE_KEY = 'cestinho-data';
                this.SETTINGS_KEY = 'cestinho-settings';
            }

            saveData(data) {
                try {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
                    return true;
                } catch (error) {
                    console.error('Error saving data:', error);
                    return false;
                }
            }

            loadData() {
                try {
                    const data = localStorage.getItem(this.STORAGE_KEY);
                    return data ? JSON.parse(data) : { pending: [], completed: [] };
                } catch (error) {
                    console.error('Error loading data:', error);
                    return { pending: [], completed: [] };
                }
            }

            saveSettings(settings) {
                try {
                    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
                    return true;
                } catch (error) {
                    console.error('Error saving settings:', error);
                    return false;
                }
            }

            loadSettings() {
                try {
                    const settings = localStorage.getItem(this.SETTINGS_KEY);
                    return settings ? JSON.parse(settings) : { 
                        maxItems: 10, 
                        maxWeight: 15.0, 
                        language: 'pt' 
                    };
                } catch (error) {
                    console.error('Error loading settings:', error);
                    return { maxItems: 10, maxWeight: 15.0, language: 'pt' };
                }
            }

            clearAllData() {
                localStorage.removeItem(this.STORAGE_KEY);
                localStorage.removeItem(this.SETTINGS_KEY);
            }
        };
    });

    beforeEach(() => {
        storage = new CestinhoStorage();
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('Data Management', () => {
        test('should save and load data correctly', () => {
            const testData = {
                pending: [
                    { id: 1, name: 'Leite', quantity: 2, weight: 2.0 }
                ],
                completed: [
                    { id: 2, name: 'Pão', quantity: 1, weight: 0.5 }
                ]
            };

            const result = storage.saveData(testData);
            expect(result).toBe(true);
            
            const loadedData = storage.loadData();
            expect(loadedData).toEqual(testData);
        });

        test('should return default data when no data exists', () => {
            const result = storage.loadData();
            expect(result).toEqual({ pending: [], completed: [] });
        });

        test('should handle corrupted data gracefully', () => {
            localStorage.setItem('cestinho-data', 'invalid json');
            console.error = jest.fn();
            
            const result = storage.loadData();
            expect(result).toEqual({ pending: [], completed: [] });
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('Settings Management', () => {
        test('should save and load settings correctly', () => {
            const testSettings = {
                maxItems: 15,
                maxWeight: 20.0,
                language: 'en'
            };

            const result = storage.saveSettings(testSettings);
            expect(result).toBe(true);
            
            const loadedSettings = storage.loadSettings();
            expect(loadedSettings).toEqual(testSettings);
        });

        test('should return default settings when no settings exist', () => {
            const result = storage.loadSettings();
            expect(result).toEqual({
                maxItems: 10,
                maxWeight: 15.0,
                language: 'pt'
            });
        });

        test('should handle corrupted settings gracefully', () => {
            localStorage.setItem('cestinho-settings', 'invalid json');
            console.error = jest.fn();
            
            const result = storage.loadSettings();
            expect(result).toEqual({
                maxItems: 10,
                maxWeight: 15.0,
                language: 'pt'
            });
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('Clear Data', () => {
        test('should clear all data from localStorage', () => {
            localStorage.setItem('cestinho-data', '{}');
            localStorage.setItem('cestinho-settings', '{}');
            
            storage.clearAllData();
            
            expect(localStorage.getItem('cestinho-data')).toBeNull();
            expect(localStorage.getItem('cestinho-settings')).toBeNull();
        });
    });
});