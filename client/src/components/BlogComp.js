// BlogPost.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogComp = ({ title, text, image, author, date }) => {
  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <p className="card-text">
              <small className="text-muted">By {author} on {date}</small>
            </p>
            <Link to="#" className="btn btn-primary">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComp;
