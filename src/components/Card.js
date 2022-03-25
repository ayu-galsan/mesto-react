function Card (props) {
  function handleCardClick() {
    props.onCardClick(props.card) 
  }
  return ( 
      <article className="element">
        <img className="element__image" 
        src={`${props.card.link}`} 
        alt="Картинка"
        onClick={handleCardClick}  
        />
        <button className="element__delete" type="button"></button>
        <div className="element__container">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__likegroup">
            <button className="element__like" type="button"></button>
            <p className="element__likesCount">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}

export default Card;