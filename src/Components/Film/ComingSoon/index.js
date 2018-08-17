import React,{Component} from 'react'
import axios from 'axios'
import {ActivityIndicator} from 'antd-mobile';
import {connect} from 'react-redux'

import './index.css'

class ComingSoon extends Component{
	constructor(){
		super();
		this.state = {
			animating:true,
			comingsoonMovies:null,
			mountharr : []
		}
	}
	render(){
		return (
			<div id="ComingSoon">
			{
				this.state.comingsoonMovies?
				<div className="allMovies">
					<div className="attention">
						<h2>最受关注  <span>({this.state.comingsoonMovies.attention.length}部)</span></h2>
						<div className="famous clear">
							<img className="left" src={this.state.comingsoonMovies.attention[0].image}/>
							<div className="left">
								<p className="title">{this.state.comingsoonMovies.attention[0].title}</p>
								<p className="type"><span>{this.state.comingsoonMovies.attention[0].wantedCount}</span>人想看-{this.state.comingsoonMovies.attention[0].type}</p>
								<p className="type">导演：{this.state.comingsoonMovies.attention[0].director}</p>
								<p className="type">演员：{this.state.comingsoonMovies.attention[0].actor1},{this.state.comingsoonMovies.attention[0].actor2}</p>
							</div>
							<p className="date">{this.state.comingsoonMovies.attention[0].rMonth}月{this.state.comingsoonMovies.attention[0].rDay}日</p>
							<div className="lefbutton">超前预售</div>
							<div className="rigbutton">预告片</div>
						</div>
						<h2>即将上映  <span>({this.state.comingsoonMovies.moviecomings.length}部)</span></h2>
						{
							this.state.mountharr.map(data=>{
								return (
									<div className="everymounth" key={data}>
										<div className="mounth">{data}月</div>
										{this.state.comingsoonMovies.moviecomings.map(item=>{
											return (
											data==item.rMonth?
												<div className="comingMovie clear" key={item.id}>
													<p className="left">
														{item.rDay}日
													</p>
													<div className="right">
														<img src={item.image} className="left"/>
														<div className="left">
															<p className="title">{item.title}</p>
															<p className="type"><span>{item.wantedCount}</span>人想看-{item.type}</p>
															<p className="type">导演：{item.director}</p>
															<div className="button">
																<div className="lefbutton">超前预售</div>
																<div className="rigbutton">预告片</div>
															</div>
														</div>
													</div>
												</div>
											:null
												)
										})}
									</div>
								)
							})
						}
					</div>
				</div>
				:null
			}
				<ActivityIndicator
	                toast
	                size="large"
	                text="正在努力加载中..."
	                animating={this.state.animating}
	              />
			</div>

			)
	}
	componentDidMount(){
		console.log(this.props);
		if(!this.props.comingsoon){
			this.props.getComingMovies(this);
		}else{
			this.setState({
				comingsoonMovies : this.props.comingsoon,
				animating:false
			},()=>{
				this.getmounth()
			})
		}
	}
	getmounth(){
		if(this.state.comingsoonMovies){
			let arr = [];
			let data = this.state.comingsoonMovies.moviecomings;
			let length = this.state.comingsoonMovies.moviecomings.length;
			for(let i = 0 ; i < length ; i++){
				arr.push(data[i].rMonth)
			}
			let mountharr = Array.from(new Set(arr));
			this.setState({
				mountharr
			})
			console.log(mountharr);
		}
	}
}

export default connect(
	state=>{
		return {
			comingsoon : state.comingsoonReducer
		}
	}
	,
	{
		getComingMovies(data){
			let This = data
			return (dispatch)=>{axios.get('/Service/callback.mi/Movie/MovieComingNew.api?locationId=290&t=2018816102861824')
				.then(res=>{
					console.log(res.data);
					This.setState({
						animating:false,
						comingsoonMovies:res.data
					},()=>{
						This.getmounth()
					})
					console.log(This.state.comingsoonMovies);

					dispatch({
						type:"comingsoon",
						payload : res.data
					}) 
				})
			}
		}
	}
	)(ComingSoon)