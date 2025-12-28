# Quick Installation Guide - Cursor Unchained VS Code Extension

## 🎉 Your extension is ready!

Location: `cursor-unchained-0.0.1.vsix` (274.45 KB)

## Installation Steps

### Step 1: Install the Extension in VS Code

**Option A: Via VS Code UI (Recommended)**

1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open Command Palette
3. Type `Extensions: Install from VSIX...` and press Enter
4. Navigate to this folder: `E:\Projects\cursor-unchained\cursor-unchained\`
5. Select the file: `cursor-unchained-0.0.1.vsix`
6. Wait for installation to complete
7. **Restart VS Code** (required!)

**Option B: Via Command Line**

```bash
code --install-extension cursor-unchained-0.0.1.vsix --force
```

Then restart VS Code.

### Step 2: Get Your Cursor API Credentials

Before using the extension, you need credentials from Cursor:

1. **Open Cursor IDE**
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type: `Developer: Open Developer Tools for Extension Host`
4. In Developer Tools, click on the **Network** tab

5. **Trigger a tab completion in Cursor:**
   - Open any file in Cursor
   - Start typing some code (e.g., `function `)
   - Wait for a completion request to appear

6. **Find the request:**
   - Look for `StreamCpp` in the Network tab
   - Click on it
   - Go to **Headers** section

7. **Copy these values:**

   From Request Headers:
   - `Authorization` → Copy the part **after** `Bearer ` (this is your **Bearer Token**)
   - `x-request-id` → Request ID
   - `x-session-id` → Session ID
   - `x-cursor-client-version` → Client Version (e.g., `0.38.0`)

### Step 3: Configure the Extension

1. **Open configuration in VS Code:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type: `Credentials Manager: Configure Cursor API Credentials`
   - Or search for: `cursorUnchained.authenticate`

2. **Fill in the form:**
   - **Bearer Token**: Paste the token you copied (from `Authorization` header)
   - **Client Version**: Paste the version number (e.g., `0.38.0`)
   - **Request ID**: Paste the request ID
   - **Session ID**: Paste the session ID
   - **Model Name**: Leave as `fast` or change to `slow`
   - **Debounce Delay**: 300 (milliseconds to wait before requesting)

3. **Click "Save Configuration"**

### Step 4: Test It!

1. Create or open a file in VS Code
2. Start typing code (e.g., `function hello`)
3. You should see grey text appear automatically with suggestions
4. Press **Tab** to accept the suggestion
5. 🎉 Enjoy Cursor's amazing completions in VS Code!

## Usage Tips

### Manual Trigger
If completions don't appear automatically:
- Press `Ctrl+Space` to trigger inline completion
- Or use command palette: `Cursor Unchained: Trigger Tab Completion`

### Check Configuration
To verify your credentials are set up correctly:
- Press `Ctrl+Shift+P`
- Type: `Cursor Unchained: Show Configuration Info`

### Model Choice
- **Fast**: Quicker responses, good for most cases
- **Slow**: More accurate but takes longer to respond

## Features

✅ **Real-time tab completions** - Just like in Cursor!
✅ **Inline suggestions** - Grey text shows completions as you type
✅ **Multiple languages** - JavaScript, TypeScript, Python, Go, and more
✅ **Configurable** - Fast/slow model, adjustable debounce delay
✅ **Easy auth** - Simple configuration panel
✅ **Stream API** - Real streaming from Cursor's API

## Troubleshooting

### Completions not showing?

1. **Check credentials:**
   - Run `Cursor Unchained: Show Configuration Info`
   - Make sure all fields are filled

2. **Check the Output panel:**
   - View → Output
   - Select "Cursor Unchained" from the dropdown
   - Look for error messages

3. **Verify Cursor account:**
   - Make sure you're logged into Cursor
   - Credentials expire over time - get fresh ones if needed

### Network issues?

The extension connects to: `https://us-only.gcpp.cursor.sh`

Make sure:
- ✅ You have internet connection
- ✅ Firewall isn't blocking the URL
- ✅ No proxy issues

### Credentials expired?

Get fresh credentials from Cursor Developer Tools (Step 2 above).

## Advanced Configuration

You can also configure via VS Code Settings:

1. Press `Ctrl+,` to open Settings
2. Search for `cursorUnchained`
3. Adjust any of these settings:
   - `cursorUnchained.cursorBearerToken`
   - `cursorUnchained.cursorClientVersion`
   - `cursorUnchained.requestId`
   - `cursorUnchained.sessionId`
   - `cursorUnchained.modelName` (fast/slow)
   - `cursorUnchained.debounceDelay` (milliseconds)

## File Structure

```
cursor-unchained/
├── cursor-unchained-0.0.1.vsix  ← Install this!
├── VS_CODE_EXTENSION_USAGE.md      ← Full documentation
├── src/
│   └── extension/
│       ├── extension.ts            ← Main entry point
│       ├── cursorCompletionProvider.ts  ← Completion logic
│       └── cursorApiClient.ts      ← API client
└── package.json
```

## Support

- 📖 Full docs: `VS_CODE_EXTENSION_USAGE.md`
- 🐛 Issues: Check Output panel in VS Code
- 💡 Tips: Use "fast" model for speed, "slow" for accuracy

**Enjoy Cursor's tab completions in VS Code! 🚀**
