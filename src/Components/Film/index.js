import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class Film extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="Film">
				Film
				<NavLink to="/film/nowplaying">NowPlaying</NavLink>
				<NavLink to="/film/comingsoon">ComingSoon</NavLink>
				{this.props.children}
			</div>

			)
	}
}

export default Film