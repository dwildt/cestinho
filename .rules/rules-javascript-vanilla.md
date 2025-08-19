# JavaScript Vanilla Rules

## Code Organization
- Separate script files and CSS files from HTML, seeking cohesion
- Maintain clear separation of concerns between different modules
- Use ES6+ features where appropriate while maintaining compatibility

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

## Code Quality
- Write clean, readable code with meaningful variable names
- Follow consistent indentation and formatting
- Use comments sparingly, prefer self-documenting code
- Avoid deeply nested callbacks, use async/await when appropriate
