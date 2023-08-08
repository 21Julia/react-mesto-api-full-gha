import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onKeyDown, onMouseDown, onUpdateUser, isLoading, changePreloaderStatus }) {
  const [name, setName] = React.useState("Жак-Ив Кусто");
  const [description, setDescription] = React.useState("Исследователь океана");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  };

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    changePreloaderStatus();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <>
          <label htmlFor="name-input" className="popup__input-field">
            <input id="name-input" type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="name" value={name || ''} onChange={handleNameChange} minLength="2" maxLength="40" required />
            <span className="name-input-error popup__input-error"></span>
          </label>
          <label htmlFor="description-input" className="popup__input-field">
            <input id="description-input" type="text" className="popup__input popup__input_type_description" placeholder="О себе" name="about" value={description || ''} onChange={handleDescriptionChange} minLength="2" maxLength="200" required />
            <span className="description-input-error popup__input-error"></span>
          </label>
        </>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
