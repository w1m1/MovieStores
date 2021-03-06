import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './index.css'

class CinemaList extends Component{
	constructor(){
		super();
		this.state = {
			cinemaList : [],
			date : [],
			text : '',
			index : 0,
			movieId : null
		}
	}
	render(){
		return (
			<div id="CinemaList">
				<div className="swiper-container">
					<div className="swiper-wrapper">
					{	
						this.state.date.length > 0 ? 
						this.state.date.map((date,index)=>{
							return <div onClick={this.sendDate.bind(this,index,date)} className={this.state.index===index?"swiper-slide focus":"swiper-slide"} key={date.dateValue}>{date.dateValue}</div>
								
						}):null
					}
					</div>
				</div>
				<p className="tip">{this.state.text}</p>
				{
					this.state.cinemaList.map(data=>{
						return <div className="list" key={data.cinemaId?data.cinemaId:data.cid} onClick={this.goDetail.bind(this,data.cinemaId,data.cid,)}>
							<p className="cinemaname">{data.cinameName?data.cinameName:data.cn}
							<span>{data.minPrice/100}元起</span></p>
							<p className="location">{data.address}</p>
							{
								data.feature.has3D?
								<span className="ishas">3D</span>
								:null
							}
							{
								data.feature.hasFeature4K?
								<span className="ishas">4K</span>
								:null
							}
							{
								data.feature.hasIMAX?
								<span className="ishas">IMAX</span>
								:null
							}
							{
								data.feature.hasVIP?
								<span className="ishas">VIP</span>
								:null
							}
							{
								data.feature.hasLoveseat?
								<span className="ishas">情侣座</span>
								:null
							}

						</div>
					})
				}
			</div>

			)
	}
	goDetail(id,idr){
		let relId = id?id:idr;
		this.state.movieId?
		this.props.history.push(`/detail/cinema/${relId}/movie/${this.state.movieId}`)
		:this.props.history.push(`/detail/cinema/${relId}`)
	}
	sendDate(index,date){
		this.setState({
			index
		})
		console.log(date);
		axios.get(`/api/proxy/ticket/Showtime/LocationMovieShowtimes.api?locationId=290&movieId=${this.state.movieId}&date=${date.dateValue.replace(/-/g,'')}&_=1534464899693`).then(res=>{
			console.log(res.data);
			this.setState({
				cinemaList : res.data.cs
			})
		})
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
			this.setState({
				movieId : this.props.match.params.movieid
			})
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
					},()=>{
						console.log(This.state.date);
						var mySwiper = new window.Swiper('.swiper-container',{
						  slidesPerView : 2.5,
						//slidesPerView : 'auto',
						//slidesPerView : 3.7,
						})
					})
					return {
						type : "changeTitle",
						payload : res[1].data.movie.nameCN
					}
				})
		}
	}
	)(CinemaList)