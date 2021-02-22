import React from 'react';
import closeIcon from '../images/close_icon.svg';
import './Popup.css';

function Popup(props) {
  React.useEffect(() => {
    const handleKeydown = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    }

    const needHandleKeydown = props.isOpened;
    if (needHandleKeydown) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      if (needHandleKeydown) {
        document.removeEventListener('keydown', handleKeydown);
      }
    };
  }, [props]);

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  };

  return (
    <section
      className={`popup${props.isOpened ? ' popup_opened' : ''}`}
      onClick={handleOverlayClick}
      >
      <div className="popup__container">
        <h2 className="popup__header">{props.header}</h2>
        {props.children}
        <button className="popup__close-button" onClick={props.onClose} type="button">
          <img src={closeIcon} alt="Закрыть"/>
        </button>
      </div>
    </section>
  );
}

export default Popup;