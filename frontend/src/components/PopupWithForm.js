import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, titleClass, buttonClass, buttonTitle, onMouseDown, onKeyDown, onSubmit, isLoading }) {

  React.useEffect(() => {
    if (!isOpen) return;

    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        onKeyDown();
      };
    };

    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [isOpen, onKeyDown]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onMouseDown}>
      <div className="popup__container">
        <button type="button" className={`popup__close-button popup__close-button_type_${name} button`} aria-label="Закрыть" onClick={onClose}></button>
        <form name={name} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} noValidate>
          <fieldset className="popup__input-container">
            <h2 className={`popup__title ${titleClass}`}>{title}</h2>
            {children}
            <button type="submit" className={`popup__save-button ${buttonClass}`}>{isLoading ? "Сохранение..." : buttonTitle}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
