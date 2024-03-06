import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ImageComp from './ImageComp';

const BlogComp = ({ title, text, image, author, date, isUserAuthor, onDelete, onEdit }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <ImageComp imageUrl={image} title={title}></ImageComp>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">By {author} on {date}</small>
            </p>
            <button onClick={handleShow} className="btn btn-primary">Read More {">>"} </button>

            {isUserAuthor && (
              <>
                <button onClick={onEdit} className="btn btn-secondary mx-2" title="Edit">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={onDelete} className="btn btn-danger" title="Delete">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </>
            )}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ImageComp imageUrl={image} title={title}></ImageComp>
                <div dangerouslySetInnerHTML={createMarkup(text)}></div>
              </Modal.Body>
              <Modal.Footer>
                <small className="text-muted">By {author} on {date}</small>
                <br/>
                {isUserAuthor && (
                  <>
                    <button onClick={onEdit} className="btn btn-secondary mx-2" title="Edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={onDelete} className="btn btn-danger" title="Delete">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </>
                )}
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComp;
