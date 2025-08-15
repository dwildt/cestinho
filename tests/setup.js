// Setup for Jest tests
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Mock FileReader
global.FileReader = class {
    constructor() {
        this.result = null;
        this.onload = null;
        this.onerror = null;
    }
    
    readAsText(file) {
        // Simulate async operation
        setTimeout(() => {
            this.result = file.content || '{}';
            if (this.onload) this.onload({ target: this });
        }, 0);
    }
};

// Mock Blob
global.Blob = class {
    constructor(content, options) {
        this.content = content;
        this.type = options?.type || '';
    }
};