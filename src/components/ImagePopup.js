function ImagePopup(props) {
  if (!props.card) return null;
  return ( 
  <div className={props.card ? `popup popup_opened` : `popup`}>
    <figure className="popup__view-card">
      <button className="popup__close" 
        onClick={props.onClose} 
        type="button">  
      </button>
     <img className="popup__image" src={props.card.link} alt="Увеличенное изображение" />
      <figcaption className="popup__caption">{props.card.name}</figcaption>
    </figure>
  </div>)
}

export default ImagePopup;