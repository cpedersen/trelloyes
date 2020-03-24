import React from 'react';
import './Card.css';

//Step 1
/*function Card(props) {
    return (
      <div className='Card'>
        <button
          type='button'
        >
          delete
        </button>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
      </div>
    )
  }*/

  //Step 2
  function Card(props) {
    return (
      <div className='Card'>
        <button
          onClick={() => props.onDeleteCard(props.item)}
          type='button'
        >
          delete
        </button>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
      </div>
    )
  }

  export default Card;