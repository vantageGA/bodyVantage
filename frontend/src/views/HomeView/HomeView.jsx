import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profilesAction } from '../../store/actions/profileActions';
import './HomeView.scss';

import logo from '../../assets/logo/logo.svg';

import SearchInput from '../../components/searchInput/SearchInput';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Card from '../../components/card/Card';
import BodyVantage from '../../components/bodyVantage/BodyVantage';

const HomeView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profilesAction());
  }, [dispatch]);

  const profilesState = useSelector((state) => state.profiles);
  const { loading, error, profiles } = profilesState;

  const [keyword, setKeyword] = useState('');
  const [rndInt] = useState(Math.floor(Math.random() * profiles?.length));

  const randImg = profiles ? profiles[rndInt]?.profileImage : null;

  const searchedProfiles = profiles.filter((profile) => {
    if (
      profile?.name ||
      profile?.description ||
      profile?.location ||
      profile?.specialisation ||
      profile?.keyWordSearch
    ) {
      const description = profile?.description;
      const name = profile?.name;
      const location = profile?.location;
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
        <legend>{keyword.length > 0 ? null : 'Find a trainer near you'}</legend>
        {error ? <Message message={error} /> : null}

        <div
          style={{
            backgroundImage: profiles.length > 0 ? `url(${randImg})` : null,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            paddingBottom: '1rem',
          }}
          className="input-wrapper"
        >
          {keyword.length > 0 ? null : (
            <>
              <div className="main-heading">
                <BodyVantage />
              </div>
            </>
          )}

          <div className="search-input-position">
            <SearchInput
              type="search"
              value={keyword}
              handleSearch={handleSearch}
              placeholder="Search 'fat loss Guildford' for example"
            />
            {keyword.length > 0 ? (
              <div className="keyword-length">
                <span className="keyword-length-highlight">
                  {searchedProfiles.length}
                </span>{' '}
                profile[s] found that match your search criteria.
              </div>
            ) : null}
          </div>
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
                        profile?.specialisationOne.length
                          ? profile?.specialisationOne
                          : 'Personal Trainer'
                      }
                      specialisationTwo={
                        profile?.specialisationTwo.length
                          ? profile?.specialisationTwo
                          : 'Personal Trainer'
                      }
                      specialisationThree={
                        profile?.specialisationThree.length
                          ? profile?.specialisationThree
                          : 'Personal Trainer'
                      }
                      specialisationFour={
                        profile?.specialisationFour.length
                          ? profile?.specialisationFour
                          : 'Personal Trainer'
                      }
                      id={profile?._id}
                      name={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightKeywordMatch(profile?.name),
                          }}
                        ></span>
                      }
                      src={profile?.profileImage}
                      alt={profile?.name}
                      description={
                        <p
                          dangerouslySetInnerHTML={{
                            __html: profile?.description.slice(0, 180) + '...',
                          }}
                        ></p>
                      }
                      rating={profile?.rating}
                      number
                      of
                      reviews={profile?.numReviews}
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
