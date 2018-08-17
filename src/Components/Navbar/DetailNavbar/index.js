import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
import {connect} from 'react-redux'

class DetailNavbar extends Component{
	constructor(){
		super();
		this.state = {
			title : null
		}
	}
	render(){
		return (
			<div id="DetailNavbar">
				<NavLink to="/index" className="iconfont icon-fanhui left"></NavLink>
				<NavLink to="/cinemalist" className="left title">{this.state.title}</NavLink>
				<NavLink to="/mine" className="right">分享</NavLink>
			</div>

			)
	}
	componentWillReceiveProps(props){
		this.setState({
			title : props.changeTitle
		})
	}
}

export default connect(
	state=>{
		return {
			changeTitle : state.changeTitle
		}
	}
	,null
	)(DetailNavbar)