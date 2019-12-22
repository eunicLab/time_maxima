import React from "react"
import TodoItem from "./TodoItem"
import './App.css';
import InputBox from "./InputBox"


class App extends React.Component {
    constructor(){
      global.InputArray = ["hello", "world", "how", "are", "you", "today"]
      super()
      this.state={
        todos: global.InputArray

    }
  }

    render(){
        const todoItems = this.state.todos.map(item =><TodoItem item={item}/>)

      return (

        <div className="todo-list">
            <InputBox/>
            {todoItems}
            
        </div>
     
    )
  }
}

export default App