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

### 🔗 Smart Contract on Chiliz Testnet

📄 [`Contract address coming soon`](https://chiliz.com)  
✅ In development · To be deployed on Chiliz Chain (Testnet) 
🔐 Powered by a dedicated Oracle, which gathers real-time match goal data and a fan emotion index from social media and engagement metrics—both of which dynamically affect the supply and logic of hype tokens.

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
├── front-end
│   └── app
│       └── events
│           └── page.tsx
│       └── wallet
│           └── page.tsx
│       └── globals.css
│       └── layout.tsx
│       └── not-found.tsx
│       └── page.tsx
│   └── components
│       └── connect-wallet-modal.tsx
├── blockchain
├── README.MD
```
---

#### `fanify-chiliz-paris`

- `front-end`
    - Frontend Application
- `blockchain`
    - Blockchain Application
- `README.md`
    - Documentation Project

---

## 🛠 Tech Stack Front-end

### Design Patterns
- **Component Pattern**: Clear separation of responsibilities with a component-based structure (`/components`).
- **Modal Pattern**: Used for dialogs and modals, as seen with `WalletConnectionModal.tsx` and components in `/components/ui/dialog.tsx`.
- **Layout Pattern**: Utilizes Next.js App Router for layouts (`/app/layout.tsx`).

### External Packages
- **Core**: `next`, `react`, `react-dom`, `typescript`
- **UI**: `@radix-ui/*`, `framer-motion`, `lucide-react`, `tailwindcss`, `class-variance-authority`, `clsx`
- **Forms**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **Theming**: `next-themes`
- **Notifications**: `sonner`
- **Web3**: `ethers`

### Architecture
- Next.js 14+ with App Router.
- Component-based framework with a clear project structure: `/app`, `/components`, `/hooks`, `/lib`.

---

## 🙏 Acknowledgments

Special thanks to Chiliz for this ambitious opportunity.
