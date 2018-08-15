import React,{Component} from 'react'
import axios from "axios"
import {ActivityIndicator} from 'antd-mobile';
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
										<img src={data.img}/>
										<i className="isHot"></i>
									</div>
									<div className="right">
										<div>
											<h2>{data.t}</h2>
											{
												data.r>1?
												<span>{data.r}</span>
												:null
											}
										</div>
										<p>“{data.commonSpecial}</p>
										<div className="leftbutton">
											{data.NearestCinemaCount}家影院上映{data.NearestShowtimeCount}场
										</div>
										<div className="rightbutton" onClick={this.goBuyList.bind(this,data.id)}>
											购票
										</div>
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
		axios.get("/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=2018815112784965").then(res=>{
			console.log(res.data);
			this.setState({
				animating:false,
				movieList : res.data.ms
			})
		})

	}
}

export default NowPlaying