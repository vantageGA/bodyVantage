import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileEditView.scss';

import {
  profileOfLoggedInUserAction,
  createProfileAction,
  profileUpdateAction,
  profileImagesAction,
} from '../../store/actions/profileActions';

import { profileImageUploadAction } from '../../store/actions/imageUploadActions';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Rating from '../../components/rating/Rating';

import moment from 'moment';
import QuillEditor from '../../components/quillEditor/QuillEditor';

import FaceBookComponent from '../../components/socialMedia/faceBook/FaceBookComponent';
import InstagramComponent from '../../components/socialMedia/Instagram/InstagramComponent';
import InfoComponent from '../../components/info/InfoComponent';

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

  // PROFILE image upload
  const profileImageStore = useSelector((state) => state.profileImage);
  const { loading: profileImageLoading } = profileImageStore;

  // PROFILE images
  const profileImagesState = useSelector((state) => state.profileImages);
  const { error: profileImagesError, profileImages } = profileImagesState;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [faceBook, setFaceBook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [location, setLocation] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [keyWordSearch, setkeyWordSearch] = useState('');
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

  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!profile) {
      dispatch(profileOfLoggedInUserAction());
    }

    setName(profile?.name);
    setEmail(profile?.email);
    setFaceBook(profile?.faceBook);
    setInstagram(profile?.instagram);
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

    dispatch(profileImagesAction());

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
            faceBook,
            instagram,
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

  // Profile image
  const [previewImage, setPreviewImage] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState('');
  const previewFile = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadFileHandler = (e) => {
    const imageFile = e.target.files[0];
    setPreviewImageFile(imageFile);
    previewFile(imageFile);
  };

  const handleProfileImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('profileImage', previewImageFile);
    //Dispatch upload action here
    dispatch(profileImageUploadAction(formImageData));
    setPreviewImage('');
  };

  const handleCancelImageUpload = () => {
    document.querySelector('#profileImage').value = '';
    setPreviewImage('');
  };

  // USER Profile image

  const handleShowCombinations = () => {
    setShow(!show);
  };

  const handleHelp = () => {
    setShowHelp(!showHelp);
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
            <legend>
              Update <span>PROFILE</span>{' '}
            </legend>
            <p>
              Please note that the more complete your profile is the better it
              will feature when it is searched.
            </p>

            <Button
              type="button"
              colour="transparent"
              text={!showHelp ? 'SHOW HELP' : 'HIDE HELP'}
              className="btn"
              title={!showHelp ? 'SHOW HELP' : 'HIDE HELP'}
              disabled={false}
              onClick={handleHelp}
            ></Button>

            <form onSubmit={handleSubmit}>
              {showHelp ? (
                <InfoComponent description="Name that the public will see." />
              ) : null}
              <InputField
                label="Name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="Ben Smith"
                value={name}
                required
                className={name?.length === 0 ? 'invalid' : 'entered'}
                error={name?.length === 0 ? `Name field cant be empty!` : null}
              />
              {showHelp ? (
                <InfoComponent description="Email address the public will see." />
              ) : null}{' '}
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="ben@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                error={
                  !emailRegEx.test(email) ? `Invalid email address.` : null
                }
              />
              <InputField
                label="Facebook USERNAME"
                type="text"
                name="faceBook"
                value={faceBook}
                placeholder="fiscalfitness"
                onChange={(e) => setFaceBook(e.target.value)}
                className="entered"
              />
              <InputField
                label="Instagram USERNAME"
                type="text"
                name="instagram"
                value={instagram}
                placeholder="zachfiscalfitness"
                onChange={(e) => setInstagram(e.target.value)}
                className="entered"
              />
              <Button
                type="submit"
                colour="transparent"
                text="Save changes"
                className="btn"
                title="Save changes"
                disabled={false}
              ></Button>
              <div>
                <h3>Description </h3>
                {description?.length < 10 ? (
                  <span className="small-text">
                    Description must have at least {description.length}{' '}
                    characters.
                  </span>
                ) : null}

                <div className="input-wrapper">
                  <label>Brief Description of yourself </label>
                  <QuillEditor
                    value={description}
                    onChange={setDescription}
                    className={description?.length < 10 ? 'invalid' : 'entered'}
                  />
                </div>
                <Button
                  type="submit"
                  colour="transparent"
                  text="Save changes"
                  className="btn"
                  title="Save changes"
                  disabled={false}
                ></Button>
              </div>
              <div>
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
                      keyWordSearchOne?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      keyWordSearchOne?.length < 3
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
                      keyWordSearchTwo?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      keyWordSearchTwo?.length < 3
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
                      keyWordSearchThree?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      keyWordSearchThree?.length < 3
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
                      keyWordSearchFour?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      keyWordSearchFour?.length < 3
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
                      keyWordSearchFive?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      keyWordSearchFive?.length < 3
                        ? `keyWord Search field must contain at least 3 characters!`
                        : null
                    }
                  />
                  <Button
                    type="submit"
                    colour="transparent"
                    text="Save changes"
                    className="btn"
                    title="Save changes"
                    disabled={false}
                  ></Button>
                  <div>
                    <hr className="style-one" />

                    <h3>keywords search (Generated)</h3>
                    <div>
                      {keyWordSearch?.length < 10 ? (
                        <span className="small-text">
                          must have at least {keyWordSearch.length} characters.
                        </span>
                      ) : null}
                      Our Algorithm has generated{' '}
                      {Number(keyWordSearch?.length)} words with{' '}
                      {Math.floor(keyWordSearch?.length / 5)} combinations. This
                      includes keywords that have been taken from your
                      description and including your name.
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
                              keyWordSearch?.length <= 10
                                ? 'invalid'
                                : 'entered'
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
              </div>
              <div>
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
                      specialisationOne?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      specialisationOne?.length < 3
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
                      specialisationTwo?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      specialisationTwo?.length < 3
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
                      specialisationThree?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      specialisationThree?.length < 3
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
                      specialisationFour?.length < 3 ? 'invalid' : 'entered'
                    }
                    error={
                      specialisationFour?.length < 3
                        ? `Specialisation field must contain at least 3 characters!`
                        : null
                    }
                  />
                </div>
                <Button
                  type="submit"
                  colour="transparent"
                  text="Save changes"
                  className="btn"
                  title="Save changes"
                  disabled={false}
                ></Button>
              </div>
              <div>
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
                <Button
                  type="submit"
                  colour="transparent"
                  text="Save changes"
                  className="btn"
                  title="Save changes"
                  disabled={false}
                ></Button>
              </div>
              <div>
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
                <Button
                  type="submit"
                  colour="transparent"
                  text="Save changes"
                  className="btn"
                  title="Save changes"
                  disabled={false}
                ></Button>
              </div>
              <div>
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
                <Button
                  type="submit"
                  colour="transparent"
                  text="Save changes"
                  className="btn"
                  title="Save changes"
                  disabled={false}
                ></Button>
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
                text="save changes"
                className="btn"
                title="Save changes"
                disabled={false}
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
                {!faceBook && !instagram ? (
                  <p>Social media not set.</p>
                ) : (
                  <>
                    <div>
                      {faceBook ? (
                        <FaceBookComponent faceBookUserName={faceBook} />
                      ) : null}

                      {instagram ? (
                        <InstagramComponent instagramUserName={instagram} />
                      ) : null}
                    </div>
                  </>
                )}

                <p>Create: {moment(profile?.createdAt).fromNow()}</p>
                <p>Updated: {moment(profile?.updatedAt).fromNow()}</p>
              </div>
              {profileImageLoading ? <LoadingSpinner /> : null}
              {profileImage ? (
                <img src={profileImage} alt={name} className="image" />
              ) : (
                <p>'No profile image'</p>
              )}
              <form onSubmit={handleProfileImageUpdate}>
                <InputField
                  id="profileImage"
                  label="Change PROFILE Image"
                  type="file"
                  name="profileImage"
                  onChange={uploadFileHandler}
                />
                {previewImage ? (
                  <>
                    Image Preview
                    <img
                      src={previewImage}
                      alt="profile"
                      style={{ width: '120px' }}
                    />
                    <button>I Like it</button>
                    <button type="button" onClick={handleCancelImageUpload}>
                      I Dont Like it
                    </button>
                  </>
                ) : null}
              </form>
            </div>
            {console.log('xxx', profileImages)}
            <h3>ALL your Profile Images</h3>
            <div className="profile-images-wrapper">
              {profileImagesError ? (
                <p>There was an error loading images</p>
              ) : null}
              {profileImages ? (
                profileImages.map((image) => (
                  <div key={image?._id}>
                    {image._id}
                    <img
                      src={image?.avatar}
                      className="profile-image-size"
                      alt=""
                    />
                  </div>
                ))
              ) : (
                <p>'No profile image'</p>
              )}
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
          </fieldset>
        </div>
      )}
    </>
  );
};

export default ProfileEditView;
