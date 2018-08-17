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
			isShow:false,
			content:null,
			comments:null
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
					<div onClick={()=>{this.props.history.push(`/cinemalist/${this.props.match.params.id}`)}} className="btn"><span>查影讯/购票</span></div>

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
						<h2>12位演职员<span className="change" onClick={this.changePath.bind(this)}>></span></h2>
						<div className="per">
							<div className="left">
								<h4>导演</h4>
								<div className="dir">
									<img src={this.state.list.director.directorImg}/>
									<span>{this.state.list.director.directorName}</span>
									<span>{this.state.list.director.directorNameEn}</span>
								</div>

							</div>
							<div className="right"> 
								<h4>主要演员</h4>
								<div className="img">
									<div className="img1">
										<span className="span1" ><img src={this.state.list.actorList[0].actorImg}/></span>
										<span>{this.state.list.actorList[0].actor}</span>
										<span>{this.state.list.actorList[0].actorEn}</span>
										<span className="span1" ><img src={this.state.list.image}/></span>
										<span>饰：{this.state.list.actorList[0].roleName}</span>
									</div>							
									<div className="img2">
										<span className="span2"><img src={this.state.list.actorList[1].actorImg}/></span>
										<span>{this.state.list.actorList[1].actor}</span>
										<span>{this.state.list.actorList[1].actorEn}</span>
										<span className="span2" ><img src={this.state.list.image}/></span>
										<span>饰：{this.state.list.actorList[1].roleName}</span>
									</div>				
									
								</div>
							</div>
						</div>


					</div>
					:null
				}

			
				<div className="images">
					<h2>72张图片<span className="change">></span></h2>
					<ul className="all">
					{	this.state.list?
						this.state.list.images.map(item=>
							<li key={item}>
								<img src={item}/>
							</li>
						):null
					}
					</ul>
				</div>

				{	
					this.state.content?
					<div className="movie">
						<h2 className="moviecomment">精选影评</h2>
						<h2 className="title">{this.state.content.title}</h2>
						<div className="contents">{this.state.content.content}</div>
						<ul>
							<li className="first"><img src={this.state.content.headurl}/></li>
							<li className="sec">
								<div>{this.state.content.nickname}</div>
								<div>2018-08-08 17:49:00</div>
							</li>
							
						</ul>
					</div>:null
				}

				<div className="people">
					<h2>网友短评</h2>
					{
						this.state.comments?
						this.state.comments.map(item=>
						<ul className="all" key={item.tweetId}>
							<li className="header"><img src={item.caimg}/></li>
							<li className="words">
								<div className="first">
									<span className="left">{item.ca}</span>
									<span className="right">
										1小时前-评
										<span className="store">{item.cr}</span>
									</span>
								</div>
								<div className="sec">{item.ce}</div>
								<div className="thr">
									<span>回复</span>
									<span>赞</span>
								</div> 
							</li>
						</ul>
						):null
					}
				</div>
				
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

		axios.get(`/Service/callback.mi/Movie/HotLongComments.api?movieId=241018&pageIndex=1&t=2018816101240659`).then(res=>{
			console.log(res.data)
			this.setState({
				content:res.data.comments[0]
			})
		})

		//https://m.mtime.cn/Service/callback.mi/Showtime/MovieComments.api?movieId=241018&pageIndex=1&t=2018816101227306
		axios.get(`/Service/callback.mi/Showtime/MovieComments.api?movieId=241018&pageIndex=1&t=2018816101227306`).then(res=>{
			console.log(res.data)
			this.setState({
				comments:res.data.cts
			})
		})
	}

	handleClick(){
		this.setState({
			isShow:!this.state.isShow
		})
	}

	changePath(){
		this.props.history.push(`/moviedetail/:id/fullcredits`)
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