import React,{Component} from 'react'
import axios from 'axios'
import './index.css'
import {connect} from 'react-redux'
class Actordetail extends Component{
	constructor(){
		super();
		this.state={
			list:null,
			actorList:null
		}
	}
	render(){
		return(

			<div id="Actordetail">
				<div className="head">导演</div>
				{
				this.state.list?
				<ul className="director">
					<li className="img"><img src={this.state.list.image}/></li>
					<li className="intro">
						<div>{this.state.list.name}</div>
						<div>{this.state.list.nameEn}</div>
					</li>
				</ul>:null
				}

				<div className="head">演员</div>

				{
					this.state.actorList?
						this.state.actorList.map(item=>
							<ul className="actor" key={item.id}>
							<li className="img"><img src={item.image}/></li>
							<li className="intro">
								<div>{item.name}</div>
								<div>{item.nameEn}</div>
								<div>饰：{item.personate}</div>
							</li>
						</ul>
						):null
					
				}
				
			</div>
			)
	}

	componentDidMount(){
		this.props.changeNavbar()
		this.props.changeTitle()
		axios.get(`/Service/callback.mi/Movie/MovieCreditsWithTypes.api?movieId=257529&t=2018817942881996`).then(res=>{
			console.log(res.data)
			this.setState({
				list:res.data.types[0].persons[0],
				actorList:res.data.types[1].persons
			})
		})
	}
}
export default connect(
	null,
	{
		changeNavbar(){
			return {
				type : 'changeNavbar',
				payload : "Detail"
			}
		},
		changeTitle(){
			return {
				type : 'changeTitle',
				payload : "演职员表"
			}
		}
	}
	)(Actordetail)