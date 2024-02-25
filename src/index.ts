import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { collections, connectToDatabase, run } from "./database";

dotenv.config();
console.log("start")
console.log(".env", process.env.DATABASE_URI)

const app: Express = express();
const port = process.env.PORT || 3000;
connectToDatabase()

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server dev");
});

app.get("/get", async (req: Request, res: Response) => {
  try {
    const user = await collections.user.find({}).toArray()
    res.status(200).send(user);
  } catch (error) { 
    res.status(500).send(error.message);
  }
});


app.get("/post", async (req: Request, res: Response) => {
  try {
    const data = {
      name: "john",
      age: 31
    }
    const result = await collections.user.insertOne(data)
  
    result 
      ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});