
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/courses', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const course = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/courses/:id', async(req, res) => {
    try {
        console.log("A GET request has arrived");
        const { id } = req.params;
        const course = await pool.query(
            "SELECT * FROM courses WHERE id = $1", [id]
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

