import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id ;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete' : 'element__delete_hidden'}`
    ); 

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName =  (
    `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
    ); 

  function handleClick() {
    props.onCardClick(props.card) 
   }

  function handleLikeClick() {
    props.onCardLike(props.card) 
   }

  function handleAddConfirmation() {
    props.onCardConfirmation() 
   }


  return ( 
      <article className="element">
        <img className="element__image" 
        src={`${props.card.link}`} 
        alt= {props.card.name}
        onClick={handleClick}  
        />
        <button className={cardDeleteButtonClassName} onClick={handleAddConfirmation}  type="button"></button>
        <div className="element__container">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__likegroup">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
            <p className="element__likesCount">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}

export default Card;