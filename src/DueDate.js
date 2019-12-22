import React from "react"
import './App.css';

class DueDate extends React.Component {
	constructor(){
		super()
		this.state = { }

	}


	

	

	render(){



    return (
        <div className= "date">
            <p >{this.props.data}</p>
        </div>
    )
}
}

export default DueDate