import React,{Component} from 'react'
import {connect} from 'react-redux'
class Home extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="Home">
				HOME

			</div>

			)
	}
}

export default connect(
	null
	,{
		changeNavbar(){
			return {
				type : "changeNavbar",
				payload : "Normal"
			}
		}
	}
	)(Home)