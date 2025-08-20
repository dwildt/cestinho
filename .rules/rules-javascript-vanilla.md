# JavaScript Vanilla Rules

## Code Organization
- Separate script files and CSS files from HTML, seeking cohesion
- Maintain clear separation of concerns between different modules
- Use ES6+ features where appropriate while maintaining compatibility

## Atomic Design Architecture
- Follow Atomic Design methodology for component structure:
  - **Atoms**: Basic building blocks (Button, Input, Icon)
  - **Molecules**: Simple combinations of atoms (FormField, StatusIndicator)
  - **Organisms**: Complex combinations of molecules and atoms (Header, ShoppingList, Modal)
  - **Templates**: Page-level layout structures (if needed)
  - **Pages**: Specific instances of templates with real content
- Store components in organized folder structure:
  ```
  components/
  ├── atoms/
  ├── molecules/
  ├── organisms/
  ├── templates/
  └── pages/
  ```
- Each component should be a self-contained ES6 class
- Components must have a static `create()` method for easy instantiation
- Components should accept options object in constructor for configuration
- All components must work with vanilla JavaScript (no build process required)
- Maintain GitHub Pages compatibility - no transpilation or bundling needed

## Testing Strategy
- Use JEST for unit testing in separate folders from application files
- Separate tests by domain to avoid large test files
- Follow TDD approach with small cycles between new business rules and implementation
- Write tests first, then implement the minimum code to make tests pass

## Development Environment
- Use `npx http-server -p 3000` to run the application locally
- Available npm scripts:
  - `npm start` - Start development server
  - `npm run dev` - Start development server (alias)
  - `npm run serve` - Start development server (alias)
  - `npm test` - Run tests
  - `npm run test:watch` - Run tests in watch mode

## Responsive Design
- Create responsive layouts that work on mobile devices
- Use CSS Grid and Flexbox for modern layouts
- Test on different screen sizes

## Component Implementation Guidelines
- **Component Structure**:
  ```javascript
  class ComponentName {
    constructor(options = {}) {
      // Initialize component properties from options
    }
    
    render() {
      // Return DOM element
    }
    
    static create(options) {
      return new ComponentName(options).render();
    }
  }
  ```
- **Event Handling**: Pass callback functions through options object
- **Styling**: Use existing CSS classes, add component-specific classes when needed
- **State Management**: Keep component state minimal, use parent component for complex state
- **Reusability**: Design components to be reusable across different contexts
- **Dependencies**: Atoms should have no dependencies, molecules depend only on atoms, organisms can depend on molecules and atoms

## Code Quality
- Write clean, readable code with meaningful variable names
- Follow consistent indentation and formatting
- Use comments sparingly, prefer self-documenting code
- Avoid deeply nested callbacks, use async/await when appropriate
- Prefer composition over inheritance when building components
