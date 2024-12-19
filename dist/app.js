"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const logger_1 = require("./utils/logger");
const connection_1 = __importDefault(require("./database/connection"));
const routers_1 = require("./routers");
const adminSetup_1 = require("./utils/adminSetup");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, connection_1.default)();
(0, adminSetup_1.createDefaultAdmin)();
app.use(express_1.default.json());
app.use('/auth', routers_1.authRouter);
app.use('/refresh', routers_1.refreshRouter);
app.listen(port, () => {
    logger_1.logger.info(`Server running at http://localhost:${port}`);
});
