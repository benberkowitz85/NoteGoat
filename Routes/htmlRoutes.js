const path = require("path");
const router = require("express").Router();

// GET "/notes" responds with the notes.html file
router.get("\notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public\notes.html"));
});

// GET "*" responds with the index.html file. All other routes respond with this file. 
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public\index.html"));
});

module.exports = router;