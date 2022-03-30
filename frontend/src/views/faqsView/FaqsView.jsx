import React, { useState } from 'react';
import './FaqsView.scss';
import { faqs } from './faqs';

import Accordion from '../../components/accordion/Accordion';

const FaqsView = () => {
  const [openAccordion, setOpenAccordion] = useState(false);
  const [id, setId] = useState(1);

  const handleOpen = (id) => {
    setId(id);
    if (id) {
      setOpenAccordion(!openAccordion);
    }
  };

  return (
    <>
      <div className="faqs-wrapper">
        <fieldset className="fieldSet">
          <legend>FAQ's</legend>
          {faqs.map((faq) => (
            <div key={faq.id}>
              <Accordion
                question={faq.question}
                answer={id === faq.id ? faq.answer : null}
                onClick={() => handleOpen(faq.id)}
              />
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
};

export default FaqsView;
