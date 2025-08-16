# my-app

An Electron application with Vue

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## 使用 gemini cli

### 项目id

my-gemini-project-469104 https://console.cloud.google.com

### 项目密钥

AIzaSyBrdtCTwSSBX-xn9aBk6zKx71Kj9cUUDRE https://aistudio.google.com/apikey

### 安装 gemini cli

```bash
# Standard installation
npm install -g @google/gemini-cli

# Fix permissions if needed
sudo npm install -g @google/gemini-cli

# Verify
gemini --version

# Set environment variables
export GEMINI_API_KEY=AIzaSyBrdtCTwSSBX-xn9aBk6zKx71Kj9cUUDRE
export GEMINI_PROJECT_ID=my-gemini-project-469104

 source .zshrc
```
