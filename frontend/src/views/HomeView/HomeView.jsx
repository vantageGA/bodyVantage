import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profilesAction } from '../../store/actions/profileActions';
import './HomeView.scss';

import SearchInput from '../../components/searchInput/SearchInput';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';

const HomeView = () => {
  const [keyword, setKeyword] = useState('');
  const [rndInt, setRndInt] = useState(null);
  const dispatch = useDispatch();

  const profilesState = useSelector((state) => state.profiles);
  const { loading, error, profiles } = profilesState;

  useEffect(() => {
    dispatch(profilesAction());
    setRndInt(Math.floor(Math.random() * profiles.length));
  }, [dispatch, profiles.length]);

  const searchedProfiles = profiles.filter((profile) => {
    if (
      profile.name ||
      profile.description ||
      profile.location ||
      profile.specialisation ||
      profile.keyWordSearch
    ) {
      const description = profile.description;
      const name = profile.name;
      const location = profile.location;
      const specialisation = profile?.specialisation;
      const keyWordSearch = profile?.keyWordSearch;

      const search = description.concat(
        ...location,
        ...name,
        ...specialisation,
      );

      const found =
        search.toLowerCase().includes(keyword.toLowerCase()) ||
        keyWordSearch.toLowerCase().includes(keyword.toLowerCase());

      if (found) {
        return found;
      }
    }
    return false;
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const highlightKeywordMatch = (current) => {
    let reggie = new RegExp(keyword, 'ig');
    let found = current.search(reggie) !== -1;
    return !found
      ? current
      : current.replace(
          reggie,
          '<span style="color:rgba(255, 255, 255, .6); text-decoration:underline;" >' +
            keyword +
            '</span>',
        );
  };

  return (
    <>
      <fieldset className="fieldSet">
        <legend>Home</legend>
        {error ? <Message message={error} /> : null}
        <div
          style={{
            backgroundImage: `url(uploads/profiles/${profiles[rndInt]?.profileImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            paddingBottom: '1rem',
          }}
        >
          <div className="main-heading">Welcome to BODY-VANTAGE</div>
          <div className="sub-heading">Find a trainer near you</div>
          <div>
            <SearchInput
              type="search"
              value={keyword}
              handleSearch={handleSearch}
              label="SEARCH FOR A PT AND LOCATION"
            />
          </div>
          {keyword.length > 0 ? (
            <div className="keyword-length">
              We found {searchedProfiles.length} profiles that match your search
              criteria.
            </div>
          ) : null}
        </div>

        <div className="home-view">
          {keyword.length > 0 ? (
            <div className="card-wrapper">
              {searchedProfiles.map((profile) =>
                loading ? (
                  <LoadingSpinner />
                ) : (
                  <div key={profile?._id}>
                    <Card
                      specialisationOne={
                        profile.specialisationOne.length
                          ? profile.specialisationOne
                          : 'Personal Trainer'
                      }
                      specialisationTwo={
                        profile.specialisationTwo.length
                          ? profile.specialisationTwo
                          : 'Personal Trainer'
                      }
                      specialisationThree={
                        profile.specialisationThree.length
                          ? profile.specialisationThree
                          : 'Personal Trainer'
                      }
                      specialisationFour={
                        profile.specialisationFour.length
                          ? profile.specialisationFour
                          : 'Personal Trainer'
                      }
                      id={profile._id}
                      name={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightKeywordMatch(profile.name),
                          }}
                        ></span>
                      }
                      src={`uploads/profiles/${profile.profileImage}`}
                      alt={profile.name}
                      description={
                        <p
                          dangerouslySetInnerHTML={{
                            __html: profile.description.slice(0, 180) + '...',
                          }}
                        ></p>
                      }
                      rating={profile.rating}
                      number
                      of
                      reviews={profile.numReviews}
                    />
                  </div>
                ),
              )}
            </div>
          ) : null}
        </div>
      </fieldset>
    </>
  );
};

export default HomeView;
