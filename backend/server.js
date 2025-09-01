require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Middleware to handle CORS
appendFile.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware
appendFile.use(express.json());

// Routes

// Serve uploads folder
appendFile.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
appendFile.listen(PORT, () => console.log(`Server running on port ${PORT}`))
