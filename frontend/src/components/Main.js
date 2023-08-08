import React from 'react';
import defaultAvatar from '../images/profile-kusto.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cardForConfirmation }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="Информация о профиле">
        <div className="profile__info">
          <button type="button" className="profile__avatar-button" aria-label="Изменить аватар" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : defaultAvatar} alt="Аватар пользователя." className="profile__image" />
          </button>
          <div className="profile__description">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name ? currentUser.name : 'Жак-Ив Кусто'}</h1>
              <p className="profile__subtitle">{currentUser.about ? currentUser.about : 'Исследователь океана'}</p>
            </div>
            <button type="button" className="profile__edit-button button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Плитка картинок">
        <ul className="elements__list">
          {cards.map((card, i) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cardForConfirmation={cardForConfirmation}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
