const express = require("express");
const router = new express.Router();
const Task = require("../database/model/taskmodel");
// const auth = require("../auth/auth");

//show task page
router.get("/me/task", async (req, res) => {
  res.render("task");
});

//Create task
router.post("/me/task", async (req, res) => {
  try {
    const task = await Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read all task
router.get("/me/mytask", async (req, res) => {
  try {
    const alltask = await Task.find({});
    res.status(200).send(alltask);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read task by id
router.get("/me/mytaskbyid/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id });
    res.status(400).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update task
router.patch("/me/task/:id", async (req, res) => {
  const toUpdate = Object.keys(req.body);
  const allUpdate = toUpdate.includes("completed");
  if (!allUpdate) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id });
    toUpdate.forEach((args) => {
      task[args] = req.body[args];
    });
    await task.save();
    res.status(200).send(task);
  } catch (error) {}
});

//Delete all task
router.delete("/me/task", async (req, res) => {
  try {
    const task = await Task.remove()
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete task by id
router.delete("/me/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.deleteOne({ _id });
    res.status(400).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
