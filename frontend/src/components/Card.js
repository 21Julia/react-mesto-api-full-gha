import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, cardForConfirmation }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(like => like === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked && 'element__like-button_active'}`);

  function handleCardClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    cardForConfirmation(card);
    onCardDelete();
  };

  return (
    <div className="card-template">
      <li className="element">
        {isOwn && <button type="button" className="element__delete-button button" aria-label="Удалить" onClick={handleDeleteClick}/>}
        <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick}/>
        <div className="element__items">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button type="button" className={cardLikeButtonClassName} aria-label="Понравилось" onClick={handleLikeClick}></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Card;
