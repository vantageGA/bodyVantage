import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileEditView.scss';

import {
  profileOfLoggedInUserAction,
  createProfileAction,
  profileUpdateAction,
} from '../../store/actions/profileActions';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Rating from '../../components/rating/Rating';

import moment from 'moment';
import axios from 'axios';
import QuillEditor from '../../components/quillEditor/QuillEditor';

const ProfileEditView = () => {
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const telephoneNumberRegEx = /^(07[\d]{8,12}|447[\d]{7,11})$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Profile details in DB
  const profileState = useSelector((state) => state.profileOfLoggedInUser);
  const { loading, error, profile } = profileState;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [location, setLocation] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [keyWordSearch, setkeyWordSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [show, setShow] = useState(false);

  const [keyWordSearchOne, setkeyWordSearchOne] = useState('');
  const [keyWordSearchTwo, setkeyWordSearchTwo] = useState('');
  const [keyWordSearchThree, setkeyWordSearchThree] = useState('');
  const [keyWordSearchFour, setkeyWordSearchFour] = useState('');
  const [keyWordSearchFive, setkeyWordSearchFive] = useState('');

  const [specialisationOne, setSpecialisationOne] = useState('');
  const [specialisationTwo, setSpecialisationTwo] = useState('');
  const [specialisationThree, setSpecialisationThree] = useState('');
  const [specialisationFour, setSpecialisationFour] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!profile) {
      dispatch(profileOfLoggedInUserAction());
    }

    setName(profile?.name);
    setEmail(profile?.email);
    setProfileImage(profile?.profileImage);
    setDescription(profile?.description);
    setSpecialisation(profile?.specialisation);
    setQualifications(profile?.qualifications);
    setLocation(profile?.location);
    setTelephoneNumber(profile?.telephoneNumber);
    setkeyWordSearch(profile?.keyWordSearch);

    setkeyWordSearchOne(profile?.keyWordSearchOne);
    setkeyWordSearchTwo(profile?.keyWordSearchTwo);
    setkeyWordSearchThree(profile?.keyWordSearchThree);
    setkeyWordSearchFour(profile?.keyWordSearchFour);
    setkeyWordSearchFive(profile?.keyWordSearchFive);

    setSpecialisationOne(profile?.specialisationOne);
    setSpecialisationTwo(profile?.specialisationTwo);
    setSpecialisationThree(profile?.specialisationThree);
    setSpecialisationFour(profile?.specialisationFour);

    const abortConst = new AbortController();
    return () => {
      abortConst.abort();
      console.log('ProfileEditView useEffect cleaned');
    };
  }, [navigate, dispatch, userInfo, profile]);

  const handleCreateProfile = () => {
    // Dispatch create profile action
    dispatch(createProfileAction());
    navigate('/user-profile-edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Keyword search Algo
    // Created a promise in order to resolve first
    let prom = new Promise((resolve, reject) => {
      const arr = [
        keyWordSearchOne.trim() + ' ',
        keyWordSearchTwo.trim() + ' ',
        keyWordSearchThree.trim() + ' ',
        keyWordSearchFour.trim() + ' ',
        keyWordSearchFive.trim() + ' ',
      ];
      const permutations = (len, val, existing) => {
        if (len === 0) {
          res.push(val);
          return;
        }
        for (let i = 0; i < arr.length; i++) {
          // so that we do not repeat the item, using an array here makes it

          if (!existing[i]) {
            existing[i] = true;
            permutations(len - 1, val + arr[i], existing);
            existing[i] = false;
          }
        }
      };
      let res = [];
      const buildPermutations = (arr = []) => {
        for (let i = 0; i < arr.length; i++) {
          permutations(arr.length - i, ' ', []);
        }
      };
      buildPermutations(arr);
      if (res) {
        resolve(res);
      } else {
        reject('Failed');
      }
    });

    prom
      .then((res) => {
        // Dispatch UPDATE PROFILE Action
        dispatch(
          profileUpdateAction({
            name,
            email,
            profileImage,
            description,
            specialisation,
            qualifications,
            location,
            telephoneNumber,
            keyWordSearch: res.join('').concat(pure),
            keyWordSearchOne,
            keyWordSearchTwo,
            keyWordSearchThree,
            keyWordSearchFour,
            keyWordSearchFive,
            specialisationOne,
            specialisationTwo,
            specialisationThree,
            specialisationFour,
          }),
        );
      })
      .catch((message) => {
        console.log(message);
      });
    // Keyword search Algo

    const purekeyWordSearch = description.concat(
      name,
      location,
      specialisation,
    );
    const pure = purekeyWordSearch.replace(
      /\b(?:and|'|"|""|from|for|this|must|just|something|any|anything|say|help|can|can't|cant|path|during|after|by|however|is|we| we'll|to|you|your|ll|highly|from|our|the|in|for|of|an|or|i|am|me|my|other|have|if|you|are|come|with|through|going|over|past|years|year|cater|getting|currently|current|have|having|people|worked|work|. |)\b/gi,
      '',
    );

    // Add this to remove duplicates
    // const removeDuplicates = Array.from(new Set(pure.split(' '))).toString();
    // console.log(removeDuplicates.toString());
  };

  const isDisabled =
    name?.length === 0 ||
    !emailRegEx.test(email) ||
    description?.length < 10 ||
    specialisation?.length <= 10 ||
    location?.length <= 10 ||
    !telephoneNumberRegEx.test(telephoneNumber) ||
    keyWordSearch?.length <= 10;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/profileUpload',
        formData,
        config,
      );

      setProfileImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleShowCombinations = () => {
    setShow(!show);
  };

  return (
    <>
      {error ? <Message message={error} /> : null}

      {!profile ? (
        <>
          <fieldset className="fieldSet item">
            <legend>Create a profile</legend>
            <p>Please click the button below to create a sample profile.</p>
            <p>You will then be re-directed to your USER profile page.</p>
            <Button
              type="submit"
              colour="transparent"
              text="Create your profile"
              className="btn"
              title="Create your profile"
              disabled={false}
              onClick={handleCreateProfile}
            ></Button>
          </fieldset>
        </>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <div className="profile-edit-wrapper">
          <fieldset className="fieldSet item">
            <legend>Update PROFILE</legend>
            <p>
              Please note that the more complete your profile is the better it
              will feature when it is searched....
            </p>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
                className={name?.length === 0 ? 'invalid' : 'entered'}
                error={name?.length === 0 ? `Name field cant be empty!` : null}
              />

              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                error={
                  !emailRegEx.test(email) ? `Invalid email address.` : null
                }
              />

              <InputField
                label="Profile Image"
                type="text"
                name="profileImage"
                value={profileImage ? profileImage : 'sample.jpg'}
                onChange={(e) => setProfileImage(e.target.value)}
              />
              {uploading ? <LoadingSpinner /> : null}
              <InputField
                type="file"
                name="files"
                onChange={uploadFileHandler}
              />

              <div>
                {description?.length < 10 ? (
                  <span className="small-text">
                    must have at least {description.length} characters.
                  </span>
                ) : null}

                <h3>Description </h3>
                <div className="input-wrapper">
                  <label>Brief Description of yourself </label>
                  <QuillEditor
                    value={description}
                    onChange={setDescription}
                    className={description?.length < 10 ? 'invalid' : 'entered'}
                  />
                </div>
              </div>

              <h3>Search Keyword(s)</h3>
              <div className="input-wrapper">
                <InputField
                  placeholder="keyword"
                  value={keyWordSearchOne}
                  onChange={(e) => setkeyWordSearchOne(e.target.value)}
                  type="text"
                  name="keyWordSearchOne"
                  required
                  className={
                    keyWordSearchOne?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    keyWordSearchOne?.length <= 3
                      ? `keyWord Search field must contain at least 3 characters!`
                      : null
                  }
                />
                <InputField
                  placeholder="keyword"
                  value={keyWordSearchTwo}
                  onChange={(e) => setkeyWordSearchTwo(e.target.value)}
                  type="text"
                  name="keyWordSearchTwo"
                  required
                  className={
                    keyWordSearchTwo?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    keyWordSearchTwo?.length <= 3
                      ? `keyWord Search field must contain at least 3 characters!`
                      : null
                  }
                />
                <InputField
                  placeholder="keyword"
                  value={keyWordSearchThree}
                  onChange={(e) => setkeyWordSearchThree(e.target.value)}
                  type="text"
                  name="keyWordSearchThree"
                  required
                  className={
                    keyWordSearchThree?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    keyWordSearchThree?.length <= 3
                      ? `keyWord Search field must contain at least 3 characters!`
                      : null
                  }
                />
                <InputField
                  placeholder="keyword"
                  value={keyWordSearchFour}
                  onChange={(e) => setkeyWordSearchFour(e.target.value)}
                  type="text"
                  name="keyWordSearchFour"
                  required
                  className={
                    keyWordSearchFour?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    keyWordSearchFour?.length <= 3
                      ? `keyWord Search field must contain at least 3 characters!`
                      : null
                  }
                />
                <InputField
                  placeholder="keyword"
                  value={keyWordSearchFive}
                  onChange={(e) => setkeyWordSearchFive(e.target.value)}
                  type="text"
                  name="keyWordSearchFive"
                  required
                  className={
                    keyWordSearchFive?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    keyWordSearchFive?.length <= 3
                      ? `keyWord Search field must contain at least 3 characters!`
                      : null
                  }
                />

                <div>
                  <hr className="style-one" />

                  <h3>keywords search (Generated)</h3>
                  <div>
                    {keyWordSearch?.length < 10 ? (
                      <span className="small-text">
                        must have at least {keyWordSearch.length} characters.
                      </span>
                    ) : null}
                    Our Algorithm has generated {Number(keyWordSearch?.length)}{' '}
                    words with {Math.floor(keyWordSearch?.length / 5)}{' '}
                    combinations. This includes keywords that have been taken
                    from your description and including your name.
                    <Button
                      type="button"
                      colour="transparent"
                      text={show ? 'Hide Combinations' : 'View Combinations'}
                      className="btn"
                      title="View Combinations"
                      disabled={false}
                      onClick={handleShowCombinations}
                    ></Button>
                    {show ? (
                      <>
                        <label>READ ONLY: </label>
                        <textarea
                          readOnly
                          value={keyWordSearch}
                          onChange={(e) => setkeyWordSearch(e.target.value)}
                          type="text"
                          name="keyWordSearch"
                          required
                          className={
                            keyWordSearch?.length <= 10 ? 'invalid' : 'entered'
                          }
                          error={
                            keyWordSearch?.length <= 10
                              ? `keyWord Search field must contain at least 10 characters!`
                              : null
                          }
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <h3>Specialisation Keyword(s)</h3>
              <div className="input-wrapper">
                <InputField
                  placeholder="Specialisation"
                  value={specialisationOne}
                  onChange={(e) => setSpecialisationOne(e.target.value)}
                  type="text"
                  name="specialisationOne"
                  required
                  className={
                    specialisationOne?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    specialisationOne?.length <= 3
                      ? `Specialisation field must contain at least 3 characters!`
                      : null
                  }
                />

                <InputField
                  placeholder="Specialisation"
                  value={specialisationTwo}
                  onChange={(e) => setSpecialisationTwo(e.target.value)}
                  type="text"
                  name="specialisationTwo"
                  required
                  className={
                    specialisationTwo?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    specialisationTwo?.length <= 3
                      ? `Specialisation field must contain at least 3 characters!`
                      : null
                  }
                />

                <InputField
                  placeholder="Specialisation"
                  value={specialisationThree}
                  onChange={(e) => setSpecialisationThree(e.target.value)}
                  type="text"
                  name="specialisationThree"
                  required
                  className={
                    specialisationThree?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    specialisationThree?.length <= 3
                      ? `Specialisation field must contain at least 3 characters!`
                      : null
                  }
                />

                <InputField
                  placeholder="Specialisation"
                  value={specialisationFour}
                  onChange={(e) => setSpecialisationFour(e.target.value)}
                  type="text"
                  name="specialisationFour"
                  required
                  className={
                    specialisationFour?.length <= 3 ? 'invalid' : 'entered'
                  }
                  error={
                    specialisationFour?.length <= 3
                      ? `Specialisation field must contain at least 3 characters!`
                      : null
                  }
                />
              </div>

              <h3>Specialisation</h3>
              <div className="input-border">
                <label>Specialisation</label>
                <QuillEditor
                  value={specialisation}
                  onChange={setSpecialisation}
                  className={
                    specialisation?.length < 10 ? 'invalid' : 'entered'
                  }
                />
              </div>

              <h3>Qualifications</h3>
              <div className="input-border">
                <label>Qualifications</label>
                <QuillEditor
                  value={qualifications}
                  onChange={setQualifications}
                  className={
                    qualifications?.length < 10 ? 'invalid' : 'entered'
                  }
                />
              </div>

              <h3>Location</h3>
              <div className="input-border">
                <label>Location</label>
                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="location"
                  required
                  className={location?.length <= 10 ? 'invalid' : 'entered'}
                  error={
                    location?.length <= 10
                      ? `Location field must contain at least 10 characters!`
                      : null
                  }
                />
              </div>

              <InputField
                label="Telephone Number"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                type="text"
                name="telephoneNumber"
                required
                className={
                  !telephoneNumberRegEx.test(telephoneNumber)
                    ? 'invalid'
                    : 'entered'
                }
                error={
                  !telephoneNumberRegEx.test(telephoneNumber) ||
                  telephoneNumber?.length === 0
                    ? `Invalid mobile number`
                    : null
                }
              />

              <Button
                type="submit"
                colour="transparent"
                text="submit"
                className="btn"
                title="Submit"
                disabled={isDisabled}
              ></Button>
            </form>
          </fieldset>

          {/* This is the display */}

          <fieldset className="fieldSet item">
            <legend>Profile</legend>
            <h3>Profile Summary</h3>
            <div className="summary-wrapper">
              <div>
                <p>Name: {name}</p>
                <p>
                  Email:{' '}
                  <a href={`mailto: ${email}`} target="_blank" rel="noreferrer">
                    {email}
                  </a>
                </p>
                <p>Mobile: {telephoneNumber}</p>
                <p>Create: {moment(profile?.createdAt).fromNow()}</p>
                <p>Updated: {moment(profile?.updatedAt).fromNow()}</p>
              </div>
              <img
                src={`../uploads/profiles/${profileImage}`}
                alt={name}
                className="image"
              />
            </div>

            <h3>Description</h3>
            <div className="summary-wrapper">
              <p
                dangerouslySetInnerHTML={{
                  __html: profile?.description,
                }}
              ></p>
            </div>

            <h3>Location</h3>
            <div className="summary-wrapper">
              <p>{location}</p>
            </div>

            <h3>Specialisation</h3>
            <div className="summary-wrapper">
              <p
                dangerouslySetInnerHTML={{
                  __html: profile?.specialisation,
                }}
              ></p>
            </div>

            <h3>Qualifications</h3>
            <div className="summary-wrapper">
              <p
                dangerouslySetInnerHTML={{
                  __html: profile?.qualifications,
                }}
              ></p>
              <p>
                QualificationsVerified:{' '}
                {profile.isQualificationsVerified === true ? (
                  <i
                    className="fa fa-check"
                    style={{
                      fontSize: 20 + 'px',
                      color: 'rgba(92, 184, 92, 1)',
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-times"
                    style={{ fontSize: 20 + 'px', color: 'crimson' }}
                  ></i>
                )}
              </p>
            </div>

            <h3>Rating</h3>
            <div className="summary-wrapper">
              <Rating
                value={profile?.rating}
                text={`  from ${profile?.numReviews} reviews`}
              />
            </div>

            {/* <h4>Keyword Summary</h4>
            <p className="search-algorithm">
              Search algorithm: {profile?.keyWordSearch}
            </p> */}
            {/* <p>Keyword search One: {profile?.keyWordSearchOne}</p>
            <p>Keyword search Two: {profile?.keyWordSearchTwo}</p>
            <p>Keyword search Three: {profile?.keyWordSearchThree}</p>
            <p>Keyword search Four: {profile?.Four}</p>
            <p>Keyword search Five: {profile?.five}</p>
            <p>Keyword search Six: {profile?.six}</p> */}
          </fieldset>
        </div>
      )}
    </>
  );
};

export default ProfileEditView;
