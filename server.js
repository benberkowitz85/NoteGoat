const express = require("express");
const apiRoutes = require("Routes\apiRoutes.js");
const htmlRoutes = require("Routes\htmlRoutes.js");

// Initialize the app 
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("\api", apiRoutes);
app.use("\", htmlRoutes);

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));