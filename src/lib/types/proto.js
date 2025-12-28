"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlToken = exports.Severity = exports.DbProvider = exports.EmbeddingModel = void 0;
var EmbeddingModel;
(function (EmbeddingModel) {
    EmbeddingModel[EmbeddingModel["UNSPECIFIED"] = 0] = "UNSPECIFIED";
})(EmbeddingModel || (exports.EmbeddingModel = EmbeddingModel = {}));
var DbProvider;
(function (DbProvider) {
    DbProvider[DbProvider["UNSPECIFIED"] = 0] = "UNSPECIFIED";
})(DbProvider || (exports.DbProvider = DbProvider = {}));
var Severity;
(function (Severity) {
    Severity[Severity["UNSPECIFIED"] = 0] = "UNSPECIFIED";
})(Severity || (exports.Severity = Severity = {}));
var ControlToken;
(function (ControlToken) {
    ControlToken[ControlToken["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    ControlToken[ControlToken["QUIET"] = 1] = "QUIET";
    ControlToken[ControlToken["LOUD"] = 2] = "LOUD";
    ControlToken[ControlToken["OP"] = 3] = "OP";
})(ControlToken || (exports.ControlToken = ControlToken = {}));
//# sourceMappingURL=proto.js.map