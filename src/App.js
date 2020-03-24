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
    //'a': { id: 'a', title: 'First card', content: 'lorem ipsum' }
    const newCard = {id: newId, title: 'Random card ' + newId, content: 'yabba dabba do!'}

    //Assign content of allCards to a new variable tmpCards
    let tmpCards = this.state.store.allCards

    //Add new card 
    tmpCards[newCard.id] = newCard
    console.log("tmpCards: " + JSON.stringify(tmpCards))


    //1. Find idx of list that I'm given; use find method with an array - DONE

    //Assign content of array of objects to tmpLists
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

    //2. Once idx found, do a push on the card ids array (push new card id into the array)
    let curList = tmpLists[listIdx]
    let curListIds = curList.cardIds
    curListIds.push(newCard.id)
    console.log("curListIds = " + curListIds);
  
    curList.cardIds = curListIds;
    console.log("new cardIds = " + curList.cardIds)

    //Overwrite what is in tmpLists with curList
    tmpLists.splice(listIdx, 1, curList)
    console.log("updated tmpLists " + tmpLists[listIdx].cardIds)

    //3. Update state
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

  handleDeleteCard(cardId, listId){
    console.log('handle delete card called that has id ', {cardId})
  }

  render() {
    /*const { store } = this.props*/
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
