import React from 'react';
import axios from 'axios';
import './App.css';
import Loading from './components/Loading.js';
import ToDoPage from './components/ToDoPage.js';
import LoginPage from './components/LoginPage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    global.email = '';
    global.error = 0;
    global.firstName = '';

    global.clickCount = 0;
    global.inputArray = [];
    global.updateCount = 0;
    global.checker = 1;
    this.state = {
      createBtn: 'btnlogin',
      loginBtn: 'noDisplay',
      signUpTop: 'buttonTopActive',
      loginTop: 'buttonTop',
      firstName: '',
      loggedIn: false,
      emailInput: '',
      passwordInput: '',
      firstnameInput: '',
      error: 0,

      textboxStatus: 'noDisplay',
      userInput: '',
      todos: global.inputArray,
      dateInput: '',
      timeInput: '',
      alert: '',
      updateCount: 0,
      data: 0,
      loadingImage: 'noDisplay',
      token: '',
    };
  }

  //functions for to_do section

  afterLogin = () => {
    var api = 'https://still-everglades-82859.herokuapp.com/api/stuff';
    axios
      .get(api, {
        params: {
          email: this.state.emailInput.toLowerCase(),
        },
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then((response) => {
        if (response.data.length > 0) {
          response.data.sort(function (a, b) {
            var dateA = new Date(a.date),
              dateB = new Date(b.date);
            return dateA - dateB; //sort by date ascending
          });
        }
        response.data.length > 0
          ? this.setState({ username: response.data[0].username })
          : this.setState({ username: this.state.firstnameInput });
        response.data.shift();
        this.setState({
          todos: response.data,
          data: 0,
          email: this.state.emailInput,
        });
      });
  };

  componentDidUpdate() {
    if (this.state.data !== 0) {
      global.checker--;
      this.afterLogin();
    }
  }

  handleSubmit = (event) => {
    if (this.state.userInput !== '') {
      global.inputArray[global.clickCount] = {
        id: '',
        text: this.state.userInput,
        date: this.state.dateInput,
        time: this.state.timeInput,
        email: this.state.emailInput.toLowerCase(),
        username: this.state.username,
      };
      console.log(this.state.username);
      var api = 'https://still-everglades-82859.herokuapp.com/api/stuff';
      axios
        .post(api, global.inputArray[global.clickCount], {
          headers: { Authorization: `Bearer ${this.state.token}` },
        })

        .then((res) => {
          this.afterLogin();
        });

      event.preventDefault();
      this.setState({ textboxStatus: 'noDisplay' });
      global.clickCount++;
    } else {
      event.preventDefault();
      this.setState({
        textboxStatus: 'formStyle',
        userInput: '',
        dateInput: '',
      });
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({
      textboxStatus: 'noDisplay',
      userInput: '',
      dateInput: '',
      timeInput: '',
    });
  };

  handleDate = (event) => {
    this.setState({ dateInput: event.target.value });
  };

  handleTime = (event) => {
    this.setState({ timeInput: event.target.value });
  };

  handleChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  callbackFunction = (childData) => {
    this.setState({ data: childData });
    console.log(this.state.data);
  };

  handleAdd = (event) => {
    event.preventDefault();
    this.setState({
      textboxStatus: 'formStyle',
      userInput: '',
      dateInput: '',
      timeInput: '',
      alert: '',
    });
  };

  //functions for login section
  handleTopSignUpButton = (event) => {
    event.preventDefault();
    this.setState({
      signUpTop: 'buttonTopActive',
      loginTop: 'buttonTop',
      createBtn: 'btnlogin',
      loginBtn: 'noDisplay',
      firstName: '',
      error: 0,
    });
  };

  handleTopLoginButton = (event) => {
    event.preventDefault();
    this.setState({
      signUpTop: 'buttonTop',
      loginTop: 'buttonTopActive',
      createBtn: 'noDisplay',
      loginBtn: 'btnlogin',
      firstName: 'noDisplay',
      error: 0,
    });
  };

  handleEmail = (event) => {
    this.setState({
      emailInput: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  handleFirstName = (event) => {
    this.setState({ firstnameInput: event.target.value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({ loadingImage: 'loadingImage' });

    axios
      .post('https://still-everglades-82859.herokuapp.com/api/auth/login', {
        email: this.state.emailInput.toLowerCase(),
        password: this.state.passwordInput,
      })
      .then(
        (response) => {
          global.email = this.state.emailInput.toLowerCase();
          this.setState({
            loggedIn: true,
            error: 0,
            loadingImage: 'noDisplay',
            token: response.data.token,
          });
          this.afterLogin();
          console.log(response.data.token);
        },
        (error) =>
          this.setState({
            loggedIn: false,
            error: 1,
            loadingImage: 'noDisplay',
          })
      );
  };

  handleGuest = (event) => {
    event.preventDefault();
    this.setState({ loadingImage: 'loadingImage' });
    var api = 'https://still-everglades-82859.herokuapp.com/api/auth/login';
    axios
      .post(api, {
        email: 'guest',
        password: 'guest',
      })
      .then((response) => {
        global.email = 'guest';

        this.setState({
          loggedIn: true,
          emailInput: 'guest',
          loadingImage: 'noDisplay',
          token: response.data.token,
        });
        this.afterLogin();
      });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    var firstPost = {
      id: '',
      text: 'A',
      date: '',
      time: '',
      email: this.state.emailInput.toLowerCase(),
      username: this.state.firstnameInput,
    };

    var api2 = 'https://still-everglades-82859.herokuapp.com/api/stuff';
    var api1 = 'https://still-everglades-82859.herokuapp.com/api/auth/signup';

    this.setState({ loadingImage: 'loadingImage' });
    this.state.passwordInput !== '' &&
    this.state.firstnameInput !== '' &&
    this.state.emailInput !== ''
      ? axios
          .post(api1, {
            email: this.state.emailInput.toLowerCase(),
            password: this.state.passwordInput,
          })
          .then(
            (response) => {
              global.email = this.state.emailInput.toLowerCase();
              global.firstName = this.state.firstnameInput;

              axios
                .post(
                  'https://still-everglades-82859.herokuapp.com/api/auth/login',
                  {
                    email: this.state.emailInput.toLowerCase(),
                    password: this.state.passwordInput,
                  }
                )
                .then(
                  (response) => {
                    global.email = this.state.emailInput.toLowerCase();
                    this.setState({
                      loggedIn: true,
                      error: 0,
                      loadingImage: 'noDisplay',
                      token: response.data.token,
                    });
                    this.afterLogin();
                    axios.post(api2, firstPost, {
                      headers: {
                        Authorization: `Bearer ${response.data.token}`,
                      },
                    });
                  },
                  (error) =>
                    this.setState({
                      loggedIn: false,
                      error: 1,
                      loadingImage: 'noDisplay',
                    })
                );
            },
            (error) =>
              this.setState({
                loggedIn: false,
                error: 3,
                loadingImage: 'noDisplay',
              })
          )
      : this.setState({ error: 2, loadingImage: 'noDisplay' });
  };

  render() {
    return (
      <div>
        <div className={this.state.loadingImage}>
          <Loading />
        </div>
        <LoginPage
          loggedIn={this.state.loggedIn}
          signUpTop={this.state.signUpTop}
          loginTop={this.state.loginTop}
          error={this.state.error}
          firstName={this.state.firstName}
          firstnameInput={this.state.firstnameInput}
          email={this.state.email}
          emailInput={this.state.emailInput}
          password={this.state.password}
          passwordInput={this.state.passwordInput}
          createBtn={this.state.createBtn}
          loginBtn={this.state.loginBtn}
          handleTopSignUpButton={this.handleTopSignUpButton}
          handleTopLoginButton={this.handleTopLoginButton}
          handleFirstName={this.handleFirstName}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          handleSignUp={this.handleSignUp}
          handleLogin={this.handleLogin}
          handleGuest={this.handleGuest}
        />

        <ToDoPage
          loggedIn={this.state.loggedIn}
          todos={this.state.todos}
          token={this.state.token}
          username={this.state.username}
          textboxStatus={this.state.textboxStatus}
          userInput={this.state.userInput}
          dateInput={this.state.dateInput}
          timeInput={this.state.timeInput}
          callbackFunction={this.callbackFunction}
          handleChange={this.handleChange}
          handleDate={this.handleDate}
          handleTime={this.handleTime}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}
export default App;
