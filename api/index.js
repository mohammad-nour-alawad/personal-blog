require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");

const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const secret = 'dawfwq320ie-r9310ie9381231r0fimaps';

const { hashPassword, comparePassword } = require('./hasher');
const User = require("./models/User")


const app = express();


const url = process.env.MONGODB_URI;
mongoose.connect(url, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered with this email" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword });
        const result = await newUser.save();

        res.json({ message: "User registered successfully", userId: result._id });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isValid = await comparePassword(password, user.password);
            if (isValid) {
                try {
                    const token = jwt.sign({ email: user.email, id: user._id }, secret);
                    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).json({ message: 'ok' });

                } catch (jwtError) {
                    console.error(jwtError);
                    res.status(500).json({ message: "Error generating token", error: jwtError.message });
                }
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});



app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if (err) throw err;
        res.json(info);
    });
    return;
});


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

// like.
// comment.


// add blog.

// remove blog.

// update blog.

// list blogs.



// read more.



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
