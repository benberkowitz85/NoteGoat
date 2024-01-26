const express = require("express");
const apiRoutes = require("Routes\apiRoutes.js");
const htmlRoutes = require("Routes\htmlRoutes.js");

// Initialize the app and create a port. we write process.env.PORT || 4141 so that the port will be set by Heroku when deployed, but will default to 4141 when run locally.
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the appropriate middleware. Specifically for parsing JSON data, "urlencoded" data, and for serving static files.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));