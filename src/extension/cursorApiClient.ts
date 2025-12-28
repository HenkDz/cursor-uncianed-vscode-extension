import * as vscode from 'vscode';

export class CursorApiClient {
	private static instance: CursorApiClient;

	private constructor() {
		// Private constructor for singleton
	}

	static getInstance(): CursorApiClient {
		if (!CursorApiClient.instance) {
			CursorApiClient.instance = new CursorApiClient();
		}
		return CursorApiClient.instance;
	}

	getConfig(): CursorApiConfig {
		const config = vscode.workspace.getConfiguration('cursorUnchained');
		return {
			bearerToken: config.get<string>('cursorBearerToken', ''),
			clientVersion: config.get<string>('cursorClientVersion', '0.38.0'),
			requestId: config.get<string>('requestId', ''),
			sessionId: config.get<string>('sessionId', ''),
			modelName: config.get<string>('modelName', 'fast'),
			debounceDelay: config.get<number>('debounceDelay', 300)
		};
	}

	isConfigured(): boolean {
		const config = this.getConfig();
		return !!config.bearerToken && config.bearerToken.length > 0;
	}
}

export interface CursorApiConfig {
	bearerToken: string;
	clientVersion: string;
	requestId: string;
	sessionId: string;
	modelName: string;
	debounceDelay: number;
}
