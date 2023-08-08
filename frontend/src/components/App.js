import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletionConfirmationPopup from './DeletionConfirmationPopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import Spinner from './Spinner';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardForDelete, setCardForDelete] = React.useState(null);

  const [preloader, setPreloader] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    verifyTokens();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    loggedIn && api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards.reverse());
      })
      .catch(err => console.log(`Ошибка при загрузке первоначальных карточек: ${err}`));
  }, [loggedIn]);

  function verifyTokens() {
    auth.checkToken()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          makeMainPageVisible();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(`Ошибка при проверке токена: ${err}`);
      });
  };

  function handleRegister(formValue) {
    auth.register(formValue)
      .then(() => {
        navigate('/sign-in', {replace: true});
        setIsSuccess(true);
        handleWithRegisterOrLoginForm();
      })
      .catch((err) => {
        setIsSuccess(false);
        handleWithRegisterOrLoginForm();
        console.log(`Ошибка при регистрации: ${err}`);
      })
      .finally(() => setPreloader(false));
  };

  function handleLogin(user) {
    auth.authorize(user)
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          makeMainPageVisible();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        handleWithRegisterOrLoginForm();
        console.log(`Ошибка при входе: ${err}`);
      })
      .finally(() => setPreloader(false));
  };

  function signOut() {
    auth.signOut()
      .then(() => {
        setCurrentUser({});
        setLoggedIn(false);
        navigate('/sign-in', {replace: true});
      })
      .catch(err => console.log(`Ошибка при выходе: ${err}`));
  };

  function handleUpdateUser(newUserInfo) {
    api.updateUserInformation(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при обновлении данных: ${err}`))
      .finally(() => setPreloader(false));
  };

  function handleUpdateAvatar(newUserAvatar) {
    api.updateAvatar(newUserAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при обновлении аватара: ${err}`))
      .finally(() => setPreloader(false));
  };

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
      .finally(() => setPreloader(false));
  };

  function handleCardLike(currentCard) {
    const isLiked = currentCard.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(currentCard._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map(card => card._id === currentCard._id ? newCard : card));
      })
      .catch(err => console.log(`Ошибка при добавлении или удалении лайка: ${err}`));
  };

  function handleCardDelete(cardForDelete) {
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setPreloader(false));
  };

  function handleWithRegisterOrLoginForm() {
    setIsInfoTooltipPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick() {
    setIsDeleteConfirmationPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null);
  };

  function closeByMouse(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  };

  function makeRegistrationButton() {
    setIsRegistered(true);
  };

  function makeLoginButton() {
    setIsRegistered(false);
  };

  function makeMainPageVisible() {
    setLoggedIn(true);
  };

  function changePreloaderStatus() {
    setPreloader(true);
  };

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          isRegistered={isRegistered}
          userEmail={currentUser.email}
          onSignOut={signOut}
        />
        <Routes>
          <Route path="/"
            element={<ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              cardForConfirmation={setCardForDelete}
            />}
          />
          <Route path="/sign-up"
            element={<Register
              makeLoginButton={makeLoginButton}
              onRegisterButton={handleRegister}
              isLoading={preloader}
              changePreloaderStatus={changePreloaderStatus}
            />}
          />
          <Route path="/sign-in"
            element={loggedIn === null ? <Spinner/> :
            <Login
              makeRegistrationButton={makeRegistrationButton}
              onLoginButton={handleLogin}
              isLoading={preloader}
              changePreloaderStatus={changePreloaderStatus}
            />}
          />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          isSuccess={isSuccess}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onUpdateUser={handleUpdateUser}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        < DeletionConfirmationPopup
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          card={cardForDelete}
          onCardDelete={handleCardDelete}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onMouseDown={closeByMouse}
          onKeyDown={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
