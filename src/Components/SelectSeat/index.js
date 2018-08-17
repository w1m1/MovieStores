import React,{Component} from 'react'
import './index.css'
import axios from 'axios'
class SelectSeat extends Component{
	constructor(){
		super();
		this.state = {
			list:[]
		}
	}
	render(){
		return (
			<div id="SelectSeat">
				<div className="top">
					<p></p>
					<h3>2号厅 银幕</h3>
					<span>( 剩余168个座位 )</span>
					<i className="iconfont icon-fangdajing"></i>
				</div>
				<div className="content">
					<div className="left">
						<ul>
						{
							this.state.list.map((item,index)=>
								<li key={index}>{index+1}</li>
							)
						}
						</ul>
					</div>
				</div>
			</div>

			)
	}
	componentDidMount(){
		axios.get('/Service/callback.mi/showtime/OnlineSeatsByShowTimeID.api?dId=386499710&t=201881710163292810')
		.then(res=>{
			console.log(res.data)
			this.setState({
				list:res.data.rowNameList
			},function(){
				console.log(this.state.list)
			})
		})	
	}
}

export default SelectSeat