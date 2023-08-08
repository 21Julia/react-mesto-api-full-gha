import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletionConfirmationPopup({ isOpen, onClose, onKeyDown, onMouseDown, onCardDelete, card, isLoading, changePreloaderStatus }) {

  function handleSubmit(evt) {
    evt.preventDefault();

    changePreloaderStatus();

    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      titleClass="popup__title_margin_s"
      buttonTitle="Да"
      buttonClass="popup__save-button_margin_s"
      isOpen={isOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
      isLoading={isLoading}
  />
  );
};

export default DeletionConfirmationPopup;
