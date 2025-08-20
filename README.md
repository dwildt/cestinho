# Cestinho - Lista de Compras Inteligente

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
npm test              # Executa todos os testes uma vez
npm run test:watch    # Executa testes em modo watch (reexecuta ao salvar)
```

#### Métodos alternativos para servidor local
```bash
# Método 2: Python
python -m http.server 8000
# Acesse http://localhost:8000

# Método 3: Abrir diretamente no navegador
# Abra o index.html no navegador (pode ter limitações de CORS)
```

## 🧪 Testes

O projeto utiliza Jest para testes unitários com cobertura das principais funcionalidades:

- ✅ Gerenciamento de dados (localStorage)
- ✅ Sistema de internacionalização (i18n)
- ✅ Funcionalidades de importação/exportação
- ✅ Tratamento de erros e casos extremos

Execute `npm test` para rodar todos os testes.

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
├── package.json            # Dependências e scripts
├── jest.config.js          # Configuração do Jest
└── README.md               # Este arquivo
```

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