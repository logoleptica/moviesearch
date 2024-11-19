const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    credentials: true               // Allow cookies (if needed)
}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database Error:", err); // Log database errors
            return res.status(500).json("Database Error");
        }
        return res.json({ message: "Signup successful!" });
    });
});

// Login endpoint with validation
app.post('/login', [
    check('email', "Invalid email length").isEmail().isLength({ min: 10, max: 30 }),
    check('password', "Password length must be 8-10").isLength({ min: 8, max: 10 })
], (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        } else {
            if (err) {
                console.error("Database Error:", err); // Log database errors
                return res.status(500).json("Database Error");
            }
            if (data.length > 0) {
                return res.json({ message: "Login successful!" });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        }
    });
});

// Start the server
app.listen(8081, () => {
    console.log("Backend server listening on http://localhost:8081");
});
