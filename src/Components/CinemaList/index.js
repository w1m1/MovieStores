import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class CinemaList extends Component{
	constructor(){
		super();
		this.state = {
			cinemaList : [],
			date : [],
			text : ''
		}
	}
	render(){
		return (
			<div id="CinemaList">
				{	
					this.state.date.length > 0 ? 
					this.state.date.map(date=>{
						return <div class="loopdate">
							
						</div>
					})
					<p class="tip">{this.state.text}</p>
				}
			</div>

			)
	}
	componentWillReceiveProps(props){
		console.log(props);
		if(this.props.match.params.movieid){
			console.log(this.props.match.params.movieid);
		}else{
			console.log("1");
		}
	}
	componentDidMount(){
		//https://ticket-m.mtime.cn/api/proxy/ticket/onlineCinemasByCity.api?locationId=290&_=1534464828828
		//https://ticket-m.mtime.cn/api/proxy/ticket/Showtime/LocationMovieShowtimes.api?locationId=290&movieId=225827&date=20180817&_=1534464899693
		var today = new Date();
		today = today.getFullYear()+'' + ((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))+'' + today.getDate()
		console.log(today);
		if(this.props.match.params.movieid){
			// console.log(this.props.match.params.movieid,123);
			this.props.changeNavbar("Detail");
			this.props.changeTitle(this.props.match.params.movieid,this,today);
			// this.props.changeTitle()
		}else{
			console.log("1");
			this.props.changeNavbar("Normal");
			axios.get(`/api/proxy/ticket/onlineCinemasByCity.api?locationId=290&_=1534464828828`).then(res=>{
				console.log(res.data);
				this.setState({
						cinemaList : res.data.data.cinemaList,
						text : res.data.data.noticeNotOwn
					})
			})
		}
	}
}

export default connect(
	null,
	{
		changeNavbar(data){
			return {
				type : "changeNavbar",
				payload : data
			}
		},
		changeTitle(data,This,today){
			//神经病做法
			return Promise.all([axios.get(`/api/proxy/ticket/Showtime/LocationMovieShowtimes.api?locationId=290&movieId=${data}&date=${today}&_=1534464899693`),
							 axios.get(`/api/proxy/ticket/Showtime/LocationMovieShowtimeDates.api?locationId=290&movieId=225827&locationId=290&movieId=${data}&_=1534467923376`)])
				.then(res=>{
					console.log(res);
					This.setState({
						cinemaList : res[0].data.cs,
						date : res[1].data.showtimeDates,
						text : res[0].data.noticeNotOwn
					})
					return {
						type : "changeTitle",
						payload : res[1].data.movie.nameCN
					}
				})
		}
	}
	)(CinemaList)