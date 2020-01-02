import React from "react"
import './App.css';



class TodoItem extends React.Component {
	constructor(){
		super()
		this.state = {checkBoxStatus:false, styleText:"unchecked", reminder: null, alert:false}

		
	this.handleBoxChange=this.handleBoxChange.bind(this)
	this.reminderLogic= this.reminderLogic.bind(this)

	}






  reminderLogic (){

	var curTime = new Date()	
	var year= curTime.getFullYear()
	var month= curTime.getMonth()
	var day = curTime.getDate()
	
	var end = new Date(this.props.item.date);
	var year2= end.getFullYear()
	var month2= end.getMonth()
	var day2 = end.getDate()
	
	
	var day3;
	var future =day2-day
	var past = day-day2

	var futureMonth = month2-month;
	var pastMonth = month-month2;
	var futureYear = year2-year;
	var pastYear = year-year2;
	if (futureYear===1){day3=false};
	if (futureYear ===-1){day3=true};
	if (futureYear >1){day3=false}
	if (futureYear<1){day3=true}
	if (futureMonth >0 && futureYear===0){day3=false}
	if (futureMonth<0 && futureYear===0){day3=true}	
	if (future>0 && futureMonth===0 && futureYear===0){day3=false} 
	if (future<0 && futureMonth===0 && futureYear===0){day3=true}
	if (future===0 && futureMonth===0 && futureYear===0){day3=true}

		return day3;
	
  }




	handleBoxChange(event){
		this.setState({ 
			checkBoxStatus: event.target.checked

		})

	}

	


	render(){



    return (

    	<div className="container">

        <div className="todo-item">
            <input type="checkbox" name ="checkbox" checked = {this.state.checkBoxStatus} onChange={this.handleBoxChange}/>
            <p className={this.state.checkBoxStatus ? "checked": "unchecked"}>{this.props.item.text}</p> 
            <p className="date" >{this.props.item.date}</p><br/>
        </div>
         <p className={this.reminderLogic() === true && this.state.checkBoxStatus ==false ? "reminderAlert":"reminder"}>{this.props.item.alert}</p>
         </div>
       
    )
}
}

export default TodoItem