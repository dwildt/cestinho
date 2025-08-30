# Cestinho - Smart Shopping List

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

Cestinho is a vanilla JavaScript web application - a smart shopping list with multi-language support (Portuguese, English, Spanish), dark mode, and local data persistence. No build process or frameworks required.

## Essential Setup and Build Commands

**Bootstrap the repository:**
```bash
# Install dependencies (3 seconds - includes ESLint, Jest, http-server)
npm install
# TIMEOUT: Set 180 seconds minimum
# NOTE: Cypress binary installation may fail in restricted environments - this is expected
```

**Run the application:**
```bash
# Start development server (2 seconds startup)
npm run dev         # Primary command - serves on http://localhost:3000
npm start          # Alias for npm run dev  
npm run serve      # Alias for npm run dev
# TIMEOUT: Set 60 seconds minimum
# NEVER CANCEL: Server continues running until manually stopped
```

**Code Quality and Testing:**
```bash
# Code linting (1 second - ESLint with vanilla JS rules)
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix linting issues
npm run audit      # Alias for npm run lint

# Unit tests (1 second - Jest with jsdom, 18 tests)
npm test           # Run all unit tests once
npm run test:watch # Run tests in watch mode
# TIMEOUT: Set 60 seconds minimum for test:watch
```

**E2E Tests (Network Dependent):**
```bash
# End-to-end tests (Cypress - may fail in restricted environments)
npm run test:e2e      # Headless E2E tests - requires Cypress binary
npm run test:e2e:open # Interactive Cypress GUI - requires Cypress binary
# TIMEOUT: Set 300 seconds minimum 
# NEVER CANCEL: E2E tests can take 3-5 minutes to complete
# NOTE: Will fail if Cypress binary cannot be downloaded due to network restrictions
```

## Manual Validation Requirements

**CRITICAL**: After making changes, ALWAYS test these complete user scenarios:

1. **Basic Shopping List Flow:**
   - Start server with `npm run dev`
   - Navigate to http://localhost:3000
   - Click "➕" button to add item
   - Enter item name (e.g., "Leite"), set quantity and weight
   - Click "Adicionar" to add item
   - Verify item appears in pending list with correct totals
   - Click "✅" to complete item
   - Verify item moves to completed section

2. **Multi-language Support:**
   - Test language switching with flag buttons (🇧🇷 🇬🇧 🇪🇸)
   - Verify UI text changes immediately
   - Verify footer links update correctly
   - Test in Portuguese (default), English, and Spanish

3. **Dark Mode Toggle:**
   - Click dark mode button (🌙/☀️)
   - Verify colors invert (orange/brown theme switches)
   - Verify setting persists on page reload

4. **Data Persistence:**
   - Add items, reload page
   - Verify data persists in localStorage
   - Test settings persistence (language, dark mode)

## Working Effectively

**Project Structure (Atomic Design):**
```
components/
├── atoms/          # Basic components (Button.js, Icon.js, Input.js)
├── molecules/      # Combined atoms (FormField.js, StatusIndicator.js)  
└── organisms/      # Complex components (Header.js, Modal.js, ShoppingList.js)

scripts/
├── app.js          # Main application class (ShoppingListApp)
├── storage.js      # LocalStorage management
└── i18n.js         # Internationalization system

tests/              # Jest unit tests (storage.test.js, i18n.test.js)
cypress/            # E2E tests (shopping-list.cy.js)
locales/            # Translation files (pt.json, en.json, es.json)
```

**Key Technologies:**
- **Pure Vanilla JavaScript** (ES6+, no frameworks)
- **LocalStorage** for data persistence
- **Jest** for unit testing (jsdom environment)
- **Cypress** for E2E testing (may not work in restricted environments)
- **ESLint** for code quality
- **GitHub Pages** deployment (automatic)

## Development Workflow

**Before making changes:**
```bash
# Always validate current state first
npm run lint      # Check code quality (1 second)
npm test          # Run unit tests (1 second)  
npm run dev       # Start server for manual testing (2 seconds)
```

**After making changes:**
```bash
# Mandatory validation sequence
npm run lint      # Fix any linting issues
npm test          # Ensure unit tests pass
# Manual testing - run complete user scenarios above
# Commit only after all validation passes
```

**For component changes:**
- Follow Atomic Design principles
- Update index.html script loading order if needed
- Test component integration manually
- Add unit tests for new functionality

**For i18n changes:**
- Update all language files (pt.json, en.json, es.json)
- Test language switching manually
- Verify text fits in UI layouts

## Common Pitfalls and Solutions

**Cypress Issues:**
- Cypress binary download fails in restricted networks
- Use `CYPRESS_INSTALL_BINARY=0 npm install` to skip binary
- E2E tests will fail without binary - document this limitation
- Focus on unit tests and manual validation instead

**LocalStorage in Development:**
- Clear localStorage if experiencing data issues: `localStorage.clear()`
- Use browser dev tools to inspect stored data
- Settings persist between sessions (language, dark mode)

**Mobile Testing:**
- Test responsive layout on different screen sizes
- Use browser dev tools device emulation
- Verify touch interactions work properly

## File Locations Reference

**Configuration:**
- `package.json` - Scripts and dependencies
- `eslint.config.js` - Linting rules for vanilla JS
- `jest.config.js` - Unit test configuration
- `cypress.config.js` - E2E test configuration

**Application Core:**
- `index.html` - Main HTML structure and script loading
- `scripts/app.js` - ShoppingListApp main class
- `scripts/storage.js` - Data persistence layer
- `scripts/i18n.js` - Translation management
- `styles/main.css` - All CSS styles

**Quality Assurance:**
- `tests/` - Jest unit tests
- `cypress/e2e/` - End-to-end tests
- `.github/workflows/ci.yml` - CI/CD pipeline
- `.rules/` - Project coding standards

## Expected Timing

- **npm install**: ~3 seconds (may fail on Cypress binary)
- **npm run lint**: ~1 second
- **npm test**: ~1 second
- **npm run dev**: ~2 seconds to start
- **Manual validation**: ~2-3 minutes per scenario
- **npm run test:e2e**: 3-5 minutes (if Cypress binary available)

**NEVER CANCEL long-running commands.** Use appropriate timeouts and wait for completion.

## Validation Checklist

Before committing changes:
- [ ] `npm run lint` passes
- [ ] `npm test` passes (18 tests)
- [ ] Server starts successfully (`npm run dev`)
- [ ] Can add and complete shopping list items
- [ ] Language switching works (PT/EN/ES)
- [ ] Dark mode toggle functions
- [ ] Data persists after page reload
- [ ] Mobile layout looks correct
- [ ] No console errors in browser

This application is production-ready and deploys automatically to GitHub Pages. Always validate thoroughly before committing.