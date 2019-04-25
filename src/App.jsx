import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: [...prevState.items, newItem],
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    this.setState({items: this.state.items.filter(item => !item.isCompleted)})
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    console.log("working")
    var items = [...this.state.items];
    for (var i = 0; i < items.length; i++) {
        console.log(i)
        if (parseInt(items[i].id) == parseInt(itemId)) {
            items[i].sessionsCompleted += 1
            this.setState({
                items: items
            })
            return
        }
    }
  }

  toggleItemIsCompleted(itemId) {
    var items = [...this.state.items];
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i].id) == parseInt(itemId)) {
            items[i].isCompleted = !items[i].isCompleted;
            this.setState({
                items: items
            })
        }
    }
    this.setState({
        areItemsMarkedAsCompleted: false
    })
    for (var i = 0; i < items.length; i++) {
        if (items[i].isCompleted) {
            this.setState({
                areItemsMarkedAsCompleted: true
            })
        }
    }
  }

  startSession(id) {
    // TODO 4
    this.setState({
        sessionIsRunning: true,
        itemIdRunning: id
    })
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
            {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)} 
              autoPlays
              key={itemIdRunning}
              
            />}
            <div className="items-container">
            {(items.length == 0) ? (
                <EmptyState />
                ) : (
                /* TODO 3:  display todo items */
                items.map(item => <TodoItem description={item.description} 
                    sessionsCompleted={item.sessionsCompleted} 
                    isCompleted={item.isCompleted} 
                    startSession={() => this.startSession(item.id)} 
                    toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                    key={item.id}/>)
                )}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
