"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var headers_1 = __importDefault(require("./headers/headers"));
var handle_1 = require("./handle/handle");
var postMethod_1 = require("./models/postMethod");
dotenv_1.default.config({
    path: "config.env"
});
var requestListener = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, postMethod, _a, requestData, error_1, errorStr, result, error_2, postMethod, id, _b, requestData, error_3, errorStr, result, error_4, errorStr;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (req.url === '/todo' && req.method === "OPTIONS") {
                    res.writeHead(200, headers_1.default);
                    res.write(JSON.stringify({
                        "status": 200
                    }));
                    res.end();
                    return [2 /*return*/];
                }
                body = "";
                req.on("data", function (chunk) { return body += chunk; });
                return [4 /*yield*/, new Promise(function (resolve) {
                        req.on("end", resolve);
                    })];
            case 1:
                _d.sent();
                if (!(req.url === '/todo')) return [3 /*break*/, 21];
                postMethod = new postMethod_1.PostMethod();
                _a = req.method;
                switch (_a) {
                    case "GET": return [3 /*break*/, 2];
                    case "POST": return [3 /*break*/, 4];
                    case "DELETE": return [3 /*break*/, 13];
                }
                return [3 /*break*/, 19];
            case 2: return [4 /*yield*/, (0, handle_1.successHandle)(req, res)];
            case 3:
                _d.sent();
                return [3 /*break*/, 20];
            case 4:
                _d.trys.push([4, 7, , 12]);
                requestData = JSON.parse(body);
                return [4 /*yield*/, postMethod.doPost(requestData)];
            case 5:
                _d.sent();
                return [4 /*yield*/, (0, handle_1.successHandle)(req, res)];
            case 6:
                _d.sent();
                return [3 /*break*/, 12];
            case 7:
                error_1 = _d.sent();
                errorStr = error_1;
                if (!(typeof errorStr !== "string")) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, "格式錯誤")];
            case 8:
                _d.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, errorStr)];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11: return [3 /*break*/, 12];
            case 12: return [3 /*break*/, 20];
            case 13:
                _d.trys.push([13, 16, , 18]);
                return [4 /*yield*/, postMethod.doDeleteAll()];
            case 14:
                result = _d.sent();
                return [4 /*yield*/, (0, handle_1.successHandle)(req, res)];
            case 15:
                _d.sent();
                return [3 /*break*/, 18];
            case 16:
                error_2 = _d.sent();
                return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, "刪除失敗")];
            case 17:
                _d.sent();
                return [3 /*break*/, 18];
            case 18: return [3 /*break*/, 20];
            case 19:
                (0, handle_1.errorHandle)(req, res, "路由錯誤");
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
            case 21:
                if (!((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/todo/'))) return [3 /*break*/, 42];
                postMethod = new postMethod_1.PostMethod();
                id = req.url.split('/').pop();
                _b = req.method;
                switch (_b) {
                    case "PATCH": return [3 /*break*/, 22];
                    case "DELETE": return [3 /*break*/, 31];
                }
                return [3 /*break*/, 40];
            case 22:
                _d.trys.push([22, 25, , 30]);
                requestData = JSON.parse(body);
                return [4 /*yield*/, postMethod.updateOneData(id, requestData)];
            case 23:
                _d.sent();
                return [4 /*yield*/, (0, handle_1.successHandle)(req, res)
                    // await errorHandle(req, res, "輸入內容有問題無法登錄")
                ];
            case 24:
                _d.sent();
                return [3 /*break*/, 30];
            case 25:
                error_3 = _d.sent();
                errorStr = error_3;
                if (!(typeof errorStr !== "string")) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, "格式錯誤")];
            case 26:
                _d.sent();
                return [3 /*break*/, 29];
            case 27: return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, errorStr)];
            case 28:
                _d.sent();
                _d.label = 29;
            case 29: return [3 /*break*/, 30];
            case 30: return [3 /*break*/, 41];
            case 31:
                _d.trys.push([31, 34, , 39]);
                return [4 /*yield*/, postMethod.doDeleteOne(id)];
            case 32:
                result = _d.sent();
                return [4 /*yield*/, (0, handle_1.successHandle)(req, res)];
            case 33:
                _d.sent();
                return [3 /*break*/, 39];
            case 34:
                error_4 = _d.sent();
                errorStr = error_4;
                if (!(typeof errorStr !== "string")) return [3 /*break*/, 36];
                return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, "格式錯誤")];
            case 35:
                _d.sent();
                return [3 /*break*/, 38];
            case 36: return [4 /*yield*/, (0, handle_1.errorHandle)(req, res, errorStr)];
            case 37:
                _d.sent();
                _d.label = 38;
            case 38: return [3 /*break*/, 39];
            case 39: return [3 /*break*/, 41];
            case 40:
                (0, handle_1.errorHandle)(req, res, "路由錯誤");
                return [3 /*break*/, 41];
            case 41: return [2 /*return*/];
            case 42:
                (0, handle_1.errorHandle)(req, res, "無此路由");
                return [2 /*return*/];
        }
    });
}); };
var server = http_1.default.createServer(requestListener);
var _a = process.env, PORT = _a.PORT, DATABASE = _a.DATABASE, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
var url = DATABASE === null || DATABASE === void 0 ? void 0 : DATABASE.replace("<password>", DATABASE_PASSWORD);
mongoose_1.default.connect(url).then(function () {
    console.log("database connected.");
});
server.listen(PORT);
