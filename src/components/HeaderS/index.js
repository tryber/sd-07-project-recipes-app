import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

class HeaderS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    };
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.renderProfileIcon = this.renderProfileIcon.bind(this);
    this.renderSearchIcon = this.renderSearchIcon.bind(this);
  }

  handleSearchClick() {
    const { isSearching } = this.state;
    if (isSearching) {
      return this.setState({ isSearching: false });
    } this.setState({ isSearching: true });
  }

  renderSearchBar() {
    const { isSearching } = this.state;
    if (isSearching) {
      return <h3 data-testid="search-input">Search Bar Component</h3>;
    }
  }

  renderProfileIcon() {
    return (
      <Navbar.Brand href="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Profile link"
        />
      </Navbar.Brand>
    );
  }

  renderSearchIcon() {
    return (
      <Navbar.Brand onClick={ this.handleSearchClick }>
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Search link"
        />
      </Navbar.Brand>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <>
        <Navbar bg="primary" variant="dark">
          {this.renderProfileIcon()}
          <h3 data-testid="page-title">{ title }</h3>
          {this.renderSearchIcon()}
        </Navbar>
        {this.renderSearchBar()}
      </>
    );
  }
}

HeaderS.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderS;
