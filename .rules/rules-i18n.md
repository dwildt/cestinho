# Internationalization (i18n) Rules

## Translation Files Structure
- Separate translation files to be loaded by the application
- Use JSON format for translation files
- Organize translations by language code (pt, en, es)
- Store translation files in dedicated `locales/` folder

## Language Support Requirements
- Minimum required languages:
  - **Portuguese (pt)** - Default language
  - **English (en)** - International support
  - **Spanish (es)** - Regional support
- Add additional languages as needed

## Translation Documentation
- Create dedicated markdown file with translation guidelines
- Document translation keys and their usage
- Include instructions for adding new languages
- Provide examples of translation file structure

## Implementation Guidelines
- Use key-value pairs for translations
- Support dynamic content and pluralization when needed
- Implement language switching functionality
- Store language preference in localStorage
- Ensure all UI elements are translatable

## Responsive Design Considerations
- Ensure layouts work with different text lengths across languages
- Test UI with longer translations (German, Portuguese)
- Account for RTL languages if needed in the future
- Mobile-friendly layouts that adapt to translation lengths
  