# Cestinho - Lista de Compras Inteligente

[![CI](https://github.com/dwildt/cestinho/workflows/CI%20Pipeline/badge.svg)](https://github.com/dwildt/cestinho/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/dwildt/cestinho)
[![Cypress](https://img.shields.io/badge/e2e-cypress-green.svg)](https://github.com/dwildt/cestinho)
[![Code Quality](https://img.shields.io/badge/code%20quality-ESLint-blue.svg)](https://github.com/dwildt/cestinho)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success.svg)](https://dwildt.github.io/cestinho)

[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](https://github.com/dwildt/cestinho)
[![HTML5](https://img.shields.io/badge/HTML5-semantic-orange.svg)](https://github.com/dwildt/cestinho)
[![CSS3](https://img.shields.io/badge/CSS3-responsive-blue.svg)](https://github.com/dwildt/cestinho)
[![Jest](https://img.shields.io/badge/Jest-unit%20tests-red.svg)](https://github.com/dwildt/cestinho)
[![Atomic Design](https://img.shields.io/badge/architecture-atomic%20design-purple.svg)](https://github.com/dwildt/cestinho)
[![PWA Ready](https://img.shields.io/badge/PWA-ready-lightgreen.svg)](https://github.com/dwildt/cestinho)

Uma mini aplicação para gerir listas de compras para supermercados, desenvolvida em JavaScript Vanilla. O aplicativo ajuda a organizar suas compras com funcionalidades inteligentes de controle de quantidade e peso.

🌐 **[Acesse o aplicativo online](https://dwildt.github.io/cestinho)**

## ✨ Funcionalidades

- ✅ **Adicionar itens** com nome, quantidade e peso
- 📊 **Totalizadores automáticos** de quantidade e peso
- 🚦 **Sistema de sinalizações** - Amarela (limite atingido) e Vermelha (dobro do limite)
- ✅ **Marcar itens como comprados** e movê-los para lista de concluídos
- 🔄 **Restaurar itens** da lista de concluídos
- 💾 **Armazenamento local** - seus dados ficam salvos no navegador
- 📥📤 **Exportar/Importar** listas em formato JSON
- 🌍 **Multilíngue** - Português, Inglês e Espanhol
- 📱 **Design responsivo** - funciona perfeitamente em mobile
- ⚙️ **Configurações personalizáveis** - defina seus próprios limites

## 🚀 Tecnologias

- **JavaScript Vanilla** - Sem frameworks, código limpo e eficiente
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **Jest** - Testes unitários
- **Cypress** - Testes funcionais (E2E)
- **ESLint** - Análise estática de código
- **LocalStorage** - Persistência de dados

## 🎯 Como usar

1. **Configurar limites**: Defina o máximo de itens (padrão: 10) e peso máximo (padrão: 15kg)
2. **Adicionar itens**: Preencha nome, quantidade e peso do item
3. **Acompanhar totais**: Veja a quantidade total e peso no topo da lista
4. **Observar sinalizações**: 
   - 🟢 Verde: Normal
   - 🟡 Amarelo: Limite atingido
   - 🔴 Vermelho: Dobro do limite excedido
5. **Marcar como comprado**: Move o item para a lista de concluídos
6. **Exportar/Importar**: Salve e carregue suas listas

## 📱 Instalação e Execução

### Configuração inicial
```bash
# Clone o repositório
git clone https://github.com/dwildt/cestinho.git

# Acesse o diretório
cd cestinho

# Instalar dependências (necessário apenas para testes)
npm install
```

### Comandos disponíveis

#### Executar servidor local
```bash
# Usando npm scripts (Recomendado)
npm run dev      # Inicia servidor na porta 3000
npm run serve    # Mesmo que npm run dev
npm start        # Mesmo que npm run dev

# Usando npx diretamente
npx http-server -p 3000
# Acesse http://localhost:3000
```

#### Executar testes
```bash
# Testes unitários
npm test              # Executa todos os testes unitários uma vez
npm run test:watch    # Executa testes unitários em modo watch (reexecuta ao salvar)

# Testes funcionais (E2E)
npm run test:e2e      # Executa testes E2E em modo headless
npm run test:e2e:open # Abre interface do Cypress para testes interativos
```

#### Auditoria de código
```bash
npm run lint          # Executa análise estática do código (ESLint)
npm run lint:fix      # Executa ESLint e corrige problemas automaticamente
npm run audit         # Executa auditoria completa do código
```

## 🧪 Testes

O projeto utiliza uma estratégia abrangente de testes:

### Testes Unitários (Jest)
- ✅ Gerenciamento de dados (localStorage)
- ✅ Sistema de internacionalização (i18n)
- ✅ Funcionalidades de importação/exportação
- ✅ Tratamento de erros e casos extremos

### Testes Funcionais (Cypress)
- ✅ Fluxo completo de adição de itens
- ✅ Marcação de itens como comprados
- ✅ Sistema de totalizadores
- ✅ Persistência de dados
- ✅ Funcionalidades de exportação/importação
- ✅ Troca de idiomas

### Auditoria de Código (ESLint)
- ✅ Análise estática de código
- ✅ Verificação de boas práticas
- ✅ Detecção de problemas potenciais

Execute `npm test` para testes unitários, `npm run test:e2e` para testes E2E, e `npm run audit` para auditoria de código.

## 🌍 Idiomas Suportados

- 🇧🇷 **Português** (pt) - Padrão
- 🇺🇸 **English** (en)
- 🇪🇸 **Español** (es)

## 📝 Estrutura do Projeto

O projeto segue os princípios do **Atomic Design**, organizando componentes em diferentes níveis de complexidade:

```
cestinho/
├── index.html              # Página principal
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
│   └── main.css            # Estilos CSS
├── scripts/
│   ├── app.js              # Aplicação principal
│   ├── storage.js          # Gerenciamento de dados
│   └── i18n.js             # Internacionalização
├── locales/
│   ├── pt.json             # Traduções em Português
│   ├── en.json             # Traduções em Inglês
│   └── es.json             # Traduções em Espanhol
├── tests/
│   ├── storage.test.js     # Testes do Storage
│   ├── i18n.test.js        # Testes do I18n
│   └── setup.js            # Configuração dos testes
├── cypress/                # Testes E2E com Cypress
│   ├── e2e/                # Testes funcionais
│   │   └── shopping-list.cy.js # Testes da lista de compras
│   ├── fixtures/           # Dados de teste
│   │   └── sample-data.json # Dados de exemplo
│   └── support/            # Comandos e configurações
│       ├── commands.js     # Comandos customizados
│       └── e2e.js          # Configuração de suporte
├── package.json            # Dependências e scripts
├── jest.config.js          # Configuração do Jest
├── cypress.config.js       # Configuração do Cypress
└── README.md               # Este arquivo
```

## 🏆 Qualidade e Status

Este projeto mantém altos padrões de qualidade com:

- ✅ **100% dos testes E2E passando** - Testes funcionais com Cypress
- ✅ **Testes unitários** - Cobertura das principais funcionalidades com Jest  
- ✅ **Análise estática** - Código verificado com ESLint
- ✅ **CI/CD** - Pipeline automatizado no GitHub Actions
- ✅ **Atomic Design** - Arquitetura de componentes escalável
- ✅ **Deploy automático** - GitHub Pages com atualizações contínuas

### Status dos Testes

| Tipo | Status | Comando |
|------|--------|---------|
| Unitários (Jest) | ✅ Passando | `npm test` |
| E2E (Cypress) | ✅ Passando | `npm run test:e2e` |
| Linting (ESLint) | ✅ Passando | `npm run lint` |
| Build | ✅ Passando | `npm run dev` |

## 🤝 Contribuindo

Este projeto aceita contribuições! Para reportar bugs ou sugerir melhorias:

1. Abra uma [issue no GitHub](https://github.com/dwildt/cestinho/issues)
2. Descreva o problema ou sugestão
3. Aguarde o feedback

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## 💖 Apoio

Se este projeto foi útil para você, considere apoiar o desenvolvimento:

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-pink)](https://github.com/sponsors/dwildt)

---

**Feito com ❤️ e ☕ usando [Claude Code](https://claude.ai/code)**