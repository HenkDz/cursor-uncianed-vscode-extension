// VSCode Extension version of protobuf types
// This is a simplified version for the extension build

export interface CursorPosition {
  line: number;
  column: number;
}

export interface Position {
  line: number;
  column: number;
}

export interface Range {
  startPosition: Position;
  endPosition: Position;
}

export interface Selection {
  startLine?: number;
  startColumn?: number;
  endLine?: number;
  endColumn?: number;
}

export interface DataFrame {}

export interface Diagnostic {}

export interface TopChunk {}

export interface Cell {}

export interface CurrentFileInfo {
  relativeWorkspacePath: string;
  contents: string;
  cursorPosition: CursorPosition;
  dataframes: DataFrame[];
  languageId: string;
  selection?: Selection;
  diagnostics: Diagnostic[];
  totalNumberOfLines: number;
  contentsStartAtLine: number;
  topChunks: TopChunk[];
  alternativeVersionId?: number;
  fileVersion?: number;
  cellStartLines: number[];
  cells: Cell[];
  sha256Hash?: string;
  relyOnFilesync: boolean;
  workspaceRootPath: string;
  lineEnding?: string;
}

export interface FileDiffHistory {
  fileName: string;
  diffHistory: string[];
  diffHistoryTimestamps: number[];
}

export interface AdditionalFile {
  relativeWorkspacePath: string;
  isOpen: boolean;
  visibleRangeContent: string[];
  lastViewedAt?: number;
  startLineNumberOneIndexed: number[];
  visibleRanges: {
    startLineNumber: number;
    endLineNumberInclusive: number;
  }[];
}

export interface RepositoryInfo {
  relativeWorkspacePath: string;
  remoteUrls?: string[];
  remoteNames?: string[];
  repoName: string;
  repoOwner: string;
  isTracked?: boolean;
  isLocal?: boolean;
  numFiles?: number;
  orthogonalTransformSeed?: number;
  preferredEmbeddingModel?: number;
  workspaceUris?: Record<string, any>;
  preferredDbProvider?: number;
}

export type BlockDiffPatch = {};

export type ContextItem = {};

export type ParameterHint = {};

export type LspContext = {};

export type FilesyncUpdate = {};

export interface LspSuggestion {}

export interface LspSuggestedItems {
  suggestions: LspSuggestion[];
}

export interface CppIntentInfo {
  source: string;
}

export enum ControlToken {
  UNSPECIFIED = 0,
  QUIET = 1,
  LOUD = 2,
  OP = 3,
}

export interface CodeBlock {
  relativeWorkspacePath: string;
  range: Range;
  contents: string;
}

export interface CodeResult {
  codeBlock: CodeBlock;
  score: number;
}

export interface StreamCppRequest {
  currentFile: CurrentFileInfo;
  diffHistory: string[];
  modelName?: string;
  diffHistoryKeys: string[];
  fileDiffHistories: FileDiffHistory[];
  mergedDiffHistories: FileDiffHistory[];
  blockDiffPatches: BlockDiffPatch[];
  isNightly?: boolean;
  giveDebugOutput?: boolean;
  contextItems: ContextItem[];
  parameterHints: ParameterHint[];
  lspContexts: LspContext[];
  cppIntentInfo?: CppIntentInfo;
  enableMoreContext?: boolean;
  workspaceId?: string;
  additionalFiles: AdditionalFile[];
  controlToken?: ControlToken;
  clientTime?: number;
  filesyncUpdates: FilesyncUpdate[];
  timeSinceRequestStart: number;
  timeAtRequestSend: number;
  clientTimezoneOffset?: number;
  lspSuggestedItems?: LspSuggestedItems;
  supportsCpt?: boolean;
  supportsCrlfCpt?: boolean;
  codeResults: CodeResult[];
}

export interface RangeToReplace {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface ModelInfo {
  isFusedCursorPredictionModel: boolean;
  isMultidiffModel: boolean;
}

export interface StreamCppResponse {
  text?: string;
  suggestionStartLine?: number;
  suggestionConfidence?: number;
  doneStream?: boolean;
  debugModelOutput?: string;
  debugModelInput?: string;
  debugStreamTime?: string;
  debugTotalTime?: string;
  debugTtftTime?: string;
  debugServerTiming?: string;
  rangeToReplace?: RangeToReplace;
  doneEdit?: boolean;
  modelInfo?: ModelInfo;
}

export interface ProtoType {
  encode(message: any): { finish(): Uint8Array };
  decode(buffer: Uint8Array | Buffer): any;
  verify(message: object): string | null;
  create(properties: object): any;
}

export interface StreamCppResult {
  status: number | undefined;
  contentType: string;
  modelInfo: ModelInfo | null;
  rangeToReplace: RangeToReplace | null;
  text: string;
  doneEdit: boolean;
  doneStream: boolean;
  debug: {
    modelOutput: string | undefined;
    modelInput: string | undefined;
    streamTime: string | undefined;
    ttftTime: string | undefined;
  } | null;
  trailer: any;
  error: any;
}
