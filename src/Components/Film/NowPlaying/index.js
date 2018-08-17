import React,{Component} from 'react'
import axios from "axios"
import {ActivityIndicator} from 'antd-mobile';
import {connect} from 'react-redux'
import "./index.css"

class NowPlaying extends Component{
	constructor(){
		super();
		this.state = {
			animating : true,
			movieList : []
		}
	}
	goBuyList(id){
		console.log(this.props)
		this.props.history.push(`/moviedetail/${id}`)
	}
	render(){
		return (
			<div id="NowPlaying">
				<div className="movieList">
					{
						this.state.movieList.map(data=>{
							return (
								<div className="movie" key={data.id}>
									<div className="left">
										<img alt="" src={data.img}/>
										{
											data.isHot?
											<i className="isHot"></i>
											:null
										}
									</div>
									<div className="right">
										<div>
											<h2>{data.t}</h2>
											{
												data.r>1?
												<span>{
													parseInt(data.r)==parseFloat(data.r)?
													data.r +".0"
													:data.r
												}</span>
												:null
											}
										</div>
										<p>“{data.commonSpecial}</p>
										{
											data.isDMAX?
											<span className="isHas">DMAX</span>
											:null
										}
										{
											data.isIMAX?
											<span className="isHas">IMAX</span>
											:null
										}
										{
											data.is3D?
											<span className="isHas">3D</span>
											:null
										}
										{
											data.isIMAX3D?
											<span className="isHas">IMAX3D</span>
											:null
										}
										<div className="leftbutton">
											{data.NearestCinemaCount}家影院上映{data.NearestShowtimeCount}场
										</div>
									</div>
									<div className="rightbutton" onClick={this.goBuyList.bind(this,data.id)}>
										购票
									</div>
								</div>
								)
						})
					}
				</div>
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
		if(this.props.movieList.length==0){
			this.props.setNowplaying(this)
		}else{
			this.setState({
				animating:false,
				movieList : this.props.movieList
			})
		}

	}
}

export default connect(
	state=>{
		return {
			movieList : state.nowplayingReducer
		}
	},
	{
		setNowplaying(data){
			let This = data;
			return (dispatch)=>{
				axios.get("/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=2018815112784965").then(res=>{
					console.log(res.data);
					This.setState({
						animating:false,
						movieList : res.data.ms
					})
					return dispatch({
						type:"nowplaying",
						payload : res.data.ms
					})
				})
			}
		}
	}
	)(NowPlaying)