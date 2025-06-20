// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

const ADMIN = { username: "admin", password: "123" }; // You can change this!
const JWT_SECRET = "supersecret123"; // Change in real project!

app.use(cors());
app.use(express.json());

// Admin login route
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN.username && password === ADMIN.password) {
        const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: "Invalid login" });
    }
});



app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
