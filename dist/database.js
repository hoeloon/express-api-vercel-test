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
exports.connectToDatabase = exports.collections = exports.run = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URI = process.env.DATABASE_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield exports.client.connect();
            // Send a ping to confirm a successful connection
            yield exports.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield exports.client.close();
        }
    });
}
exports.run = run;
// run().catch(console.dir);
exports.collections = {};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbName = "test-vercel";
            const collectionName = "user";
            yield exports.client.connect();
            const db = exports.client.db(dbName);
            const userCollection = db.collection(collectionName);
            exports.collections.user = userCollection;
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map