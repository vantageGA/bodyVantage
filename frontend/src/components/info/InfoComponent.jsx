import React, { useState } from 'react';
import './InfoComponent.scss';
import { FaInfoCircle } from 'react-icons/fa';

const InfoComponent = ({ description }) => {
  const [showDescription, setShowDescription] = useState(false);
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };
  return (
    <>
      <div className="info-wrapper">
        <div onClick={handleShowDescription}>
          <FaInfoCircle />
          {showDescription ? (
            <>
              <p className="bubble">{description}</p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default InfoComponent;
