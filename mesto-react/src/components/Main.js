import api from "../utils/api.js";
import React from "react";
import Card from "./Card.js";

function Main (props) {

  const[userName, setUserName] =  React.useState(false);
  const[userDescription, setUserDescription ] =  React.useState(false);
  const[userAvatar, setUserAvatar] = React.useState(false);
  const[cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(err => console.log(err))

    api.getInitialCards() 
      .then(cards => {
        setCards(cards);
      })
    .catch(err => console.log(err))
  })

  return ( 
  <main className="content">
      <section className="profile">

        <div className="profile__container">
          <img className="profile__avatar"
          src = {`${userAvatar}`}
          alt = "Аватар"
          onClick={props.onEditAvatar} />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" 
          onClick={props.onEditProfile} 
          type="button">
          </button>
          <p className="profile__job">{userDescription}</p>
        </div>

        <button className="profile__add-button" 
        onClick={props.onAddPlace} 
        type="button">
        </button>
        
      </section>

      <div className="elements">
        {cards.map(card => <Card key = {card._id} card={card} onCardClick={props.onCardClick} />)}
      </div>
      
    </main>
    
  )
}
export default Main;