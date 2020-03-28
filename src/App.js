import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';

//STEP 1
/*class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
        </div>
      </main>
    );
  }
}*/



//STEP 2 - use state for store instead of props

//Here's a function provided in the assignment:
function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

//Here's our newly revised App component code:
class App extends Component {
  state = {
    store: {
      lists: STORE.lists,
      allCards: STORE.allCards,
    }
  };

  handleAddRandomCard = (listId) => {
    console.log('handle add random card called that has id ', {listId})

    //Create a random id using 2 letters
    let text = "";
    let char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i < 2; i++) {  
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    let newId = text;
    console.log("newId = " + newId)

    //Assign this random id to a new card variable
    const newCard = {id: newId, title: 'Random card ' + newId, content: 'yabba dabba do!'}

    //Assign content of allCards to a new variable tmpCards
    let tmpCards = this.state.store.allCards

    //Add new card 
    tmpCards[newCard.id] = newCard
    console.log("tmpCards: " + JSON.stringify(tmpCards))

    //Find idx of list that we're given
    //a. Use find method with  array 
    //b. Assign content of array of card list objects to tmpLists
    console.log("listId = " + listId)
    let tmpLists = this.state.store.lists
    console.log("tmpLists: " + tmpLists)

    //Find idx value for the list obj in the tmpLists array
    let j = 0;
    let listIdx = tmpLists.findIndex(obj => {
      console.log("obj = " + obj);
      if (obj.id === listId) {
        return listId;
      } 
      j++;
    })
    console.log("listIdx (for new random card) = " + listIdx)

    //Once idx found, do a push on the card ids array (push new card id into the array)
    let curList = tmpLists[listIdx]
    let curListIds = curList.cardIds
    curListIds.push(newCard.id)
    console.log("curListIds = " + curListIds);
  
    curList.cardIds = curListIds;
    console.log("new cardIds = " + curList.cardIds)

    //Overwrite what is in tmpLists with curList
    tmpLists.splice(listIdx, 1, curList)
    console.log("updated tmpLists " + tmpLists[listIdx].cardIds)

    //Update state
    this.setState({lists: tmpLists})
    this.setState({allCards: tmpCards})
    for (let i=0; i < this.state.store.lists.length; i++) {
      console.log("----------------------------------------")
      console.log("id: " + this.state.store.lists[i].id)
      console.log("header: " + this.state.store.lists[i].header)
      console.log("cardIds: " + this.state.store.lists[i].cardIds)
    }
    console.log("----------------------------------------")
  }

  handleDeleteCard = (cardId) => {
    //When deleting a card, you'll need to remove the references to that card in each 
    //list's cardIds; you can combine a map with a filter for this to generate a new 
    //lists array.
    console.log('handle delete card called that has id: ', {cardId})

    //Remove card from the lists *array* of objects inside store
    //a. Use map with array to loop through each item
    //b. Use filter inside map to remove card matching cardId from each 
    //   item's cardIds array
    //c. Return items using the key, value format
    let tmpLists2 = this.state.store.lists
      .map(list => {
        console.log("List " + list.id)
        console.log("Before filter:" + list.cardIds)
        //Create a list of all cards except for the deleted card
        list.cardIds = list.cardIds.filter(card => card !== cardId) 
        console.log("After filter:" + list.cardIds)

        //Return items using key, value format
        return {id: list.id, header: list.header, cardIds: list.cardIds}
      })
    console.log("tmpLists2 = " + JSON.stringify(tmpLists2))

    //Remove card from the allCards *object* inside store
    //a. Create tmpCards2 object to store allCards objs
    //b. Use omit function to remove card from tmpCards2
    console.log("cardId to remove from allCards: " + cardId)
    let tmpCards2 = this.state.store.allCards
    console.log("tmpCards2: " + JSON.stringify(tmpCards2))
    const newObjectWithOmittedCard = omit(tmpCards2, cardId)

    //Update state using tmp values
    this.setState({lists: tmpLists2})
    this.setState({allCards: newObjectWithOmittedCard})
  }

  render() {
    //Previous way using props:
    /*const { store } = this.props*/

    //New way using state:
    console.log(this.state)
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              item={list.id}
              header={list.header}
              cards={list.cardIds}
              cardData={this.state.store.allCards}
              onDeleteCard={this.handleDeleteCard}
              onAddRandomCard={this.handleAddRandomCard}
            />

          ))}
        </div>
      </main>
    );
  }
}


export default App;
