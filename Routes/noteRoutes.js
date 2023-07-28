const { Router } = require("express");

const {
  createNote,
  getAllNotes,
  getOneNote,
} = require("../Controllers/notesController");

const projectrouter = Router();

projectrouter.post("/", createNote);
projectrouter.get("/", getAllNotes);
projectrouter.get("/:id", getOneNote);

module.exports = {
  projectrouter,
};
