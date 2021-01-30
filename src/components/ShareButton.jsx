import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ path }) {
  const [pathImage, setPathImage] = useState();

  const handleShare = () => {
    const completePath = `http://localhost:3000${path.replace('/in-progress', '')}`;
    navigator.clipboard.writeText(completePath);
    setPathImage(completePath);
  };

  return (
    <div className="share-btn-container">
      <button
        type="button"
        onClick={ handleShare }
        className="share-btn"
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      { pathImage && <p className="share-text">Link copiado!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShareButton;