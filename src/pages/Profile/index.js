import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

function Profile({ history, search = false }) {
  return (
    <>
      <Header history={ history } search={ search } />
      <p>Profile</p>
    </>
  );
}

Profile.defaultProps = { search: false };

Profile.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
