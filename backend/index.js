import express from "express";
import dotenv from "dotenv";
import { DATABASE_URL, PORT } from "./config.js";
import mongoose from "mongoose";
import { bookModel } from "./models/bookModel.js";

dotenv.config();
const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log("App is listening on Port");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    const book = await bookModel.create({ title, author, publishYear });

    return res.send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await bookModel.find({});

    return res.json(books);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});
