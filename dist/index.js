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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
dotenv_1.default.config();
console.log("start");
console.log(".env", process.env.DATABASE_URI);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, database_1.connectToDatabase)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server dev");
});
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.collections.user.find({}).toArray();
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.get("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            name: "john",
            age: 31
        };
        const result = yield database_1.collections.user.insertOne(data);
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map