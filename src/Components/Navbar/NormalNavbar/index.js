import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'

class NormalNavbar extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="NormalNavbar">
				<NavLink to="/index">
				<img src="http://static1.mtime.cn/html5/20180727153608/images/2014/logo_mtime.png"/></NavLink>
				<NavLink to="/index">首页</NavLink>
				<NavLink to="/cinemalist">购票</NavLink>
				<NavLink to="/mine" className="right">我的</NavLink>
			</div>

			)
	}
}

export default NormalNavbar