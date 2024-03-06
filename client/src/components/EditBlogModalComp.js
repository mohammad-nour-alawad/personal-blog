import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageComp from './ImageComp'; // Import the ImageComp for image handling
import ReactQuill from 'react-quill';

const EditBlogModal = ({ show, onHide, blog, onSave }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setText(blog.text);
      setImage(blog.image);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(blog._id, { title, text, image });
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  
  const handleTextChange = (value) => {
    setText(value);
  };
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="blogTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogText">
            <Form.Label>Text</Form.Label>
            <ReactQuill 
              theme="snow" 
              value={text} 
              onChange={handleTextChange} 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={handleImageChange}
              required
            />
          </Form.Group>
          {image && <ImageComp imageUrl={image} title={title} />}
          <Button variant="primary mt-2" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBlogModal;
