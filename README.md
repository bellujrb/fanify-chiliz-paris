# Fanify: The new generation of fan engagement with Blockchain and Twitter

> _TEAM Fanify: Chiliz Hackathon 

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Chiliz-red)

---

### 🌐 Introduction

Fanify is a platform that connects fans and sports events through digital tokens. For every match, we create unique tokens that represent the hype of the game, allowing fans to engage, collect, and interact in a new way. We bring together sports, technology, and emotion in one place.

---

### 🔴 Chiliz Chain

Our platform is built on Chiliz Chain, a blockchain tailored for sports and entertainment, offering fast transactions and high scalability. By choosing Chiliz, we align our mission with a network already embraced by top clubs and millions of fans—making it the perfect home for Fanify.

Leveraging Chiliz’s fan-centric ecosystem, we ensure that each tokenized hype moment is not only secure and transparent but also deeply connected to a global sports community.

--- 

### 🔗 Smart Contracts on Chiliz Testnet

📄 **Deployed Contracts:**  
- 🪙 [HypeToken](https://spicy-explorer.chiliz.com/address/0xe5d5d20b1b3757bee7bf7d61a5004106e4d32139)  
- 📡 [Oracle](https://spicy-explorer.chiliz.com/address/0x034faeae891f47a2714eb1e4bfba7525a606dcc5)  
- ⚽ [Funify](https://spicy-explorer.chiliz.com/address/0xdb51e8f0ceae0d0743e3135fcb1f0f077b0f3d04)

✅ Actively in development · Live on **Chiliz Chain (Spicy Testnet)**  
🔐 Powered by a dedicated **Oracle** that collects real-time goal data and a **fan emotion index** from social media and engagement metrics — both of which dynamically affect the logic and supply of **Hype Tokens**.

---

## 🛠 Installation (Front-end)

1. **Pre-requisites**
    - Make sure you have NodeJS installed on your machine.

2. **Clone the Repository**

    ```bash
    git clone https://github.com/bellujrb/fanify-chiliz-paris/front-end
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Run the App**

    ```bash
    npm run dev
    ```

---

## 📂 Project File Tree
    
```
fanify-chiliz-paris
├── back-end
│   └── lib
│       └── deployedContracts.ts
│       └── ...
│   └── models
│       └── Game.js
│       └── Tweets.js
│   └── routes
│       └── games.js
│       └── tweets.js
│   └── services
│       └── blockchain.js
│   └── ...
│   └── server.js
├── front-end
│   └── app
│       └── admin
│           └── page.tsx
│       └── trading
│           └── page.tsx
│       └── globals.css
│       └── layout.tsx
│       └── not-found.tsx
│       └── page.tsx
│   └── components
│       └── admin
│           └── ...
│       └── trading
│           └── ...
│       └── ui
│           └── ...
│       └── ...
│   └── hooks
│       └── use-toast.ts
│       └── useSmartContractGames.ts
│       └── useWalletBalance.ts
│   └── lib
│       └── deployedContracts.ts
│       └── utils.ts
│   └── providers
│       └── Web3Providers.tsx
│   └── ...
├── web3
│   └── src
│       └── funify
│           └── Funify.claim.sol
│           └── Funify.crud.sol
│           └── Funify.error.sol
│           └── Funify.events.sol
│           └── Funify.placebet.sol
│           └── Funify.sec.sol
│           └── Funify.sol
│           └── Funify.storage.sol
│       └── HypeToken.sol
│       └── Oracle.sol
├── README.MD
```
---

#### `fanify-chiliz-paris`

- `back-end`
    - Back-end Application
- `front-end`
    - Frontend Application
- `web3`
    - Blockchain Application
- `README.md`
    - Documentation Project

---

<details>
  <summary>🛠 Front-end Tech Stack</summary>

### Design Patterns
- **Component Pattern**: Reusable component structure, organized under `/components`.
- **Modal/Dialog Pattern**: Use of modals and dialogs, such as `WalletConnectionModal.tsx` and components in `/components/ui/dialog.tsx`.
- **Layout Pattern**: Utilizes Next.js App Router for global and specific layouts (`/app/layout.tsx`).
- **Hooks Pattern**: Custom hooks for reusable logic, like `useSmartContractGames`, `useWalletBalance`, `use-toast`.
- **Separation of Concerns**: Clear separation between business logic (`/hooks`, `/lib`), presentation (`/components`), and routing/pages (`/app`).

### External Packages

#### Core
- `next`
- `react`
- `react-dom`
- `typescript`

#### UI & Styling
- `@radix-ui/react-*` (accordion, alert-dialog, aspect-ratio, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, icons, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, slot, switch, tabs, toast, toggle, toggle-group, tooltip)
- `tailwindcss`
- `tailwindcss-animate`
- `tailwind-merge`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `framer-motion`
- `cmdk`
- `vaul`
- `embla-carousel-react`
- `recharts`
- `react-resizable-panels`
- `input-otp`
- `react-day-picker`
- `date-fns`

#### Forms & Validation
- `react-hook-form`
- `@hookform/resolvers`
- `zod`

#### Theming
- `next-themes`

#### Notifications
- `sonner`

#### Web3 & Wallets
- `ethers`
- `wagmi`
- `@rainbow-me/rainbowkit`
- `@reown/walletkit`
- `@walletconnect/core`
- `viem`

#### Data Fetching & State
- `@tanstack/react-query`
- React hooks and custom hooks (no Redux/MobX)

#### Utilities
- Utility functions in `/lib/utils.ts`
- `caniuse-lite`
- `encoding`
- `autoprefixer`
- `postcss`

#### Types
- `@types/node`
- `@types/react`
- `@types/react-dom`

#### Linting & Dev Tools
- `eslint`
- `eslint-config-next`
- `pino-pretty`

### Architecture
- **Next.js 14+** with App Router (`/app`), leveraging layouts, server components, and nested routes.
- **Component-based**: Clear organization in `/components`, with subfolders for specific domains (e.g., `/components/trading`, `/components/admin`).
- **Hooks**: Business logic and Web3 integration isolated in custom hooks (`/hooks`).
- **Type Safety**: Extensive use of TypeScript and global types in `/types`.
- **Styling**: Tailwind CSS with custom configuration (`tailwind.config.ts`), plus Radix UI components.
- **Assets**: Static images and files in `/public`.
- **Providers**: Global contexts and providers in `/providers` (e.g., `Web3Providers.tsx`).

### Other Conventions
- **Atomic Design**: UI components organized atomically (e.g., `/components/ui/`).
- **Accessibility**: Use of accessible components from Radix UI.
- **Responsiveness**: Responsive layouts with Tailwind CSS.
- **Import Best Practices**: Use of aliases (`@/components`, `@/hooks`, etc.) for easier imports.

</details>

<details>
  <summary>🛠 Backend Tech Stack</summary>

### Design Patterns
- **MVC Pattern**: Clear separation using Models (`/models`), Routes (`/routes`), and Controllers/Services (`/services`).
- **Service Layer**: Business logic and blockchain integration are abstracted into service files (e.g., `/services/blockchain.js`).
- **Routing Pattern**: RESTful API routes organized in `/routes` (e.g., `games.js`, `tweets.js`).

### External Packages

#### Core
- `express`

#### Blockchain/Web3
- `ethers`

#### Utilities
- `dotenv` (for environment variable management)

#### Dev Tools
- `nodemon` (for development auto-reload)

### Architecture
- **Express.js** server (`server.js`) as the main entry point.
- **REST API**: Endpoints defined in `/routes` for different resources (e.g., games, tweets).
- **Models**: Data models in `/models` (e.g., `Game.js`, `Tweet.js`).
- **Services**: Business logic and blockchain interaction in `/services`.
- **Config/Lib**: Shared configuration and deployed contract addresses in `/lib`.

### Other Conventions
- **Environment Variables**: Managed via `.env` and loaded with `dotenv`.
- **Separation of Concerns**: Logic split between routes, services, and models for maintainability.
- **Modular Structure**: Each domain (games, tweets, blockchain) has its own route, model, and service as needed.

</details>

<details>
  <summary>🛠 Web3/Smart Contracts Tech Stack</summary>

### Design Patterns
- **Modular Contract Structure**: Smart contracts are split by responsibility (e.g., `Funify.sol`, `HypeToken.sol`, `Oracle.sol`, and modularized files in `funify/`).
- **Script Pattern**: Deployment and utility scripts are separated in `/script` and as shell scripts for different networks.
- **Testing Pattern**: Test contracts and scenarios are organized under `/test`.

### Tooling & External Packages

#### Smart Contract Development
- **Foundry**:  
  - Used for compiling, testing, and deploying smart contracts (`foundry.toml`, `forge-std` in `/lib`).
- **Solady**:  
  - Utility and base contracts for Solidity, included as a submodule in `/lib/solady`.
- **Remappings**:  
  - Custom import remappings managed in `remappings.txt`.

#### Scripting & Automation
- **Python**:  
  - Deployment and simulation scripts (`deploy.py`, `simulator.py`).
- **Shell Scripts**:  
  - Network-specific deployment scripts (`local.deploy.sh`, `mainnet.deploy.sh`, `testnet.deploy.sh`).

#### Testing
- **Foundry Test Suite**:  
  - Solidity-based tests in `/test` and scenario-based tests in `/test/scenarios/`.

#### Utilities & Config
- **Broadcasts**:  
  - Deployment logs and artifacts in `/broadcast`.
- **Cache/Out**:  
  - Build artifacts and cache for Foundry.
- **.gitmodules**:  
  - Manages external submodules (e.g., Solady, forge-std).

### Architecture
- **Contracts**:  
  - Main contracts in `/src` (e.g., `Funify.sol`, `HypeToken.sol`, `Oracle.sol`).
  - Modularized contract logic in `/src/funify/`.
- **Scripts**:  
  - Deployment and utility scripts in `/script` and as Python/shell scripts at the root.
- **Testing**:  
  - Unit and scenario tests in `/test`.
- **Libs**:  
  - External libraries and standards in `/lib` (e.g., `forge-std`, `solady`).

### Other Conventions
- **Network Agnostic**:  
  - Deployment scripts and remappings support multiple networks (local, testnet, mainnet).
- **Open Source Standards**:  
  - Uses widely adopted libraries (Solady, forge-std) for reliability and security.
- **Documentation**:  
  - Project and contract documentation in `README.md` files.

</details>

---

## 🙏 Acknowledgments

Special thanks to Chiliz for this ambitious opportunity.
