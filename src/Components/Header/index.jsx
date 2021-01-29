import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../App.css';
import profileicon from '../../images/profileIcon.svg';
import searchicon from '../../images/searchIcon.svg';

const userName = 'User';
const Header = (props) => {
  const { title } = props;
  const history = useHistory();
  const { location } = history;

  const isHeader = () => (
    <div className="search">
      <img src={ searchicon } alt="serchIcon" data-testid="search-top-btn" />
    </div>
  );

  return (
    <div className="header">
      <div className="user">
        <Link to="/perfil">
          <img
            src={ profileicon }
            alt="avatar-user"
            className="user-avatar"
            data-testid="profile-top-btn"
          />
        </Link>
        <p>{userName}</p>
      </div>
      <div className="title-header" data-testid="page-title">
        <h1>{title}</h1>
      </div>
      {location.pathname === '/comidas'
      || location.pathname === '/bebidas'
      || location.pathname === '/explorar/comidas/area' ? isHeader() : null}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
