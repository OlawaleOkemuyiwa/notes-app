//NodeJS is used to run server side JS codes(JS running on the server). This is possible cuz nodeJS uses chrome's V8 JS engine to run all JS codes provided. NodeJS is able to teach JS new things by providing C++ bindings to V8. This then allows JS to do anything that C++ can do(access the file system etc).
//globally install nodemon to make node.js continue running instead of always inputting "node file-name" everytime we make changes to our files in terminal
const fs = require("fs");

const chalk = require("chalk");
const notesUtils = require("./notes");
const yargs = require("yargs");

//Customize yargs version
yargs.version("1.1.0");

//Create yargs commmands with options(some options set to required while some are not)
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesUtils.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesUtils.removeNote(argv.title);
  },
});

yargs.command({
  command: "removeAll",
  describe: "Remove all note items present",
  handler(argv) {
    notesUtils.removeAll();
  },
});

yargs.command({
  command: "list",
  describe: "List the notes",
  handler() {
    notesUtils.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesUtils.readNote(argv.title);
  },
});

yargs.parse();
