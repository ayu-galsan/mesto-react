import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onAddPlace, renderLoading, buttonText, isOpen, onClose}) {
  const [place, setPlace] = React.useState('');
  const [link, setlink] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [url, setUrl] = React.useState('');
  const pattern = /https/;

  
  React.useEffect(() => {
    (place.length < 1 || place.length > 30) || !pattern.test(link) ? setIsValid(false) : setIsValid(true)
  }, [place, link])

  React.useEffect(() => {
    setPlace('');
    setlink(''); 
    setErrorText('');
    setUrl('') 
  }, [isOpen]);

  function showErrorPlace() {
    if (place.length < 1) {
      setErrorText('Минимальное количество символов: 2. Длина текста сейчас: 1 символ.')
    } else {
      setErrorText('');
    }
  }

  function showErrorLink() {
    if(!pattern.test(link)) {
      setUrl('Введите адрес сайта.')
    } else {
      setUrl('')
    }
  }

  function handleChangePlace(evt) {
    setPlace(evt.target.value);
    showErrorPlace();
  }

  function handleChangeLink(evt) {
    setlink(evt.target.value);
    showErrorLink() 
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      place,
      link,
    }); 
    renderLoading(title => {
      return (buttonText=title);
    })
  } 


  return (
    <PopupWithForm 
      name="add" 
      title="Новое место" 
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <input className={isValid ? `popup__input popup__input_el_place` : `popup__input popup__input_type_error popup__input_el_place`}
        id="place-input" 
        name="place" 
        type="text" 
        value={place||""} 
        required
        placeholder="Название"
        minLength="2" maxLength="30"
        onChange={handleChangePlace} 
      />
      <span className={isValid ? `popup__error` : `popup__error popup__error_visible`} 
        id="place-input-error" 
        value={place.value} 
        onChange={showErrorPlace}>
          {errorText}
      </span>
      <input className= {isValid ? `popup__input popup__input_el_link` : `popup__input popup__input_type_error popup__input_el_link`}
        id="url-input" 
        name="link"
        type="url" 
        value={link||""} 
        required
        placeholder="Ссылка на картинку" 
        onChange={handleChangeLink} 
      />
      <span className={isValid ? `popup__error` : `popup__error popup__error_visible`}
        id="url-input-error"
        value={link.value} 
        onChange={showErrorLink}> 
          {url}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
