"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static('uploads'));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/api/documents', documentRoutes_1.default);
const port = 9000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
