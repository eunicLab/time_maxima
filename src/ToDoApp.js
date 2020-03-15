import React from 'react';
import TodoItem from './TodoItem';
import './ToDoApp.css';
import axios from 'axios';

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);

    global.clickCount = 0;
    global.inputArray = [];
    global.backendData = '';
    global.updateCount = 0;
    global.checker = 1;

    this.state = {
      textboxStatus: 'noTextBox',
      userInput: '',
      todos: global.inputArray,
      dateInput: '',
      timeInput: '',
      alert: '',
      updateCount: 0,
      data: 0
    };
  }

  handleAdd = event => {
    event.preventDefault();
    this.setState({
      textboxStatus: 'formStyle',
      userInput: '',
      dateInput: '',
      timeInput: '',
      alert: ''
    });
  };

  componentDidMount() {
    if (this.props.dataFromParent === true) {
      var output = [];

      axios
        .get('https://still-everglades-82859.herokuapp.com/api/stuff')
        .then(response => {
          if (response.data.length > 0) {
            response.data.sort(function(a, b) {
              var dateA = new Date(a.date),
                dateB = new Date(b.date);
              return dateA - dateB; //sort by date ascending
            });
          }
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].email === this.props.emailFromParent) {
              output.push(response.data[i]);
            }
          }

          output.length > 0
            ? this.setState({ username: output[0].username })
            : this.setState({ username: this.props.firstNameFromParent });
          output.shift();
          this.setState({
            todos: output,
            data: 0,
            email: this.props.emailFromParent
          });
        });
    }
  }

  componentDidUpdate() {
    if (this.state.data !== 0 || global.checker >= 1) {
      global.checker--;
      this.componentDidMount();
    }
  }

  handleSubmit = event => {
    if (this.state.userInput !== '') {
      global.inputArray[global.clickCount] = {
        id: '',
        text: this.state.userInput,
        date: this.state.dateInput,
        time: this.state.timeInput,
        email: this.props.emailFromParent,
        username: this.state.username
      };
      console.log(this.state.username);
      axios
        .post(
          'https://still-everglades-82859.herokuapp.com/api/stuff',
          global.inputArray[global.clickCount]
        )

        .then(res => {
          this.componentDidMount();
        });

      event.preventDefault();
      this.setState({ textboxStatus: 'noTextBox' });
      global.clickCount++;
    } else {
      event.preventDefault();
      this.setState({
        textboxStatus: 'formStyle',
        userInput: '',
        dateInput: ''
      });
    }
  };

  handleCancel = event => {
    event.preventDefault();
    this.setState({
      textboxStatus: 'noTextBox',
      userInput: '',
      dateInput: '',
      timeInput: ''
    });
  };

  handleDate = event => {
    this.setState({ dateInput: event.target.value });
  };

  handleTime = event => {
    this.setState({ timeInput: event.target.value });
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  callbackFunction = childData => {
    this.setState({ data: childData });
    console.log(this.state.data);
  };

  render() {
    const todoItems = this.state.todos.map(item => (
      <TodoItem item={item} parentCallback={this.callbackFunction} />
    ));

    return (
      <div className={this.props.dataFromParent === true ? 'App' : 'noDisplay'}>
        <div className='todo-list'>
          <h6 className='motivation'>
            Tick says the Clock {this.state.username} ...Do what you have to do
          </h6>

          <form className={this.state.textboxStatus}>
            <input
              type='text'
              name='userInput'
              placeholder='To do Item'
              value={this.state.userInput}
              onChange={this.handleChange}
            />
            <br />
            <input
              type='date'
              name='date'
              placeholder='Due Date'
              value={this.state.dateInput}
              onChange={this.handleDate}
            />
            <br />
            <input
              type='time'
              name='time'
              placeholder='Time'
              value={this.state.timeInput}
              onChange={this.handleTime}
            />
            <br />
            <button className='formButton' onClick={this.handleSubmit}>
              {' '}
              OK{' '}
            </button>
            <button className='formButton' onClick={this.handleCancel}>
              CANCEL
            </button>
          </form>

          <button className='btn' onClick={this.handleAdd}>
            Add a New Item
          </button>
          {todoItems}
        </div>
      </div>
    );
  }
}

export default ToDoApp;
