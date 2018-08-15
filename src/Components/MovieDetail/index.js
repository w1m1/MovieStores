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
						
						<div className="right">
							<h2>一出好戏</h2>
							<h3>The Island</h3>
							<p className="min">
								<span>有彩蛋</span>-134分钟
								<span className="store">7.2</span>
							</p>
							<p className="xiju">喜剧</p>
							<p>2018年8月10日中国上映</p>
							<span className="want">我想看</span>
							<span className="com">我要评分</span>
						</div>
					</div>
				</div>
					<p className="word">黄渤在绝境荒岛的逆袭之路</p>
					<NavLink to="/index" className="btn"><span>查影讯/购票</span></NavLink>
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