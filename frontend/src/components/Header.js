import React from 'react';
import headerLogo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header({ loggedIn, isRegistered, userEmail, onSignOut }) {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  function signOut() {
    setIsMenuOpened(false);
    onSignOut();
  };

  function openMenu() {
    setIsMenuOpened(true);
  };

  function closeMenu() {
    setIsMenuOpened(false);
  };

  return (
    <header className="header">
      {loggedIn ?
        <div className={`header__info ${isMenuOpened ? 'header__info_opened' : ''}`}>
          <p className="header__email">{userEmail}</p>
          <button onClick={signOut} className="header__action header__action_type_exit button" type="button">Выйти</button>
        </div> :
        <nav className="header__navigation">
          {isRegistered ?
          <NavLink to="/sign-up" className="header__action button">Регистрация</NavLink> :
          <NavLink to="/sign-in" className="header__action button">Войти</NavLink>}
        </nav>
      }
      <div className="header__main">
        <img src={headerLogo} alt="Логотип Место-Россия." className="header__logo" />
        {loggedIn &&
          <button type="button" className={`${isMenuOpened ? 'header__close-menu button' : 'header__burger-menu button'}`} aria-label={`${isMenuOpened ? 'Закрыть меню' : 'Открыть меню'}`} onClick={isMenuOpened ? closeMenu : openMenu}></button>
        }
      </div>
    </header>
  );
};

export default Header;
