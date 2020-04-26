import React from 'react';
import '../App.css';
import edit from '../images/edit_icon.png';
import delete_icon from '../images/delete_icon.png';
import axios from 'axios';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    global.updateCount = 0;
    this.state = {
      checkBoxStatus: false,
      styleText: 'unchecked',
      reminder: null,
      alert: false,
      editBoxStatus: 'noDisplay',
      userInput: '',
      dateInput: '',
      timeInput: '',
      updateCount: global.updateCount,
    };

    this.handleBoxChange = this.handleBoxChange.bind(this);
    this.reminderLogic = this.reminderLogic.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.reminder = this.reminder.bind(this);
  }

  reminderLogic() {
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth();
    var day = curTime.getDate();

    var end = new Date(this.props.item.date);
    var year2 = end.getFullYear();
    var month2 = end.getMonth();
    var day2 = end.getDate();

    var day3;
    var future = day2 - day;
    var past = day - day2;

    var futureMonth = month2 - month;
    var pastMonth = month - month2;
    var futureYear = year2 - year;
    var pastYear = year - year2;
    if (futureYear === 1) {
      day3 = false;
    }
    if (futureYear === -1) {
      day3 = true;
    }
    if (futureYear > 1) {
      day3 = false;
    }
    if (futureYear < 1) {
      day3 = true;
    }
    if (futureMonth > 0 && futureYear === 0) {
      day3 = false;
    }
    if (futureMonth < 0 && futureYear === 0) {
      day3 = true;
    }
    if (future > 0 && futureMonth === 0 && futureYear === 0) {
      day3 = false;
    }
    if (future < 0 && futureMonth === 0 && futureYear === 0) {
      day3 = true;
    }
    if (future === 0 && futureMonth === 0 && futureYear === 0) {
      day3 = true;
    }

    return day3;
  }

  reminder() {
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth();
    var day = curTime.getDate();

    var end = new Date(this.props.item.date);
    var year2 = end.getFullYear();
    var month2 = end.getMonth();
    var day2 = end.getDate();

    var day3;
    var future = day2 - day;
    var past = day - day2;

    var futureMonth = month2 - month;
    var pastMonth = month - month2;
    var futureYear = year2 - year;
    var pastYear = year - year2;
    if (futureYear === 1) {
      day3 = 'Due next year';
    }
    if (futureYear === -1) {
      day3 = 'Due last year';
    }
    if (futureYear > 1) {
      day3 = 'due in ' + futureYear + ' year(s) time';
    }
    if (futureYear < 1) {
      day3 = 'due ' + pastYear + ' year(s) ago';
    }
    if (futureMonth > 0 && futureYear === 0) {
      day3 = 'Due in ' + futureMonth + ' month(s) time';
    }
    if (futureMonth < 0 && futureYear === 0) {
      day3 = 'Due ' + pastMonth + ' month(s) ago';
    }
    if (future > 0 && futureMonth === 0 && futureYear === 0) {
      day3 = 'Due in ' + future + ' day(s)';
    }
    if (future < 0 && futureMonth === 0 && futureYear === 0) {
      day3 = 'Due ' + past + ' day(s) ago';
    }
    if (future === 0 && futureMonth === 0 && futureYear === 0) {
      day3 = 'Due today';
    }

    return day3;
  }

  handleDate(event) {
    this.setState({ dateInput: event.target.value });
  }

  handleTime(event) {
    this.setState({ timeInput: event.target.value });
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleBoxChange(event) {
    this.setState({
      checkBoxStatus: event.target.checked,
    });
  }

  handleEdit(event) {
    event.preventDefault();

    this.setState({
      editBoxStatus: 'formStyle',
      userInput: this.props.item.text,
      dateInput: this.props.item.date,
      timeInput: this.props.item.time,
    });
  }

  handleUpdate(event) {
    event.preventDefault();

    const upDatedList = {
      text: this.state.userInput,
      date: this.state.dateInput,
      time: this.state.timeInput,
    };

    axios
      .put(
        'https://still-everglades-82859.herokuapp.com/api/stuff/' +
          this.props.item._id,
        upDatedList,
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then((res) => {
        global.updateCount++;
        this.setState({ updateCount: global.updateCount });
        this.sendData();
      });

    this.setState({
      editBoxStatus: 'noDisplay',
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ editBoxStatus: 'noDisplay' });
  }

  sendData = () => {
    this.props.parentCallback(this.state.updateCount);
  };

  handleDelete(event) {
    event.preventDefault();
    axios
      .delete(
        'https://still-everglades-82859.herokuapp.com/api/stuff/' +
          this.props.item._id,
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then((res) => {
        global.updateCount++;
        this.setState({ updateCount: global.updateCount });
        this.sendData();
      });
  }

  render() {
    return (
      <div className='container'>
        <div className='todo-item'>
          <input
            type='checkbox'
            name='checkbox'
            checked={this.state.checkBoxStatus}
            onChange={this.handleBoxChange}
            className='myCheckBox'
          />
          <p className={this.state.checkBoxStatus ? 'checked' : 'unchecked'}>
            {this.props.item.text}
          </p>
          <p className='date'>{this.props.item.date}</p>

          <img
            src={edit}
            className='icon1'
            alt='An edit button'
            onClick={this.handleEdit}
          />
          <img
            src={delete_icon}
            className='icon2'
            alt='A delete button'
            onClick={this.handleDelete}
          />
        </div>
        <p
          className={
            this.reminderLogic() === true && this.state.checkBoxStatus == false
              ? 'reminderAlert'
              : 'reminder'
          }>
          {this.reminder()}
        </p>

        <form className={this.state.editBoxStatus}>
          <input
            type='text'
            name='userInput'
            value={this.state.userInput}
            onChange={this.handleChange}
          />
          <br />
          <input
            type='date'
            name='date'
            value={this.state.dateInput}
            onChange={this.handleDate}
          />
          <br />
          <input
            type='time'
            name='time'
            value={this.state.timeInput}
            onChange={this.handleTime}
          />
          <br />
          <button className='formButton' onClick={this.handleUpdate}>
            Update
          </button>
          <button className='formButton' onClick={this.handleCancel}>
            CANCEL
          </button>
        </form>
      </div>
    );
  }
}

export default TodoItem;
