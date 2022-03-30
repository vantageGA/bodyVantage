import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactFormMessageAction } from '../../store/actions/contactFormActions';
import { CONTACT_FORM_RESET } from '../../store/constants/contactFormConstants';
import './ContactFormView.scss';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';

const ContactFormView = ({ type }) => {
  const nameRegEx = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const dispatch = useDispatch();
  const contactForm = useSelector((state) => state.contactForm);
  const { loading, success, error, payload } = contactForm;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch({ type: CONTACT_FORM_RESET });
    return () => {
      console.log('Contact form cleanup');
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call action creator function
    dispatch(contactFormMessageAction(name, email, message));
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      {success ? (
        <Message message="Form successfully submitted" success={success} />
      ) : null}
      {error ? <Message message={payload} error={error} /> : null}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="contact-form-view-wrapper">
          <fieldset className="fieldSet">
            <legend>Contact form</legend>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                type={type}
                name={name}
                value={name}
                required
                className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                error={
                  !nameRegEx.test(name) && name.length !== 0
                    ? `Name field must start with an uppercase letter and contain at least 3 letters.`
                    : null
                }
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Email"
                type="email"
                name={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                error={
                  !emailRegEx.test(email) && email.length !== 0
                    ? `Invalid email address.`
                    : null
                }
              />

              <div>
                <label htmlFor="message">
                  Message{' '}
                  {message.length >= 10 ? null : (
                    <span className="small-text-message">
                      [ Requires 10 characters and currently there are{' '}
                      {message.length} ]
                    </span>
                  )}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    className={message.length < 10 ? 'invalid' : 'entered'}
                  />
                </label>
              </div>
              {nameRegEx.test(name) &&
              emailRegEx.test(email) &&
              message.length >= 10 ? (
                <span className="small-text-message">
                  The form is now valid and can be submitted.
                </span>
              ) : null}
              <Button
                colour="transparent"
                text="submit"
                className="btn"
                disabled={
                  !nameRegEx.test(name) ||
                  !emailRegEx.test(email) ||
                  message.length < 10
                }
              ></Button>
            </form>
          </fieldset>
          <fieldset className="fieldSet">
            <legend>Contact Details</legend>
            Address: 1233, Tell: 113 Email: something@mail.com
          </fieldset>
        </div>
      )}
    </>
  );
};

export default ContactFormView;
