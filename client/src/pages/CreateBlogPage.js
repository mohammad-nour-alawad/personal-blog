import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function CreateBlogPage() {
  const [blogPost, setBlogPost] = useState({
    title: '',
    text: '',
    image: '',
    author: '',
    date: ''
  });

  const handleChange = (e) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogPost);
    alert('Blog Post Submitted: Check the console for the object.');
  };

  return (
    <div className="App container mt-5">
      <h2>Blog Post Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={blogPost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Text:</label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={blogPost.text}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={blogPost.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={blogPost.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={blogPost.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
