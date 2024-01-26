const router = require("express").Router();
// imported our store.js file, which includes the code for performing read/write operations on our db.json file.
const store = require("db\store.js");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
    store
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

// POST "/api/notes" receives a new note, adds it to the db.json file, then returns the new note to the client.
router.post("/notes", (req, res) => {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

// DELETE "/api/notes/:id" receives a query parameter containing the id of a note to delete.
router.delete("/notes/:id", (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router; 