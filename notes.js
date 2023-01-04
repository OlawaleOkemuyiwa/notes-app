const fs = require("fs");

const chalk = require("chalk");

const loadNotes = () => {
  try {
    const notesDataBuffer = fs.readFileSync("./notes.json"); //for the 1st time loading when notes.json file doesnt exist just yet. There would be an error trying to read the file and an empty array would be returned instead
    const notesJSON = notesDataBuffer.toString();
    return JSON.parse(notesJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = notesObj => {
  const notesJSON = JSON.stringify(notesObj);
  fs.writeFileSync("./notes.json", notesJSON);
};

const addNotes = (title, body) => {
  const notes = loadNotes();

  const noteExists = notes.some(note => title === note.title);
  if (noteExists) {
    console.log(chalk.red.inverse("note title taken, choose another!"));
    return;
  }

  notes.push({
    title,
    body,
  });

  saveNotes(notes);
  console.log(chalk.green.inverse("new note successfully added!"));
};

const removeNote = title => {
  const notes = loadNotes();

  const newNotes = notes.filter(note => title !== note.title);
  if (notes.length > newNotes.length) {
    saveNotes(newNotes);
    console.log(chalk.green.inverse("Note successfully removed"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }

  // const noteIndex = notes.findIndex(note => note.title === title);
  // if (noteIndex !== -1) {
  //   notes.splice(noteIndex, 1);
  //   saveNotes(notes);
  //   console.log(chalk.green.inverse("note successfully removed"));
  // } else {
  //   console.log(chalk.green.inverse("Such note does not exist"));
  // }
};

const removeAll = () => {
  saveNotes([]);
  console.log(chalk.green.inverse("All notes removed!"));
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length !== 0) {
    console.log(chalk.inverse("Your notes!"));
    notes.forEach(note => console.log(note.title));
  } else {
    console.log("No notes to display");
  }
};

const readNote = title => {
  const notes = loadNotes();

  const selectedNote = notes.find(note => note.title === title);

  if (selectedNote) {
    console.log(chalk.inverse(selectedNote.title));
    console.log(chalk.blue.inverse(selectedNote.body));
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

module.exports = {
  addNotes,
  removeNote,
  removeAll,
  listNotes,
  readNote,
};
