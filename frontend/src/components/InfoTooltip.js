import React from 'react';

function InfoTooltip({ isOpen, isSuccess, onClose, onKeyDown, onMouseDown }) {
  const name = isSuccess ? 'success' : 'fail';

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
        <button type="button" className={`popup__close-button button`} aria-label="Закрыть" onClick={onClose}></button>
        <div className={`popup__registration-image ${isSuccess ? 'popup__registration-image_type_success' : 'popup__registration-image_type_fail'}`}></div>
        <p className="popup__message">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
