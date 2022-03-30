import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Message.scss';

const Message = ({ message, success }) => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <>
      {showMessage ? (
        <div className="message-wrapper">
          <div className={success ? 'success' : 'error'}>
            {message}
            <span className="message-icon">
              <i
                className="fa fa-times"
                aria-hidden="true"
                title="close"
                onClick={() => setShowMessage(false)}
              ></i>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

Message.propTypes = {
  optionalMessage: PropTypes.string,
  success: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Message;
