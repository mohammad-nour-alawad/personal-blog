import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

function CreateBlogPage() {
  const navigate = useNavigate();
  
  const [blogPost, setBlogPost] = useState({
    title: '',
    text: '',
    image: ''
  });

  const handleChange = (e) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setBlogPost({ ...blogPost, text: value });
  };
    
const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`${process.env.API_SERVER}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  })
  .then(data => {
    Swal.fire({
      title: 'Success!',
      text: 'Your blog post has been created!',
      icon: 'success',
      confirmButtonText: 'Great'
    }).then(() => {
      navigate('/');
    });
  })
  .catch(error => {
    Swal.fire({
      title: 'Error!',
      text: error.message || 'Some error occurred, please try again later.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
};

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

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
          <ReactQuill
            theme="snow"
            value={blogPost.text}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
