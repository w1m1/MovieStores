import React,{Component} from 'react';
import "./index.css";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";

class MovieStore extends Component{
	constructor(){
		super();
		this.state = {
			dataList:null
		}
	}
	render(){
		return (
			<div id="MovieStore">
				<div className="head">
					<div className="intro">

					
						<div className="img">
								<img src={this.state.dataList}/>
						</div>
						
						<div className="right"></div>
					</div>
				</div>
					<p className="word">黄渤在绝境荒岛的逆袭之路</p>
					<NavLink to="/index">查影讯/购票</NavLink>
			</div>

			)
	}
	componentWillMount(){
		this.props.changeNavbar()

	}

	componentDidMount(){
		axios.get('/Service/callback.mi/movie/Detail.api?movieId=225827&locationId=2908').then(res=>{
			console.log(res.data)
			this.setState(
					{
						dataList:res.data.image
					}
				)
			console.log(this.state.dataList)
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