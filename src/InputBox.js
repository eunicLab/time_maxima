import React from "react"
import TodoItem from "./TodoItem"
import './App.css';

class App extends React.Component{
	constructor(){
		super()
	
		global.clickCount = 0
		global.inputArray = []
	
	

		this.state ={textboxStatus: "noTextBox",
					userInput: ""
					todos: global.inputArray
					
				
		}


		this.handleRefresh = this.handleRefresh.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange=this.handleChange.bind(this)



	}

handleRefresh(){window.location.reload(false);}

handleAdd(event){
	event.preventDefault();
	this.setState({
					textboxStatus: "textBox"
									
				})
}

handleSubmit(event){
	
	global.inputArray[global.clickCount]=this.state.userInput 
	event.preventDefault();
	this.setState({
					textboxStatus: "noTextBox"

								
				})
	global.clickCount++
console.log(global.inputArray)

}


handleChange(event){
	this.setState({ userInput: event.target.value})
}


	render(){
		const todoItems = this.state.todos.map(item =><TodoItem item={item}/>)
	return(

<div className="todo-list">

 <form>

 		<div className={this.state.textboxStatus}>
 		<input type ="text" name= "userInput" value={this.state.userInput} onChange={this.handleChange}/> 
 		<button onClick={this.handleSubmit}> Sumbit </button>
 		</div>
 		<br/>
 		<button style ={{marginRight: 4 +'em', marginTop:1 + 'em', marginBottom: 1 + 'em'}} 
 		onClick={this.handleAdd}>Add a New Item
 		</button>
		<input type = "button" id = "refresh" value="Start a New List" onClick={this.handleRefresh}/>
		
</form>
{todoItems}

</div>
		)

}
}

export default App;
