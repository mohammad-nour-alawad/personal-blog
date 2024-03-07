import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ImageComp from './ImageComp';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const BlogComp = ({ title, text, image, author, date, isUserAuthor, onDelete, onEdit }) => {
  const navigate = useNavigate();


  const {userInfo} = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(0);

  const [comments, setComments] = useState([
    { id: 1, name: "User1", comment: "Great article!" },
    { id: 2, name: "User2", comment: "Very informative, thanks for sharing." }
  ]);
  const [userComment, setUserComment] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLike = () => {
    if (userInfo?.email) {
      setLikes(likes + 1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must be logged in to like a post.',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };


  const handleCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const submitComment = () => {
    if (!userComment.trim()) return;

    if (userInfo?.email) {
      const newComment = { id: comments.length + 1, name: "Anonymous", comment: userComment };
      setComments([...comments, newComment]);
      setUserComment('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must be logged in to comment on a post.',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <div key={comment.id} className="comment">
        <p><strong>{comment.name}:</strong> {comment.comment}</p>
      </div>
    ));
  };

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: '760px' }}>
      <div className="row g-0">
        <ImageComp imageUrl={image} title={title} />
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">By {author} on {date}</small>
            </p>
            <button onClick={handleShow} className="btn btn-primary">Read More {">>"} </button>

            <button onClick={handleLike} className="btn btn-light mx-2">
              <FontAwesomeIcon icon={faHeart} /> {likes}
            </button>

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
                <ImageComp imageUrl={image} title={title} />
                <div dangerouslySetInnerHTML={createMarkup(text)}></div>
                <div className="comments-section">
                  <div className="comment-form mt-3 d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="Leave a comment..."
                      value={userComment}
                      onChange={handleCommentChange}
                      className="form-control me-2" // 'me-2' adds a margin to the right of the element
                      style={{ flexGrow: 1 }} // Make input field take up available space
                    />
                    <button onClick={submitComment} className="btn btn-primary" title="Send">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>

                  <h5 className='mt-3'>Comments:</h5>
                  {renderComments()}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <small className="text-muted">By {author} on {date}</small>
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

export default BlogComp
