# 🧪 Guia de Testes - Cestinho

Este documento descreve como executar e entender os testes do projeto Cestinho.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

## 🌐 Executar o Aplicativo Localmente

Para testar o aplicativo antes de executar os testes:

```bash
# Método recomendado - usando http-server
npx http-server -p 3000

# Acesse http://localhost:3000
```

## 🚀 Executando os Testes

### Instalação das Dependências
```bash
npm install
```

### Executar Todos os Testes
```bash
npm test
```

### Executar Testes em Modo Watch (Desenvolvimento)
```bash
npm run test:watch
```

## 🔍 Estrutura dos Testes

### Arquivos de Teste
- `tests/storage.test.js` - Testes para gerenciamento de dados (localStorage)
- `tests/i18n.test.js` - Testes para sistema de internacionalização
- `tests/setup.js` - Configuração global dos testes

### Framework Utilizado
- **Jest** - Framework de testes JavaScript
- **jsdom** - Ambiente DOM simulado para testes

## 📊 Cobertura dos Testes

### Storage (storage.test.js)
✅ **Gerenciamento de Dados**
- Salvar e carregar dados corretamente
- Retornar dados padrão quando não existem
- Lidar com dados corrompidos graciosamente

✅ **Gerenciamento de Configurações**
- Salvar e carregar configurações
- Retornar configurações padrão
- Tratar configurações corrompidas

✅ **Limpeza de Dados**
- Limpar todos os dados do localStorage

### I18n (i18n.test.js)
✅ **Inicialização**
- Inicializar com idioma padrão
- Carregar traduções para idioma específico
- Fallback para português em caso de erro

✅ **Tradução**
- Retornar tradução para chave existente
- Retornar chave quando tradução não encontrada

✅ **Atualizações de UI**
- Atualizar elementos da UI com traduções
- Atualizar rodapé com links corretos
- Atualizar idioma do documento

✅ **Mudança de Idioma**
- Trocar para idioma suportado
- Rejeitar idioma não suportado

## 🎯 Estratégia de Testes

### Abordagem TDD (Test-Driven Development)
1. **Red**: Escrever teste que falha
2. **Green**: Implementar código mínimo para passar
3. **Refactor**: Melhorar o código mantendo os testes passando

### Tipos de Teste
- **Testes Unitários**: Testam funções individuais isoladamente
- **Testes de Integração**: Testam a interação entre componentes
- **Testes de Mock**: Simulam dependências externas (localStorage, fetch)

## 🛠️ Configuração dos Testes

### jest.config.js
```javascript
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    collectCoverageFrom: ['scripts/**/*.js'],
    coverageDirectory: 'coverage'
};
```

### Mocks Utilizados
- **localStorage** - Simula armazenamento local
- **fetch** - Simula requisições HTTP
- **FileReader** - Simula leitura de arquivos
- **Blob/URL** - Simula criação de arquivos

## 📈 Executando com Cobertura

```bash
# Executar testes com relatório de cobertura
npx jest --coverage

# Visualizar relatório HTML (após executar com --coverage)
open coverage/lcov-report/index.html
```

## 🐛 Depuração de Testes

### Executar Teste Específico
```bash
# Executar apenas testes do storage
npx jest storage.test.js

# Executar apenas testes do i18n
npx jest i18n.test.js
```

### Modo Verbose (Detalhado)
```bash
npx jest --verbose
```

### Executar com Watch e Filtro
```bash
npx jest --watch --testNamePattern="should save and load"
```

## 💡 Boas Práticas

### ✅ Fazer
- Escrever testes antes do código (TDD)
- Usar nomes descritivos para os testes
- Testar casos de sucesso e erro
- Mockar dependências externas
- Manter testes independentes

### ❌ Evitar
- Testes que dependem de outros testes
- Testar implementação ao invés de comportamento
- Testes muito longos ou complexos
- Não limpar estado entre testes

## 🔧 Solução de Problemas

### Erro: "Test environment jest-environment-jsdom cannot be found"
```bash
npm install --save-dev jest-environment-jsdom
```

### Erro: Classes não definidas
Verificar se as classes estão sendo importadas corretamente nos testes.

### Testes falham em CI/CD
Verificar versões do Node.js e dependências.

## 📚 Recursos Adicionais

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Testing JavaScript](https://testingjavascript.com/)