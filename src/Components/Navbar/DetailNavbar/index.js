import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class DetailNavbar extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="DetailNavbar">
				<NavLink to="/index">{"<"}</NavLink>
				<NavLink to="/cinemalist">状态</NavLink>
				<NavLink to="/mine">分享</NavLink>
			</div>

			)
	}
}

export default DetailNavbar