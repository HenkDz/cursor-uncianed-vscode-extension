# Development Guide - Cursor Unchained VS Code Extension

This guide is for developers who want to build, modify, test, or contribute to the Cursor Unchained VS Code extension.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Building the Extension](#building-the-extension)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Understanding the Code](#understanding-the-code)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

- **Node.js** (v18 or higher)
  - [Download Node.js](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git**
  - [Download Git](https://git-scm.com/downloads)
  - Verify installation: `git --version`

- **Visual Studio Code**
  - [Download VS Code](https://code.visualstudio.com/)
  - Recommended extensions:
    - ESLint
    - TypeScript and JavaScript Language Features (built-in)

### Recommended Tools

- **VS Code Extension Pack** - Essential extension development utilities
- **gitlens** - Enhanced Git capabilities
- ** thunder client** - For testing API endpoints

---

## 📁 Project Structure

```
cursor-unchained-vscode-extension/
├── src/
│   ├── extension/
│   │   ├── extension.ts              # Main entry point & command registrations
│   │   ├── cursorCompletionProvider.ts  # InlineCompletionItemProvider implementation
│   │   └── cursorApiClient.ts        # HTTP client for Cursor API
│   ├── lib/
│   │   ├── constants.d.ts/.js        # Default API payload constants
│   │   ├── refreshTabContext.d.ts/.js   # Tab context refresh logic
│   │   ├── streamCpp.d.ts/.js        # StreamCpp API logic
│   │   └── types/
│   │       ├── extension-proto.d.ts/.js  # Generated protobuf types for extension
│   │       ├── proto.d.ts/.js        # Generated protobuf base types
│   │       └── proto.ts              # Protobuf type definitions (.mjs format)
│   └── assets/
│       ├── cursor-unchained.png      # Extension icon
│       └── favicon.svg              # Favicon for webview panels
├── protobuf/                         # Protobuf definition files
│   ├── streamCppRequest.proto
│   ├── streamCppResponse.proto
│   ├── refreshTabContextRequest.proto
│   ├── refreshTabContextResponse.proto
│   └── streamUnifiedChatRequest.proto
├── scripts/
│   ├── buildExtension.cjs           # Build script
│   ├── refreshTabContext.ts         # Tab context refresh script
│   └── streamCpp.ts                 # StreamCpp implementation script
├── dist/                            # Build output (generated)
├── package.json                     # Extension manifest
├── tsconfig.extension.json          # TypeScript configuration for extension
├── .gitignore                       # Git ignore patterns
├── .vscodeignore                    # VSIX packaging ignore patterns
├── README.md                        # Main documentation
├── DEVELOPMENT.md                   # This file
├── INSTALL.md                        # Installation instructions
└── VS_CODE_EXTENSION_USAGE.md       # User guide
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HenkDz/cursor-uncianed-vscode-extension.git
cd cursor-uncianed-vscode-extension
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Development dependencies (TypeScript, VS Code API types, vsce packaging tool)
- Runtime dependencies (protobufjs for encoding/decoding protobuf messages)

### 3. Verify Installation

```bash
# Check if TypeScript compiler is available
npx tsc --version

# Check if vsce (VS Code Extension Manager) is available
npx vsce --version
```

### 4. Open in VS Code

```bash
code .
```

---

## 🔨 Building the Extension

### Quick Build

```bash
npm run vscode:build
```

This will:
1. Compile TypeScript files using `tsconfig.extension.json`
2. Copy protobuf files to `dist/protobuf/`
3. Copy necessary dependencies (protobuf library)
4. Create the CommonJS entrypoint `extension.cjs`
5. Output all files to the `dist/` directory

### Full Build and Package

```bash
# Build the extension
npm run vscode:build

# Package as .vsix file
npm run vscode:package
```

The packaged `.vsix` file will be created in the root directory (e.g., `cursor-unchained-0.0.3.vsix`).

### Watch Mode (for Development)

```bash
npm run watch
```

This will recompile TypeScript files automatically when you save changes.

---

## 🔄 Development Workflow

### Recommended Workflow

1. **Make changes to source code**
   - Edit files in `src/` directory
   - Changes are automatically recompiled if using watch mode

2. **Test in Extension Host**
   - Press `F5` in VS Code
   - A new VS Code window (Extension Development Host) will open
   - Your extension is automatically loaded

3. **Debugging**
   - Set breakpoints in your source code
   - The debugger will attach to the Extension Development Host
   - Check the Debug Console for logs

4. **Make adjustments**
   - Make code changes
   - Save files
   - Reload the Extension Development Host:
     - Press `Ctrl+R` (Windows/Linux) or `Cmd+R` (Mac)
     - Or click the reload button in the toolbar

5. **Package for distribution**
   - When ready: `npm run vscode:package`
   - Test the `.vsix` file by installing it in a fresh VS Code instance

### Development Tips

- Use `console.log()` for debugging (output appears in the Debug Console or Output panel)
- Clean build: Delete `dist/` folder and run the build command again
- Check the Output panel channel "Cursor Unchained" for runtime logs

---

## 🧪 Testing

### Manual Testing

1. **Install the extension**
   ```bash
   # From .vsix file
   code --install-extension cursor-unchained-0.0.3.vsix --force
   ```

2. **Configure credentials**
   - Get credentials from Cursor (see INSTALL.md)
   - Use `Credentials Manager: Configure Cursor API Credentials` command
   - Or set via VS Code Settings

3. **Test completions**
   - Open a file (e.g., `test.js`)
   - Start typing code
   - Verify grey text appears
   - Press Tab to accept

### Testing Checklist

- [ ] Extension activates on startup
- [ ] Credentials can be set via configuration panel
- [ ] Credentials can be set via VS Code Settings
- [ ] Inline completions appear when typing
- [ ] Tab key accepts completions
- [ ] Completions work in different languages (JS, TS, Python, etc.)
- [ ] Manual trigger (`Ctrl+Space`) works
- [ ] Configuration info command displays correct values
- [ ] Debounce delay is respected
- [ ] Model selection (fast/slow) works

### Testing API Integration

1. **Get fresh credentials from Cursor**
   - Open Cursor IDE
   - Open Developer Tools → Network tab
   - Trigger a completion
   - Copy headers from `StreamCpp` request

2. **Set credentials in extension**
   ```json
   {
     "cursorUnchained.cursorBearerToken": "eyJhbGci...",
     "cursorUnchained.cursorClientVersion": "2.2.44",
     "cursorUnchained.requestId": "bf276c83...",
     "cursorUnchained.sessionId": "f711500d..."
   }
   ```

3. **Monitor Output panel**
   - View → Output
   - Select "Cursor Unchained"
   - Look for:
     - API request logs
     - Response chunks
     - Error messages

---

## 📚 Understanding the Code

### Extension Entry Point (`extension.ts`)

This is the main file that:
- Registers the `InlineCompletionItemProvider`
- Registers VS Code commands
- Activates the extension

Key functions:
- `activate(context: ExtensionContext)` - Called when extension is activated
- `deactivate()` - Called when extension is deactivated

### Completion Provider (`cursorCompletionProvider.ts`)

Implements the `InlineCompletionItemProvider` interface:
- `provideInlineCompletionItems()` - Called when user triggers completion
- Handles debouncing
- Initiates API requests
- Returns completion items

### API Client (`cursorApiClient.ts`)

Handles communication with Cursor's API:
- Encodes request data using protobuf
- Sends HTTPS requests to `https://us-only.gcpp.cursor.sh`
- Decodes streaming protobuf responses
- Manages authentication headers

### Protobuf Integration

The extension uses **protobufjs** for serialization:

1. **Protocol Buffers** - Used by Cursor's API for efficient data transfer
2. **Generators** - `.proto` files define the message structure
3. **Type Generation** - `.d.ts` files provide TypeScript types
4. **Encoding/Decoding** - `streamCpp.ts` handles the transformation

### Default Payloads (`constants.ts`)

Contains default values used in API requests:
- Model name (fast/slow)
- Language settings
- Other Cursor API parameters

---

## 🛠 Common Tasks

### Adding a New Configuration Option

1. **Update `extension.ts`**
   ```typescript
   const config = vscode.workspace.getConfiguration('cursorUnchained');
   const myNewOption = config.get<string>('myNewOption', 'default');
   ```

2. **Add to `package.json`**
   ```json
   "configuration": {
     "properties": {
       "cursorUnchained.myNewOption": {
         "type": "string",
         "default": "defaultValue",
         "description": "Description of the new option"
       }
     }
   }
   ```

### Adding a New Command

1. **Register in `extension.ts`**
   ```typescript
   context.subscriptions.push(
     vscode.commands.registerCommand('cursorUnchained.myCommand', async () => {
       // Command logic here
     })
   );
   ```

2. **Add to `package.json`**
   ```json
   "commands": [
     {
       "command": "cursorUnchained.myCommand",
       "title": "My New Command",
       "category": "Cursor Unchained"
     }
   ]
   ```

### Modifying the Completion Logic

Edit `cursorCompletionProvider.ts`:
- Change debounce logic in the `Debouncer` class
- Modify API request parameters
- Adjust completion item handling
- Customize how completions are displayed

### Updating Protobuf Definitions

1. **Edit `.proto` files** in `protobuf/` directory
2. **Regenerate types** (if needed):
   ```bash
   # Use protobufjs cli
   npx pbjs -t static-module -w commonjs -o lib/types/proto.js protobuf/*.proto
   npx pbts -o lib/types/proto.d.ts lib/types/proto.js
   ```
3. **Update `extension-proto.ts`** with any new types

### Changing the API Endpoint

Edit `cursorApiClient.ts`:
```typescript
private static readonly API_URL = 'https://your-new-url.com';
```

---

## 🐛 Troubleshooting

### Build Errors

**TypeScript compilation fails:**
- Check `tsconfig.extension.json` configuration
- Ensure all dependencies are installed
- Verify Node.js version is >= 18

**Missing protobuf types:**
- Run protobuf generation commands (see above)
- Ensure protobuf files exist in `protobuf/` directory

### Runtime Errors

**Extension doesn't activate:**
- Check `Activation Events` in `package.json`
- Review Output panel for errors
- Verify `engines.vscode` version requirement

**Completions not working:**
- Verify credentials are set correctly
- Check internet connection
- Review API errors in Output panel
- Ensure Cursor account is active

**API request fails:**
- Check credentials (Bearer Token may be expired)
- Verify API URL is correct
- Check firewall/proxy settings
- Review Cursor API status (if known)

### Debugging Tips

1. **Enable debug logging:**
   - Add `console.log()` statements
   - Check Debug Console and Output panel

2. **Use VS Code debugger:**
   - Set breakpoints in your code
   - Press `F5` to start Extension Host
   - Debug your extension in the new window

3. **Inspect API requests:**
   - Use network monitoring tools
   - Check request headers and payloads
   - Verify protobuf encoding/decoding

### Common Issues

**Issue:** "Cannot find module 'protobufjs'"
**Solution:** Run `npm install` to install dependencies

**Issue:** "Property 'provideInlineCompletionItems' does not exist"
**Solution:** Ensure VS Code version is >= 1.107.0

**Issue:** Protobuf decoding fails
**Solution:** Verify protobuf files are compatible with Cursor API

**Issue:** Extension builds but doesn't install
**Solution:** Check `.vscodeignore` to ensure all required files are included

---

## 📖 Additional Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Protocol Buffers Documentation](https://developers.google.com/protocol-buffers)
- [protobufjs Documentation](https://github.com/protobufjs/protobuf.js)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines

- Write clear commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure build passes before submitting

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

---

**Happy hacking! 🎉**
