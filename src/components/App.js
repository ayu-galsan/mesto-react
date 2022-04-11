import Header from './Header';
import React from 'react';
import api from '../utils/api';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {useState} from 'react' ;
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import AddConfirmationPopup from './AddConfirmationPopup';

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddConfirmationPopup, setisAddConfirmationPopup] = useState(false);
  const [selectedCard, setSelectedCard] =  useState(null);
  const [cards, setCards] = useState([]);  
  const [renderLoading , setRenderLoading] = useState('Сохранить'); 

  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(err))
  }, [])
    
  React.useEffect(() => {
    api.getInitialCards() 
      .then(cards => {
        setCards(cards);
      })
    .catch(err => console.log(err))
    }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  } 
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => {
          return item !== card
        }));
        setisAddConfirmationPopup(false); 
      })
      .catch(err => console.log(err))
  }  

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
  
   function handleConfirmationClick() {  
    setisAddConfirmationPopup(true);
  } 

  function handleRenderLoading(title) {
    setRenderLoading(title)
  } 

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisAddConfirmationPopup(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(currentUser) {
    setRenderLoading('Сохранение...')
    api.editProfile(currentUser)
      .then(userInfo => {
        setCurrentUser(userInfo);
        setIsEditProfilePopupOpen(false)
      })
      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Сохранить'))
  }

  function handleUpdateAvatar(avatar) {
    setRenderLoading('Сохранение...')
    api.editAvatar(avatar)
      .then (link => {
        setCurrentUser(link);
        setIsEditAvatarPopupOpen(false);
    })
      
      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Сохранить'))
  }

  function handleUpdatePlace(data) {
    setRenderLoading('Сохранение...')
    api.addNewCard(data)
      .then (newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })

      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Создать'))
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardConfirmation={handleConfirmationClick}
          />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} renderLoading={handleRenderLoading} buttonText={renderLoading} /> 
    
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} renderLoading={handleRenderLoading} buttonText={renderLoading} />
        
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdatePlace} renderLoading={handleRenderLoading} buttonText={renderLoading} />

          <AddConfirmationPopup isOpen={isAddConfirmationPopup} onClose={closeAllPopups}  onUpdateConfirmation={handleCardDelete} card={cards.find(card => card._id)}/> 
 
        <ImagePopup 
          name="card" 
          card = {selectedCard}
          onClose={closeAllPopups}
        />
        
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
