import React from 'react';
import Card from './Card'
import './List.css';

//Step 1
/*function List(props) {
    return (
        <section className='List'>
          <header className='List-header'>
            <h2>{props.header}</h2>
          </header>
          <div className='List-cards'>
            {props.cards.map((card) =>
              <Card
                key={card.id}
                title={card.title}
                content={card.content}
              />
            )}
            <button
              type='button'
              className='List-add-button'
            >
              + Add Random Card
            </button>
          </div>
        </section>
      )
}*/

//Step 2
function List(props) {
  return (
    <section className='List'>
      <header className='List-header'>
        <h2>{props.header}</h2>
      </header>
      <div className='List-cards'>
        {props.cards.map((card) =>
          <Card
            key={props.cardData[card].id}
            item={props.cardData[card].id}
            title={props.cardData[card].title}
            content={props.cardData[card].content}
            onDeleteCard={props.onDeleteCard}
          />
        )}
        <button
          onClick={() => props.onAddRandomCard(props.item)}
          type='button'
          className='List-add-button'
        >
          + Add Random Card
        </button>
      </div>
    </section>
  )
}

export default List;