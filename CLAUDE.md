# CLAUDE.md - Cestinho Project Guide

Este arquivo contém informações essenciais para trabalhar no projeto Cestinho - Lista de Compras Inteligente.

## 🚀 Comandos Principais

### Build e Desenvolvimento
```bash
# Servidor de desenvolvimento
npm run dev          # Inicia servidor HTTP na porta 3000
npm start            # Alias para npm run dev
npm run serve        # Alias para npm run dev

# Acesso local
# http://localhost:3000
```

### Testes
```bash
# Testes unitários (Jest)
npm test             # Executa testes unitários uma vez
npm run test:watch   # Executa testes em modo watch

# Testes E2E (Cypress)
npm run test:e2e     # Executa testes E2E em modo headless
npm run test:e2e:open # Abre interface do Cypress para testes interativos

# Comandos individuais do Cypress
npm run cypress:run  # Executa testes Cypress headless
npm run cypress:open # Abre interface do Cypress
```

### Qualidade de Código
```bash
# Linting (ESLint)
npm run lint         # Verifica código com ESLint
npm run lint:fix     # Corrige problemas automaticamente
npm run audit        # Executa auditoria completa (alias para lint)
```

## 📁 Estrutura do Projeto

```
cestinho/
├── index.html              # Página principal da aplicação
├── components/             # Componentes seguindo Atomic Design
│   ├── atoms/              # Componentes básicos reutilizáveis
│   │   ├── Button.js       # Componente de botão
│   │   ├── Icon.js         # Componente de ícones
│   │   └── Input.js        # Componente de entrada
│   ├── molecules/          # Combinações de átomos
│   │   ├── FormField.js    # Campo de formulário
│   │   └── StatusIndicator.js # Indicador de status
│   └── organisms/          # Componentes complexos
│       ├── Header.js       # Cabeçalho da aplicação
│       ├── Modal.js        # Modal de configurações
│       └── ShoppingList.js # Lista de compras
├── styles/
│   └── main.css            # Estilos CSS principais
├── scripts/
│   ├── app.js              # Aplicação principal (ShoppingListApp)
│   ├── storage.js          # Gerenciamento de dados (localStorage)
│   └── i18n.js             # Internacionalização (I18n)
├── locales/                # Arquivos de tradução
│   ├── pt.json             # Traduções em Português (padrão)
│   ├── en.json             # Traduções em Inglês
│   └── es.json             # Traduções em Espanhol
├── tests/                  # Testes unitários
│   ├── storage.test.js     # Testes do Storage
│   ├── i18n.test.js        # Testes do I18n
│   └── setup.js            # Configuração dos testes Jest
├── cypress/                # Testes E2E
│   ├── e2e/                # Testes funcionais
│   │   └── shopping-list.cy.js # Testes da lista de compras
│   ├── fixtures/           # Dados de teste
│   │   └── sample-data.json # Dados de exemplo
│   └── support/            # Comandos e configurações
│       ├── commands.js     # Comandos customizados
│       └── e2e.js          # Configuração de suporte
├── .github/
│   ├── workflows/
│   │   └── ci.yml          # Pipeline CI/CD
│   └── dependabot.yml      # Configuração do Dependabot
├── .rules/                 # Regras do projeto
│   ├── rules-general.md    # Regras gerais
│   ├── rules-i18n.md       # Regras de internacionalização
│   ├── rules-github-io.md  # Regras para GitHub Pages
│   └── rules-javascript-vanilla.md # Regras JavaScript
├── .tasks/
│   └── tasks.md            # Tarefas do projeto
├── package.json            # Dependências e scripts
├── jest.config.js          # Configuração do Jest
├── cypress.config.js       # Configuração do Cypress
├── eslint.config.js        # Configuração do ESLint
└── README.md               # Documentação principal
```

## 🛠 Tecnologias e Stack

### Core Technologies
- **JavaScript Vanilla** - Sem frameworks, código limpo e eficiente
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **LocalStorage** - Persistência de dados no navegador

### Testing Stack
- **Jest** - Testes unitários com jsdom
- **Cypress** - Testes funcionais E2E
- **ESLint** - Análise estática de código

### Build & Deploy
- **http-server** - Servidor de desenvolvimento
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Deploy automático
- **start-server-and-test** - Coordenação servidor/testes

### Development Tools
- **Dependabot** - Atualizações automáticas de dependências
- **Atomic Design** - Metodologia de organização de componentes

## 📝 Convenções de Código

