import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {useState} from 'react' ;


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] =  useState(null);
 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {  
    setSelectedCard(card);
}

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
  <div className="page">
     <Header />
     <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
     <Footer />
     <PopupWithForm 
        name="edit" 
        title="Редактировать профиль" 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
    >
        <input className="popup__input popup__input_el_name" id="name-input" name="name" type="text" required placeholder="Имя"
        minLength="2" maxLength="40" />
        <span className="popup__error" id="name-input-error"></span>
        <input className="popup__input popup__input_el_job" id="job-input" name="about" type="text" required minLength="2" placeholder="О себе"
        maxLength="200" />
        <span className="popup__error" id="job-input-error"></span>
    </PopupWithForm>
    
    <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
    >
        <input className="popup__input popup__input_el_link" id="avatar-input" name="link" type="url" required
        placeholder="Ссылка на картинку" />
        <span className="popup__error" id="avatar-input-error"></span>
    </PopupWithForm>
   
    <PopupWithForm 
        name="add" 
        title="Новое место" 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
    >
        <input className="popup__input popup__input_el_place" id="place-input" name="place" type="text" required
        placeholder="Название" minLength="2" maxLength="30" />
        <span className="popup__error" id="place-input-error"></span>
        <input className="popup__input popup__input_el_link" id="url-input" name="link" type="url" required
        placeholder="Ссылка на картинку" />
        <span className="popup__error" id="url-input-error"></span>
    </PopupWithForm>

    <PopupWithForm 
        name="delete" 
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да"
    >
   </PopupWithForm>


    <ImagePopup 
      name="card" 
      card = {selectedCard}
      onClose={closeAllPopups}
    />
    
  </div>
  );
}

export default App;
