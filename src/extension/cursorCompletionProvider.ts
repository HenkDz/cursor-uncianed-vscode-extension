import * as vscode from 'vscode';
import * as https from 'node:https';
import * as path from 'node:path';
import protobuf from 'protobufjs';
import type {
	StreamCppRequest,
	ProtoType,
} from '../lib/types/extension-proto';
import { defaultStreamCppPayload } from '../lib/constants';

class CompletionRequest {
	public pending: boolean = false;
	public controller: AbortController | null = null;
	constructor(
		public text: string,
		public position: vscode.Position,
		public document: vscode.TextDocument
	) {}
}

export class CursorCompletionProvider implements vscode.InlineCompletionItemProvider {
	private requests: Map<string, CompletionRequest> = new Map();
	private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
	private lastCompletionText: Map<string, string> = new Map();

	async provideInlineCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		context: vscode.InlineCompletionContext,
		token: vscode.CancellationToken
	): Promise<vscode.InlineCompletionList | undefined> {
		const config = vscode.workspace.getConfiguration('cursorUnchained');
		const bearerToken = config.get<string>('cursorBearerToken', '');

		if (!bearerToken || bearerToken.length === 0) {
			return undefined;
		}

		const documentKey = document.uri.toString();

		// Cancel any pending request for this document
		this.cancelPendingRequest(documentKey);

		// Get the current line text and position info
		const lineText = document.lineAt(position.line).text;
		const textPrefix = lineText.substring(0, position.character);

		// Don't trigger if we're just selecting text (check if there's a non-empty selection)
		const selection = document.getText(document.getWordRangeAtPosition(position));
		if (context.triggerKind === vscode.InlineCompletionTriggerKind.Invoke && selection) {
			// Allow invoke trigger even with word at cursor
		}

		// Create new request
	 const request = new CompletionRequest(textPrefix, position, document);
		this.requests.set(documentKey, request);

		const debounceDelay = config.get<number>('debounceDelay', 300);

		return new Promise<vscode.InlineCompletionList | undefined>((resolve) => {
			const timer = setTimeout(async () => {
				// Check if cancelled
				if (token.isCancellationRequested) {
					this.clearRequest(documentKey);
					resolve(undefined);
					return;
				}

				try {
					const completionText = await this.fetchCompletion(document, position, textPrefix);
					if (!completionText || completionText.length === 0) {
						this.clearRequest(documentKey);
						resolve(undefined);
						return;
					}

					// Store the last completion for this document
					this.lastCompletionText.set(documentKey, completionText);

					const items = [
						new vscode.InlineCompletionItem(completionText, new vscode.Range(position, position))
					];

					this.clearRequest(documentKey);
					resolve({ items });
				} catch (error) {
					console.error('Cursor completion error:', error);
					this.clearRequest(documentKey);
					resolve(undefined);
				}
			}, debounceDelay);

			this.debounceTimers.set(documentKey, timer);

			// Handle cancellation
			token.onCancellationRequested(() => {
				this.cancelPendingRequest(documentKey);
				resolve(undefined);
			});
		});
	}

	private cancelPendingRequest(documentKey: string): void {
		const request = this.requests.get(documentKey);
		if (request && request.controller) {
			request.controller.abort();
		}
		this.requests.delete(documentKey);

		const timer = this.debounceTimers.get(documentKey);
		if (timer) {
			clearTimeout(timer);
			this.debounceTimers.delete(documentKey);
		}
	}

	private clearRequest(documentKey: string): void {
		this.requests.delete(documentKey);
		const timer = this.debounceTimers.get(documentKey);
		if (timer) {
			clearTimeout(timer);
			this.debounceTimers.delete(documentKey);
		}
	}

	private async fetchCompletion(
		document: vscode.TextDocument,
		position: vscode.Position,
		textPrefix: string
	): Promise<string> {
		const config = vscode.workspace.getConfiguration('cursorUnchained');

		const bearerToken = config.get<string>('cursorBearerToken', '');
		const clientVersion = config.get<string>('cursorClientVersion', '0.38.0');
		const requestId = config.get<string>('requestId', '');
		const sessionId = config.get<string>('sessionId', '');
		const modelName = config.get<string>('modelName', 'fast');

		if (!bearerToken) {
			throw new Error('Cursor Bearer Token not configured');
		}

		// Get the full document text
		const fullText = document.getText();
		const cursorOffset = document.offsetAt(position);

		// Calculate line and column (0-indexed for API)
		const cursorLine = position.line;
		const cursorColumn = position.character;

		// Create payload
		const newPayload = { ...defaultStreamCppPayload };
		newPayload.currentFile = {
			...defaultStreamCppPayload.currentFile,
			contents: fullText,
			cursorPosition: {
				line: cursorLine,
				column: cursorColumn
			},
			languageId: document.languageId,
			relativeWorkspacePath: document.fileName,
			totalNumberOfLines: document.lineCount
		};
		newPayload.modelName = modelName;
		newPayload.timeAtRequestSend = Date.now();
		newPayload.clientTime = Date.now();
		newPayload.timeSinceRequestStart = Date.now();
		newPayload.additionalFiles = [];

		return new Promise<string>((resolve, reject) => {
			const payload: StreamCppRequest = newPayload;

			const protoDirPath = __dirname ? path.join(__dirname, '..', 'protobuf') : './protobuf';

			protobuf.load(`${protoDirPath}/streamCppRequest.proto`).then(requestRoot => {
				const Request = requestRoot.lookupType('aiserver.v1.StreamCppRequest') as unknown as ProtoType;
				const protoBuffer = Buffer.from(Request.encode(Request.create(payload)).finish());

				const envelope = Buffer.alloc(5 + protoBuffer.length);
				envelope.writeUInt8(0, 0);
				envelope.writeUInt32BE(protoBuffer.length, 1);
				protoBuffer.copy(envelope, 5);

				const url = new URL('https://us-only.gcpp.cursor.sh:443/aiserver.v1.AiService/StreamCpp');

				const options: https.RequestOptions = {
					hostname: url.hostname,
					port: url.port || 443,
					path: url.pathname,
					method: 'POST',
					headers: {
						'connect-accept-encoding': 'gzip',
						'connect-content-encoding': 'gzip',
						'connect-protocol-version': '1',
						'content-type': 'application/connect+proto',
						'x-cursor-client-type': 'ide',
						'x-cursor-client-version': clientVersion,
						'x-cursor-streaming': 'true',
						'x-request-id': requestId,
						'x-session-id': sessionId,
						'Authorization': `Bearer ${bearerToken}`,
						'Content-Length': envelope.length
					}
				};

				return protobuf.load(`${protoDirPath}/streamCppResponse.proto`).then(responseRoot => {
					const Response = responseRoot.lookupType('aiserver.v1.StreamCppResponse') as unknown as ProtoType;

					const req = https.request(options, (res) => {
						let dataBuffer = Buffer.alloc(0);
						let resultText = '';

						res.on('data', (chunk: Buffer) => {
							dataBuffer = Buffer.concat([dataBuffer, chunk]);

							// Parse Connect protocol envelopes: 1 byte flags + 4 bytes length + message
							while (dataBuffer.length >= 5) {
								const flags = dataBuffer.readUInt8(0);
								const msgLen = dataBuffer.readUInt32BE(1);

								// Check if we have the full message
								if (dataBuffer.length < 5 + msgLen) {
									break; // Wait for more data
								}

								const msgData = dataBuffer.slice(5, 5 + msgLen);
								dataBuffer = dataBuffer.slice(5 + msgLen);

								// flags & 0x02 means it's a trailer/end-stream frame (JSON)
								if (flags & 0x02) {
									const trailer = JSON.parse(msgData.toString('utf8'));

									// Check if stream is complete
									if (trailer.done_stream || trailer.doneStream) {
										req.destroy();
										resolve(resultText);
										return;
									}
									continue;
								}

								// Regular data frame - decode protobuf
								try {
									const decoded = Response.decode(msgData) as any;

									// Extract text from response
									if (decoded.text) {
										resultText += decoded.text;
									}

									// Check if stream is complete
									if (decoded.done_stream || decoded.doneStream) {
										req.destroy();
										resolve(resultText);
										return;
									}
								} catch (e) {
									console.error('Decode error:', e);
								}
							}
						});

						res.on('end', () => {
							if (resultText.length > 0) {
								resolve(resultText);
							} else {
								reject(new Error('No completion text received'));
							}
						});

						res.on('error', (err) => {
							reject(err);
						});
					});

					req.on('error', (err) => {
						reject(err);
					});

					req.write(envelope);
					req.end();
				});
			}).catch(reject);
		});
	}
}
