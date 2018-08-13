import React,{Component} from 'react'

class Login extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	
	saveCookie(){
		console.log("aaa");
		document.cookie="name=123"
		this.props.history.push('/mine')
	}
	render(){
		return (
			<div id="Login">
				Login
				<button onClick={this.saveCookie.bind(this)}>login</button>
				<button onClick={()=>{this.props.history.push("/reg")}}>Reg</button>
			</div>

			)
	}
}

export default Login