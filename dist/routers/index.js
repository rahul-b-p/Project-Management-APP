"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshRouter = exports.authRouter = void 0;
var auth_router_1 = require("./auth.router");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_router_1.router; } });
var refresh_router_1 = require("./refresh.router");
Object.defineProperty(exports, "refreshRouter", { enumerable: true, get: function () { return refresh_router_1.router; } });
