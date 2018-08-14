import React,{Component} from 'react'
import NormalNavbar from './NormalNavbar'
import MovieListNavbar from './MovieListNavbar'
import DetailNavbar from './DetailNavbar'


import {connect} from "react-redux";

class Navbar extends Component{
	constructor(){
		super();
		this.state = {
			who : "Normal"
		}
	}
	render(){
		return (
			<div id="Navbar">
			{
				this.state.who==="Normal"?
				<NormalNavbar/>
				:this.state.who==="Detail"?
				<DetailNavbar/>
				:<MovieListNavbar/>
			}
			</div>

			)
	}
	componentWillReceiveProps(props){
		console.log(props);
		this.setState({
			who : props.changeNavbar
		})
	}
}

export default connect(
		state=>{
			return {
				changeNavbar : state.changeNavbar
			}
		},null
	)(Navbar)