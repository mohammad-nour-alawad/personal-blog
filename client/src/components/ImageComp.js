import React, { useState, useEffect } from 'react';

const ImageComp = ({ imageUrl, title }) => {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsValidImage(true);
    image.onerror = () => setIsValidImage(false);
    image.src = imageUrl;
  }, [imageUrl]);

  return (
    <>
      {isValidImage && (
        <div>
          <img src={imageUrl} className="img-fluid rounded-start" alt={title} />
        </div>
      )}
    </>
  );
};

export default ImageComp;