### JavaScript
- **ES6+ Features** - Use recursos modernos do JavaScript
- **Classes** - Use classes para componentes e serviços
- **No Semicolons** - Código sem ponto e vírgula (configurado no ESLint)
- **Single Quotes** - Use aspas simples
- **2 Spaces Indent** - Indentação com 2 espaços
- **camelCase** - Para variáveis e funções
- **PascalCase** - Para classes e construtores

### Atomic Design Structure
```javascript
// Atoms - Componentes básicos
class Button {
  constructor(options) { /* ... */ }
  render() { /* ... */ }
}

// Molecules - Combinação de atoms
class FormField {
  constructor(input, label) { /* ... */ }
}

// Organisms - Estruturas complexas
class ShoppingList {
  constructor() { /* ... */ }
}
```

### Naming Conventions
- **Files**: kebab-case (shopping-list.cy.js)
- **Classes**: PascalCase (ShoppingListApp)
- **Methods/Functions**: camelCase (addItem, updateList)
- **HTML IDs**: kebab-case (add-item-btn, pending-list)
- **CSS Classes**: kebab-case (list-section, modal-content)

### I18n (Internacionalização)
- **Keys**: dot notation (modal.add.title)
- **Files**: ISO language codes (pt.json, en.json, es.json)
- **Default Language**: Português (pt)

## 🎯 Instruções Específicas

### Adicionando Novos Componentes
1. **Determine o nível**: Atom, Molecule ou Organism
2. **Crie o arquivo** na pasta apropriada
3. **Siga o padrão**:
   ```javascript
   class ComponentName {
     constructor(options = {}) {
       // Inicialização
     }
     
     render() {
       // Retorna elemento HTML
     }
     
     setupEventListeners() {
       // Event listeners se necessário
     }
   }
   ```
4. **Adicione ao index.html** na ordem correta (atoms → molecules → organisms)

### Adicionando Testes
- **Unitários**: Arquivo `*.test.js` na pasta `tests/`
- **E2E**: Arquivo `*.cy.js` na pasta `cypress/e2e/`
- **Sempre teste funcionalidades críticas**

### Modificando Estilos
- **Arquivo único**: `styles/main.css`
- **Mobile First**: Design responsivo
- **BEM Naming**: Use convenções BEM quando apropriado
- **Cores Wildtech**: Orange (#ff7b00), Brown (#8b4513)

### Internacionalização
1. **Adicione chaves** nos arquivos JSON em `locales/`
2. **Use I18n.t('key')** no JavaScript
3. **Teste em todos os idiomas** suportados
4. **Mantenha consistência** entre idiomas

### Git e CI/CD
- **Branch main**: Código estável
- **Pull Requests**: Para mudanças significativas
- **CI Pipeline**: Roda automaticamente (lint, test, build)
- **Auto Deploy**: GitHub Pages atualiza automaticamente

### Debugging
```bash
# Servidor local para debug
npm run dev

# Testes em modo watch
npm run test:watch

# Cypress interativo para debug E2E
npm run test:e2e:open

# Verificar código
npm run lint
```

## 🔍 Arquivos Importantes

### Configuração
- **package.json** - Scripts e dependências
- **eslint.config.js** - Regras de código
- **cypress.config.js** - Configuração de testes E2E
- **jest.config.js** - Configuração de testes unitários

### Aplicação Core
- **scripts/app.js** - Classe principal ShoppingListApp
- **scripts/storage.js** - Gerenciamento de dados
- **scripts/i18n.js** - Sistema de tradução
- **index.html** - Estrutura HTML e carregamento de scripts

### Qualidade
- **.github/workflows/ci.yml** - Pipeline CI/CD
- **tests/** - Testes unitários
- **cypress/** - Testes E2E
- **.rules/** - Regras e padrões do projeto

## 💡 Dicas para Desenvolvimento

1. **Sempre rode os testes** antes de commits importantes
2. **Use o ESLint** para manter consistência de código  
3. **Teste em diferentes navegadores** (especialmente mobile)
4. **Mantenha LocalStorage limpo** durante development
5. **Use comandos Cypress customizados** para testes complexos
6. **Siga Atomic Design** para novos componentes
7. **Documente mudanças significativas** no README.md

## 🚨 Regras Importantes

- **NUNCA commite** código que quebra os testes
- **SEMPRE adicione testes** para novas funcionalidades
- **MANTENHA** a compatibilidade entre idiomas
- **SIGA** as convenções de naming estabelecidas
- **USE** as cores da marca Wildtech
- **MANTENHA** o código vanilla JavaScript (sem frameworks)

---

**Última atualização**: Este arquivo deve ser atualizado quando mudanças significativas forem feitas na estrutura ou processos do projeto.