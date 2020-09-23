import React from 'react';
import List from './List.js';
import './App.css';
import Store from './store.js';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}
function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends React.Component {
  state = {
    store: Store
  }
  handleAddRandomCard = (id) => {
    console.log('add random card', id )
    const newCard = newRandomCard();
    const newLists = this.state.store.lists.map((list) => {
      if(list.id === id){
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        }
      }
      return list
    })
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards, 
          [newCard.id]: newCard
        }
      }
    })
    console.log(newCard,'list', id)
  }
  handleDeleteCard = (cardId) => {
    const newAllCards = omit(this.state.store.allCards, cardId);
    const newLists = this.state.store.lists.map((list) => ({
      ...list, cardIds: list.cardIds.filter(id => (id !== cardId))
    }))
    this.setState({
      store:{
        lists: newLists,
        allCards: newAllCards
      }
    })
    console.log('delete card', cardId)

  }
  render(){
  return (
    <main className='App'>
      <header className='App-header'>
        <h1>Trelloyes!</h1>
      </header>
      <div className='App-list'>
        {this.state.store.lists.map((list) =>
          <List
            id={list.id}
            key={list.id}
            header={list.header}
            cards={list.cardIds.map((id) => this.state.store.allCards[id])}
            onAddRandomCard={this.handleAddRandomCard}
            onDeleteCard={this.handleDeleteCard}
            />
        )}
      </div>
    </main>
  );
 }
}

export default App;

