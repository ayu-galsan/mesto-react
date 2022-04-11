import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose, renderLoading, buttonText}) {
  const [value, setValue] = React.useState();
  const linkRef = React.useRef();
  const [isValid, setIsValid] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const pattern = /https/;

  React.useEffect(() => {
    !pattern.test(value) ? setIsValid(false) : setIsValid(true)
  }, [pattern, value])

 
  function showErrorLink() {
    if(!pattern.test(value)) {
      setUrl('Введите адрес сайта.')
    } else {
      setUrl('')
    }
  }

  function handleChange(evt) {
    setValue(evt.target.value);
    showErrorLink()
  } 

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      link: linkRef.current.value
    });
    renderLoading(title => {
      return (buttonText=title)})
  } 

  React.useEffect(()=>{
    linkRef.current.value = '';
  },[isOpen]);

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input className={isValid ? `popup__input popup__input_el_link` : `popup__input popup__input_type_error popup__input_el_link`}
        value={value||''} 
        id="avatar-input" 
        name="link" 
        type="url" 
        required
        placeholder="Ссылка на картинку"  
        ref={linkRef} 
        onChange={handleChange} 
      />
      <span className="popup__error"
        id="avatar-input-error"
        value={linkRef.value}>
        {url}
      </span>
   </PopupWithForm>
)
}

export default EditAvatarPopup;