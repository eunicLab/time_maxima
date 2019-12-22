import React from "react"
import './App.css';



class TodoItem extends React.Component {
	constructor(){
		super()
		this.state = {checkBoxStatus:false, styleText:"unchecked", reminder: null, alert:false}

		
	this.handleBoxChange=this.handleBoxChange.bind(this)

	}


componentDidMount() {

	this.reminderLogic ()


  }


  reminderLogic (){

	var curTime = new Date()	
	var year= curTime.getFullYear()
	var month= curTime.getMonth()
	var day = curTime.getDate()
	
	var end = new Date(this.props.item.date );
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
	if (futureYear==1){day3="Due next year"; this.setState({alert:false})};
	if (futureYear ==-1){day3="Due last year"; this.setState({alert:true})};
	if (futureYear >1){day3="due in "+futureYear+" year(s) time"; this.setState({alert:false})}
	if (futureYear<1){day3= "due " +pastYear+" year(s) ago";this.setState({alert:true})}
	if (futureMonth >0 && futureYear==0){day3="Due in "+futureMonth+" month(s) time"; this.setState({alert:false})}
	if (futureMonth<0 && futureYear==0){day3="Due "+pastMonth+" month(s) ago";this.setState({alert:true})}	
	if (future>0 && futureMonth==0 && futureYear==0){day3 = "Due in "+future+" day(s)"; this.setState({alert:false})} 
	if (future<0 && futureMonth==0 && futureYear==0){day3 = "Due "+past+ " day(s) ago"; this.setState({alert:true})}
	if (future==0 && futureMonth==0 && futureYear==0){day3 = "Due today"; this.setState({alert:true})}
	

	

    setInterval( () => {




      this.setState({
       
        reminder: day3
      })
    },1000)
  }




	handleBoxChange(event){
		this.setState({ 
			checkBoxStatus: event.target.checked

		})

	}

	


	render(){



    return (

        <div className="todo-item">
            <input type="checkbox" name ="checkbox" checked = {this.state.checkBoxStatus} onChange={this.handleBoxChange}/>
            <p className={this.state.checkBoxStatus ? "checked": null}>{this.props.item.text}</p>
            <p className="date" >{this.props.item.date}</p>
            <p className={this.state.alert === true && this.state.checkBoxStatus ==false ? "reminderAlert":"reminder"}>{this.state.reminder} at {this.props.item.time} hour</p>
        </div>
    )
}
}

export default TodoItem