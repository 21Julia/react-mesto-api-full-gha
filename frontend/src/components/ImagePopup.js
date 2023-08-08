import React from 'react';

function ImagePopup({ card, onClose, onMouseDown, onKeyDown }) {

  React.useEffect(() => {
    if (!card) return;

    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        onKeyDown();
      };
    };

    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [card, onKeyDown]);

  return (
    <div className={`popup popup_type_image popup_opacity_l ${card ? 'popup_opened' : ''}`} onMouseDown={onMouseDown}>
      <div className="popup__illustration-container">
        <button type="button" className="popup__close-button popup__close-button_type_image button" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__illustration">
          <img className="popup__image" alt={card ? card.name : null} src={card ? card.link : null}/>
          <figcaption className="popup__caption">{card ? card.name : null}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
