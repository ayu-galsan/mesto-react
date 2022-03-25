
function PopupWithForm (props) {
  return (
    <div className={props.isOpen ? `popup  popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={props.onClose} type="button"></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form className={`popup__form popup__form_type-${props.name}`} name={`information-${props.name}`} noValidate>
        {props.children}
           <button className="popup__submit-button" type="submit">{props.buttonText}</button>
        </form>
     </div>
   </div>
  )
}

export default PopupWithForm;