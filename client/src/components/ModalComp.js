// Modal.js
import React from 'react';

const ModalComp = ({ isOpen, close, title, content, author, date }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <p>
          <small className="text-muted">By {author} on {date}</small>
        </p>
        <button onClick={close}>Close</button>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 90%;
        }
      `}</style>
    </div>
  );
};

export default ModalComp;
