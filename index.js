const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const {initailizeDatabase} = require("./db.connect/db.connect");
const {Todo} = require("./models/todo.models");
initailizeDatabase();

app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const todo = await new Todo({ task });
    await todo.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID is required" });
    }

    const deleteTask = await Todo.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task delete successful", deleteTask });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/", (req, res) => {
  res.send("Node server started");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} server connected`);
});
