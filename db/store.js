const util = require("util");
const fs = require("fs");

// Importing the recommended package for generating unique ids. 
const { v1: uuidv1 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db\db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("db\db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }

        // in the newNote variable we attach the unique id generated by the uuid package. 
        const newNote = { title, text, id: uuidv1() };

        // gathers all the notes. Writes the updated notes to the db.json file, and then returns the newNote
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        // Get all of the notes, remvoes the note with the matching id, then proceeds to write the filtered notes to the db.json file.
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }

}

module.exports = new Store();