# Cursor Unchained - VS Code Extension

Bring Cursor's Tab complete to VS Code!

## Installation

### Option 1: Install from .vsix file

1. The extension has been packaged as `cursor-unchained-0.0.1.vsix`
2. In VS Code, press `Ctrl+Shift+P` to open the Command Palette
3. Select `Extensions: Install from VSIX...`
4. Navigate to and select the `.vsix` file
5. Restart VS Code

### Option 2: Manual Installation via Command Line

If you have the `code` command in your PATH:

```bash
code --install-extension cursor-unchained-0.0.1.vsix --force
```

Then restart VS Code.

## Setup

### Step 1: Get Cursor API Credentials

You'll need to obtain API credentials from Cursor:

1. Open Cursor (the IDE)
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the Command Palette
3. Type `Developer: Open Developer Tools for Extension Host` and press Enter
4. In the Developer Tools, go to the **Network** tab
5. In Cursor, trigger a tab completion by typing some code
6. Look for a request called `StreamCpp` (path: `/aiserver.v1.AiService/StreamCpp`) in the Network tab
7. Click on the request and copy the following values from the **Request Headers**:

| Request Header | Config Field | Example |
|---------------|--------------|---------|
| `authorization` | **Bearer Token** | Copy the part after `Bearer ` (e.g., `eyJhbGci...Rbo`) |
| `x-request-id` | **Request ID** | `bf276c83-41c1-4ebc-9932-5adeede37550` |
| `x-session-id` | **Session ID** | `f711500d-8f46-40d7-93c5-5b860e2fd39f` |
| `x-cursor-client-version` | **Client Version** | `2.2.44` |

**Note**: The Bearer Token is a JWT that may expire. If completions stop working, you may need to refresh these credentials.

### Step 2: Configure in VS Code

1. In VS Code, press `Ctrl+Shift+P` to open the Command Palette
2. Type `Credentials Manager: Configure Cursor API Credentials` (or `cursorUnchained.authenticate`)
3. A configuration panel will open as a webview
4. Fill in the following fields:
   - **Bearer Token**: The JWT token from the `authorization` header (everything after `Bearer `)
   - **Client Version**: The version from `x-cursor-client-version` header (e.g., `2.2.44`)
   - **Request ID**: The value from `x-request-id` header
   - **Session ID**: The value from `x-session-id` header
5. Click **Save Configuration**

### Alternative: Manual Configuration

You can also configure via VS Code settings:

1. Press `Ctrl+,` to open Settings
2. Search for `cursorUnchained`
3. Fill in the required fields in the `Cursor Unchained` section

## Usage

### Basic Tab Completion

1. Open any file in VS Code
2. Start typing code
3. Tab completion suggestions will appear automatically in grey text
4. Press `Tab` to accept the suggestion

### Manual Trigger

1. Place your cursor where you want a completion
2. Press `Ctrl+Space` (the default VS Code inline completion trigger)
3. Or use the command `Cursor Unchained: Trigger Tab Completion`

### Configuration Options

You can adjust the following settings in VS Code Settings under `Cursor Unchained`:

- **Model Name**: `fast` (faster, less accurate) or `slow` (more accurate, slower)
- **Debounce Delay**: Time in milliseconds to wait before requesting completion (default: 300ms)

## Commands

The extension provides the following commands:

- `Credentials Manager: Configure Cursor API Credentials` - Open the credentials configuration panel
- `Cursor Unchained: Show Configuration Info` - Display current configuration status
- `Cursor Unchained: Trigger Tab Completion` - Manually trigger tab completion

## Troubleshooting

### Completions not appearing

1. Check if your Cursor API credentials are properly configured:
   - Run `Cursor Unchained: Show Configuration Info` command
   - Ensure all required fields are filled and valid

2. Verify your Cursor account is active and you're logged in

3. Check the VS Code Output panel (`View` > `Output`) for any error messages

### Credentials expired

The Cursor session credentials may expire over time. If completions stop working:

1. Follow the "Get Cursor API Credentials" steps again
2. Update your credentials using the Configuration panel

### Network issues

The extension connects to `https://us-only.gcpp.cursor.sh`. Ensure:
- You have internet connectivity
- Your firewall doesn't block this URL
- You're not behind a corporate proxy that blocks the connection

## Development

### Building the Extension

```bash
npm run vscode:build
```

### Packaging the Extension

```bash
npm run vscode:package
```

### Testing the Extension

```bash
# After building, use F5 to launch VS Code with the extension
# or install from the generated .vsix file
```

## How It Works

1. The extension uses VS Code's `InlineCompletionItemProvider` API
2. As you type, it captures the document content and cursor position
3. It sends requests to Cursor's `StreamCpp` API endpoint
4. The API returns completion suggestions in real-time
5. Suggestions are displayed as inline completions (grey text)
6. Pressing Tab accepts the suggestion

## Requirements

- VS Code version 1.107.0 or higher
- A Curor account (for API access)
- Internet connection (for API requests)

## License

MIT

## Contributions

Contributions are welcome! Please feel free to submit issues or pull requests.

## Credits

This project is inspired by Cursor's excellent tab completion feature and aims to bring it to VS Code.
