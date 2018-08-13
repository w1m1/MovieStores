import React,{Component} from 'react'

class Reg extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	mine(){
		document.cookie="name=123"
		this.props.history.push('/mine')
	}
	login(){
		this.props.history.push('/mine')
	}
	render(){
		return (
			<div id="Reg">
				Reg
				<button onClick={this.mine.bind(this)}>注册并登陆</button>
				<button onClick={this.login.bind(this)}>已有账号 点击登录</button>
			</div>

			)
	}
}

export default Reg