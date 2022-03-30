import React from 'react';
import './Accordion.scss';

const Accordion = ({ question, answer, onClick }) => {
  return (
    <>
      <div className="accordion-wrapper">
        <div>
          <div className="question" onClick={onClick}>
            {question ? (
              <div className="accordion-inner-wrapper">
                <div>
                  <h2 className="accordion-heading">{question}</h2>
                </div>

                <div>
                  {!answer ? (
                    <i className="fas fa-chevron-circle-up"></i>
                  ) : (
                    <i className="fas fa-chevron-circle-down"></i>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <div className="answer">
            {answer ? (
              <div className={!answer ? 'answer' : 'drop'}>
                <p>{answer}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
