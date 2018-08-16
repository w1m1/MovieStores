import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'

class MovieListNavbar extends Component{
	constructor(){
		super();
		this.state = {
			active : 1
		}
	}
	render(){
		return (
			<div id="MovieListNavbar">
				<div className="iconfont icon-fanhui left" onClick={this.goHistory.bind(this)}></div>
				<NavLink to="/film/nowplaying" onClick={this.changeactive.bind(this,1)} className={this.state.active?'focus':null}>正在热映</NavLink>
				<NavLink to="/film/comingsoon" onClick={this.changeactive.bind(this,0)} className={this.state.active?null:'focus'}>即将上映</NavLink>
			</div>

			)
	}
	changeactive(num){
		this.setState({
			active : num
		})
	}
	goHistory(){
		window.history.go(-1)
	}
}

export default MovieListNavbar