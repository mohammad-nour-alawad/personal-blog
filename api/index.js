require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = "";
console.log(process.env.MONGODB_URI);

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db("PersonalBlog");
        const result = await db.collection("users").insertOne({ email, password });
        res.json({ message: "User registered successfully", userId: result.insertedId });
        client.close();
    
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db("PersonalBlog");

        const user = await db.collection("users").findOne({ email });

        if (user) {
            // In a real app, compare the hashed password here instead of plain text
            // const isValid = await bcrypt.compare(password, user.password);
            const isValid = password === user.password;

            if (isValid) {
                res.json({ message: "Login successful", userId: user._id });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
