# VeritasVault Documentation Hub

![VeritasVault](https://placehold.co/600x150?text=VeritasVault.ai)

Welcome to the official documentation repository for the VeritasVault.ai platform. This repository serves as the central knowledge base for all VeritasVault components, providing comprehensive documentation for developers, operators, and users.

## 🔍 Overview

This repository contains the source for our documentation portal built with Docusaurus, as well as our interactive demo documentation application. It aggregates and organizes documentation across all VeritasVault repositories:

- [vv-chain-services](https://github.com/veritasvault/vv-chain-services) - Blockchain integration and event processing services
- [vv-infra](https://github.com/veritasvault/vv-infra) - Infrastructure as Code and deployment configurations
- [vv-gamification](https://github.com/veritasvault/vv-gamification) - Engagement and gamification systems
- [vv-frontend](https://github.com/veritasvault/vv-frontend) - User interface and experience components

## 📚 Documentation Structure

Our documentation is organized into the following main sections:

```
docs/
├── getting-started/           # Onboarding and quickstart guides
├── architecture/              # System architecture and design decisions
├── chain-services/            # Documentation for vv-chain-services
├── infrastructure/            # Documentation for vv-infra
├── gamification/              # Documentation for vv-gamification
├── frontend/                  # Documentation for vv-frontend
├── integration/               # Cross-component integration guides
├── api-reference/            # API documentation
├── operations/               # Deployment and operations guides
├── tutorials/                # Step-by-step tutorials
└── contributing/             # Contribution guidelines
```

## 🛠️ Technologies

This documentation hub is built using:

- **[Docusaurus](https://docusaurus.io/)** - Main documentation site framework
- **Custom Demo App** - Interactive documentation with live examples
- **[Mermaid](https://mermaid-js.github.io/)** - Diagrams as code
- **[Algolia DocSearch](https://docsearch.algolia.com/)** - Documentation search

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)
- [Git](https://git-scm.com/)

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/veritasvault/vv-docs.git
   cd vv-docs
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000)

### Building the Documentation

To build the static site:

```bash
yarn build
```

The built site will be in the `build` directory.

### Running the Demo App

The demo app provides interactive examples of VeritasVault components:

```bash
cd demo-app
yarn install
yarn start
```

Open your browser to [http://localhost:3001](http://localhost:3001)

## 🔄 Documentation Workflow

### Automatic Updates

This repository automatically pulls documentation updates from other VeritasVault repositories through GitHub Actions workflows. When changes are made to documentation in component repositories, they are automatically synchronized to this documentation hub.

### Manual Updates

For documentation specific to this hub or cross-cutting concerns:

1. Create a new branch:
   ```bash
   git checkout -b feature/new-documentation
   ```

2. Make your changes

3. Submit a pull request

## 📝 Contributing

We welcome contributions to improve our documentation! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Documentation Standards

- Use Markdown for all documentation
- Follow the [Google Developer Documentation Style Guide](https://developers.google.com/style)
- Include code examples where appropriate
- Use Mermaid for diagrams
- Test all links and code examples

## 🏗️ Repository Structure

```
vv-docs/
├── .github/                  # GitHub Actions workflows
├── docs/                     # Documentation content
├── src/                      # Docusaurus custom components
├── static/                   # Static assets
├── demo-app/                 # Interactive documentation app
├── docusaurus.config.js      # Docusaurus configuration
├── sidebars.js               # Sidebar configuration
└── package.json              # Node.js dependencies
```

## 🔗 Integration with Component Repositories

Each component repository contains a `docs/` directory with component-specific documentation. These are synchronized to this repository through the following mechanisms:

1. **Automated Synchronization**: GitHub Actions workflows pull documentation changes from component repositories
2. **Documentation Links**: Cross-references between documentation sections
3. **Consistent Structure**: Each repository follows the same documentation structure

## 🌐 Deployment

The documentation site is automatically deployed on changes to the `main` branch:

- **Production**: [https://docs.veritasvault.ai](https://docs.veritasvault.ai)
- **Preview Builds**: Generated for pull requests at unique URLs

## 🧰 Tools and Extensions

Recommended tools for documentation contributors:

- **VS Code Extensions**:
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Markdown Lint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

- **Online Tools**:
  - [Excalidraw](https://excalidraw.com/) - For whiteboard-style diagrams
  - [Carbon](https://carbon.now.sh/) - For code screenshots
  - [Tables Generator](https://www.tablesgenerator.com/markdown_tables) - For complex tables

## 📊 Documentation Analytics

We track documentation usage and feedback to continuously improve:

- Page views and time spent
- Search queries
- Documentation feedback ratings
- GitHub issues and pull requests

## 📞 Support

If you need help with the documentation or have suggestions:

- Open an [issue](https://github.com/veritasvault/vv-docs/issues)
- Contact the documentation team at [docs@veritasvault.ai](mailto:docs@veritasvault.ai)
- Join our [Discord community](https://discord.gg/veritasvault)

## 📜 License

This documentation is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).