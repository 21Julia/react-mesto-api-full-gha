import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onKeyDown, onMouseDown, onUpdateAvatar, isLoading, changePreloaderStatus }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    changePreloaderStatus();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      buttonClass="popup__save-button_margin_s"
      isOpen={isOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <label htmlFor="avatar-input" className="popup__input-field">
          <input id="avatar-input" type="url" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар" name="avatar" ref={avatarRef} required />
          <span className="avatar-input-error popup__input-error"></span>
        </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
