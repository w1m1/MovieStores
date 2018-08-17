import	React,{Component} from'react'
import './index.css'
import {NavLink }from "react-router-dom";
import axios from 'axios'
class Time extends Component{
	constructor(){
		super()
		this.state = {
			mytime:[]
		}
	}
	render(){
		return(
			<div id="time">
				{
					this.state.mytime.length!==0?
						this.state.mytime.s.map(item=>
							<div className="content" key={item.sid}>
								<div className="li">
									<div className="one">
										<h1>10:30</h1>
										{/*<span>12:44散场</span>*/}
									</div>
									<div className="two">
										<p>{item.versionDesc}/{item.language}</p>
										<span>{item.hall}</span>
									</div>
									<div className="thr">
										<h3>￥{item.price}</h3>
										{/*<span>￥45</span>*/}
									</div>
									<div className="four">
										<button onClick={this.toMovieDetail.bind(this)}>购票</button>
									</div>
								</div>
							</div>	
						):null
				}
			</div>
			)
	}
	componentWillReceiveProps(props){
		// console.log(this.props.myid)
		// console.log(props.mytime.s)
		this.setState({
			mytime : props.mytime
		},()=>{
			console.log(this.state.mytime)
		})
	}
	shouldComponentUpdate(props){
		// console.log(props)
		if(this.state.mytime === props.mytime){
			// console.log("false")
			return false
		}
		// console.log("true")
		return true
	}
	toMovieDetail(){
		this.props.history.push(`/SelectSeat`)
	}
}
export default Time