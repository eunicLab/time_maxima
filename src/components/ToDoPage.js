import React from 'react';
import '../App.css';
import TodoItem from './TodoItem';
class ToDoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const todoItems = this.props.todos.map((item) => (
      <TodoItem
        item={item}
        parentCallback={this.props.callbackFunction}
        token={this.props.token}
      />
    ));
    return (
      <div>
        <div className={this.props.loggedIn === true ? 'App' : 'noDisplay'}>
          <div className='todo-list'>
            <h6 className='motivation'>
              Tick says the Clock {this.props.username} ...Do what you have to
              do
            </h6>

            <form className={this.props.textboxStatus}>
              <input
                type='text'
                name='userInput'
                placeholder='To do Item'
                value={this.props.userInput}
                onChange={this.props.handleChange}
              />
              <br />
              <input
                type='date'
                name='date'
                placeholder='Due Date'
                value={this.props.dateInput}
                onChange={this.props.handleDate}
              />
              <br />
              <input
                type='time'
                name='time'
                placeholder='Time'
                value={this.props.timeInput}
                onChange={this.props.handleTime}
              />
              <br />
              <button className='formButton' onClick={this.props.handleSubmit}>
                {' '}
                OK{' '}
              </button>
              <button className='formButton' onClick={this.props.handleCancel}>
                CANCEL
              </button>
            </form>

            <button className='btn' onClick={this.props.handleAdd}>
              Add a New Item
            </button>
            {todoItems}
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoPage;
