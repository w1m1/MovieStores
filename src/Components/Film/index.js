import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Film extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="Film">
				
				{this.props.children}
			</div>

			)
	}
	componentWillMount(){
		this.props.changeNavbar("MovieList")
	}
}

export default connect(
	null,
	{
		changeNavbar(data){
			return {
				type : "changeNavbar",
				payload : data
			}
		}
	}
	)(Film)