require('dotenv').config({ 
    path: `./.env.${process.env.NODE_ENV || 'development'}` 
  });

const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");

const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const secret = 'dawfwq320ie-r9310ie9381231r0fimaps';

const { hashPassword, comparePassword } = require('./hasher');
const User = require("./models/User")
const Blog = require("./models/Blog");

const app = express();


const url = process.env.MONGODB_URI;
console.log(url);
mongoose.connect(url, {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



app.use(cors({ credentials: true, origin: process.env.FRONTEND }));
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
                    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }).json({
                        id: user._id,
                        email: user.email
                    });

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
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
    return;
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/create', async (req, res) => {
    try {
        const { title, text, image } = req.body;
        var author = "";

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            author = info.email;
        });

        const newBlogPost = new Blog({
            title,
            text,
            image,
            author,
        });

        await newBlogPost.save();

        res.status(201).json({
            success: true,
            data: newBlogPost,
            message: "Blog post created successfully",
        });
    } catch (error) {
        console.error("Blog creation error:", error);
        res.status(400).json({
            success: false,
            message: "Error creating blog post",
            error: error.message,
        });
    }
});


// like.
app.post('/likes/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } }, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// unlike.


// comment.


app.delete('/blogs/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndDelete(blogId);
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/blogs/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.get('/blogs', async (req, res) => {
//     try {
//       const blogs = await Blog.find({}).sort({ createdAt: -1 });
//       res.json(blogs);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// Example of what the backend endpoint might look like
app.get('/blogs', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const total = await Blog.countDocuments({});
        const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        res.json({
            blogs,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});



//module.exports = app;
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000');
});
