import * as vscode from 'vscode';
import { CursorCompletionProvider } from './cursorCompletionProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Cursor Unchained is now active!');

    // Register commands first so they still work even if other initialization fails.
	context.subscriptions.push(
		vscode.commands.registerCommand('cursorUnchained.authenticate', () => {
			authCommand();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('cursorUnchained.showInfo', () => {
			showInfoCommand();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('cursorUnchained.triggerCompletion', () => {
			triggerCompletionCommand();
		})
	);

    // Inline completion provider (best-effort)
    try {
        const completionProvider = new CursorCompletionProvider();
        const providerDisposable = vscode.languages.registerInlineCompletionItemProvider(
            { pattern: '**' },
            completionProvider
        );
        context.subscriptions.push(providerDisposable);
    } catch (error) {
        console.error('Failed to initialize inline completion provider:', error);
    }

	// Show welcome message if not configured
	const config = vscode.workspace.getConfiguration('cursorUnchained');
	if (!config.get('cursorBearerToken')) {
		vscode.window.showInformationMessage(
			'Cursor Unchained: Please configure your Cursor API credentials using the credentials_manager command',
			'Configure Credentials'
		).then(selection => {
			if (selection === 'Configure Credentials') {
				vscode.commands.executeCommand('cursorUnchained.authenticate');
			}
		});
	}
}

function authCommand() {
	const config = vscode.workspace.getConfiguration('cursorUnchained');
	const panel = vscode.window.createWebviewPanel(
		'cursorUnchained.auth',
		'Cursor Unchained Configuration',
		vscode.ViewColumn.One,
		{
			enableScripts: true,
			retainContextWhenHidden: true
		}
	);

	panel.webview.html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursor Unchained Configuration</title>
    <style>
        body {
            padding: 20px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 8px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
        }
        button {
            padding: 10px 20px;
            margin-right: 10px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .help-text {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            margin-top: 5px;
        }
        .success {
            padding: 10px;
            background-color: var(--vscode-notificationsInfoIcon-foreground);
            border-radius: 4px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Cursor Unchained Configuration</h1>
    <p>Configure your Cursor API credentials to enable tab completion in VS Code.</p>

    <div class="form-group">
        <label for="bearerToken">Bearer Token</label>
        <input type="password" id="bearerToken" placeholder="Paste your Cursor bearer token">
        <div class="help-text">Get this from Cursor Developer Tools (Network tab -> StreamCpp -> Request headers -> Authorization)</div>
    </div>

    <div class="form-group">
        <label for="clientVersion">Client Version</label>
        <input type="text" id="clientVersion" placeholder="e.g., 0.38.0" value="${config.get('cursorClientVersion', '')}">
        <div class="help-text">From Cursor Developer Tools (Network tab -> StreamCpp -> x-cursor-client-version)</div>
    </div>

    <div class="form-group">
        <label for="requestId">Request ID</label>
        <input type="text" id="requestId" placeholder="Paste your x-request-id">
        <div class="help-text">From Cursor Developer Tools (Network tab -> StreamCpp -> x-request-id)</div>
    </div>

    <div class="form-group">
        <label for="sessionId">Session ID</label>
        <input type="text" id="sessionId" placeholder="Paste your x-session-id">
        <div class="help-text">From Cursor Developer Tools (Network tab -> StreamCpp -> x-session-id)</div>
    </div>

    <div class="form-group">
        <label for="modelName">Model Name</label>
        <input type="text" id="modelName" placeholder="fast or slow" value="${config.get('modelName', 'fast')}">
        <div class="help-text">fast is faster but less accurate, slow is more accurate but slower</div>
    </div>

    <div class="form-group">
        <label for="debounceDelay">Debounce Delay (ms)</label>
        <input type="number" id="debounceDelay" placeholder="300" value="${config.get('debounceDelay', 300)}">
        <div class="help-text">Delay in milliseconds before requesting completion</div>
    </div>

    <button onclick="saveConfig()">Save Configuration</button>
    <button onclick="closePanel()">Close</button>
    <button onclick="clearConfig()">Clear All</button>

    <div id="successMessage" class="success" style="display: none;">
        Configuration saved successfully!
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function saveConfig() {
            const config = {
                cursorBearerToken: document.getElementById('bearerToken').value,
                cursorClientVersion: document.getElementById('clientVersion').value,
                requestId: document.getElementById('requestId').value,
                sessionId: document.getElementById('sessionId').value,
                modelName: document.getElementById('modelName').value,
                debounceDelay: parseInt(document.getElementById('debounceDelay').value)
            };

            vscode.postMessage({
                command: 'saveConfig',
                config: config
            });
        }

        function closePanel() {
            vscode.postMessage({ command: 'close' });
        }

        function clearConfig() {
            document.getElementById('bearerToken').value = '';
            document.getElementById('requestId').value = '';
            document.getElementById('sessionId').value = '';
        }
    </script>
</body>
</html>
    `;

	panel.webview.onDidReceiveMessage(async (message) => {
		if (message.command === 'saveConfig') {
			await updateConfig(message.config);
			panel.webview.postMessage({ command: 'configSaved' });
		} else if (message.command === 'close') {
			panel.dispose();
		}
	});

	const subscription = panel.webview.onDidReceiveMessage(async (message) => {
		if (message.command === 'saveConfig') {
			await updateConfig(message.config);
			vscode.window.showInformationMessage('Configuration saved successfully!');
		}
	});
}

async function updateConfig(config: any) {
	const workspaceConfig = vscode.workspace.getConfiguration('cursorUnchained');

	await workspaceConfig.update('cursorBearerToken', config.cursorBearerToken, true);
	await workspaceConfig.update('cursorClientVersion', config.cursorClientVersion, true);
	await workspaceConfig.update('requestId', config.requestId, true);
	await workspaceConfig.update('sessionId', config.sessionId, true);
	await workspaceConfig.update('modelName', config.modelName, true);
	await workspaceConfig.update('debounceDelay', config.debounceDelay, true);
}

function showInfoCommand() {
	const config = vscode.workspace.getConfiguration('cursorUnchained');
	const bearerToken = config.get<string>('cursorBearerToken', '');
	const isConfigured = bearerToken && bearerToken.length > 0;

	const info = `
Cursor Unchained Configuration Status:
======================================

Token Configured: ${isConfigured ? '✓ Yes' : '✗ No'}

Current Settings:
- Client Version: ${config.get('cursorClientVersion', 'Not set')}
- Model Name: ${config.get('modelName', 'Not set')}
- Debounce Delay: ${config.get('debounceDelay', 300)}ms

${!isConfigured ? '\n⚠️  Please configure your Cursor API credentials to use tab completion' : '✓ Ready to use!'}
	`;

	vscode.window.showInformationMessage(info);
}

function triggerCompletionCommand() {
	vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
}

export function deactivate() {
	console.log('Cursor Unchained is now deactivated');
}
