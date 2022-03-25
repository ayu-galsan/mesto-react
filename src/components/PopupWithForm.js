
function PopupWithForm ({isOpen, name, onClose, title, children, buttonText="Сохранить"}) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"></button>
        <h2 className="popup__heading">{title}</h2>
        <form className={`popup__form popup__form_type-${name}`} name={`information-${name}`} noValidate>
        {children}
           <button className="popup__submit-button" type="submit">{buttonText}</button>
        </form>
     </div>
   </div>
  )
}

export default PopupWithForm;