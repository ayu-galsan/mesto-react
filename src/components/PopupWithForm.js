import React from "react";

function PopupWithForm ({isOpen, name, onClose, title, children, onSubmit, buttonText="Сохранить"}) {
  React.useEffect(()=> {
    function handleEscClose(evt) {
      if(evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keyup", handleEscClose);
    return ()=> {
      document.removeEventListener("keyup", handleEscClose);
    }
  }, [isOpen, onClose]);

  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"></button>
        <h2 className="popup__heading">{title}</h2>
        <form className={`popup__form popup__form_type-${name}`} name={`information-${name}`} onSubmit={onSubmit} noValidate>
        {children}
           <button className="popup__submit-button" type="submit">{buttonText} </button>
        </form>
     </div>
   </div>
  )
}

export default PopupWithForm;