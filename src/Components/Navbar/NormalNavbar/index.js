import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class NormalNavbar extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="NormalNavbar">
				NormalNavbar
				<NavLink to="/index">首页</NavLink>
				<NavLink to="/cinemalist">购票</NavLink>
				<NavLink to="/mine">我的</NavLink>
			</div>

			)
	}
}

export default NormalNavbar