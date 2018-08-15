import React,{Component} from 'react';
import "./index.css";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";

class MovieStore extends Component{
	constructor(){
		super();
		this.state = {
			dataList:null,
			list:null,
			isShow:false
		}
	}
	render(){
		var mstyle = {
			backgroundImage:`url(${this.state.dataList})`
		}
		return (
			<div id="MovieStore">

				<div className="bg"  style={mstyle}></div>
				  <div className="big">
					<div className="intro">
						<div className="img">
								<img src={this.state.dataList}/>
						</div>
						{
							this.state.list?
							<div className="right">
								<h2>{this.state.list.titleCn}</h2>
								<h3>{this.state.list.titleEn}</h3>
								<p className="min">
									<span>有彩蛋</span>-<span>{this.state.list.runTime}</span>
									<span className="store">{this.state.list.rating}</span>
								</p>
								<p className="xiju">{this.state.list.type}</p>
								<p>{this.state.list.release[0],this.state.list.release[1]}</p>
								<span className="want">我想看</span>
								<span className="com">我要评分</span>
							</div>
							:null
						}
						
						</div>
					</div>
				{
				 this.state.list?
				  <div>
					<p className="word">{this.state.list.commonSpecial}</p>
					<NavLink to="/index" className="btn"><span>查影讯/购票</span></NavLink>

					<div className="content">
						<p className="brief" style={this.state.isShow?{height:'300px'}:{height:'95px',overflow:'hidden'}}>{this.state.list.content}</p>
						<p className="changeword" onClick={this.handleClick.bind(this)}>...</p>
					</div>
				  </div>
				  :null
				}

			{
				this.state.list?
				<div className="actor">
					<h3>12位演职员</h3>
					<div className="left">
						<h4>导演</h4>
						<div>
							<img src={this.state.list.director.directorImg}/>
							<span>{this.state.list.director.directorName}</span>
							<span>{this.state.list.director.directorNameEn}</span>
						</div>

					</div>
					<div className="right">
						<h4>主要演员</h4>
						<div className="img">
							<div>
								<span></span>
								<span></span>
							</div>							
							<div>
								<span></span>
								<span></span>
							</div>							
							<div>
								<span></span>
								<span></span>
							</div>							
							<div>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				</div>
				:null
			}
			</div>

			)
	}
	componentWillMount(){
		this.props.changeNavbar()

	}

	componentDidMount(){
		axios.get(`/Service/callback.mi/movie/Detail.api?movieId=${this.props.match.params.id}&locationId=2908`).then(res=>{
			console.log(res.data)
			this.setState(
					{
						list:res.data,
						dataList:res.data.image
					}
				)
			console.log(this.state.list)
		})
	}

	handleClick(){
		this.setState({
			isShow:!this.state.isShow
		})
	}
}

export default connect(
	null,
	{
		changeNavbar(){
			return {
				type:"changeNavbar",
				payload:"Detail"
			}
		}
	}

	)(MovieStore)