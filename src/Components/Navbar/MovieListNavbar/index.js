import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'

class MovieListNavbar extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="MovieListNavbar">
				<div className="iconfont icon-fanhui left" onClick={this.goHistory.bind(this)}></div>
				<NavLink to="/index">正在热映</NavLink>
				<NavLink to="/cinemalist">即将上映</NavLink>
			</div>

			)
	}
	goHistory(){
		window.history.go(-1)
	}
}

export default MovieListNavbar