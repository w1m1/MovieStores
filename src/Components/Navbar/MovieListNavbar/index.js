import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class MovieListNavbar extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="MovieListNavbar">
				MovieListNavbar
				<NavLink to="/index">正在热映</NavLink>
				<NavLink to="/cinemalist">即将上映</NavLink>
			</div>

			)
	}
}

export default MovieListNavbar