import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onKeyDown, onMouseDown, onAddPlace, isLoading, changePreloaderStatus }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  };

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    changePreloaderStatus();

    onAddPlace({
      name,
      link
    });
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <>
          <label htmlFor="title-input" className="popup__input-field">
            <input id="title-input" type="text" className="popup__input popup__input_type_title" placeholder="Название" name="name" minLength="2" maxLength="30" value={name} onChange={handleNameChange} required />
            <span className="title-input-error popup__input-error"></span>
          </label>
          <label htmlFor="link-input" className="popup__input-field">
            <input id="link-input" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" name="link" value={link} onChange={handleLinkChange} required />
            <span className="link-input-error popup__input-error"></span>
          </label>
        </>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
