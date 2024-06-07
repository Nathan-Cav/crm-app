"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import fs from 'node:fs';
// import path from 'node:path';
const app = (0, express_1.default)();
const port = process.env.PORT || 3055;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Congratulations! You have successfully started the server');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port} or http://127.0.0.1:${port}`);
});
