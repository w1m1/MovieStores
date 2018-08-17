import React,{Component} from 'react'
import './index.css'
import {connect} from 'react-redux'
import axios from 'axios'
import Header from './DetailHeader'
import Time from './DetailTime'
let Swiper = window.Swiper
class Detail extends Component{
	constructor(){
		super();
		this.state = {
			looplist:[],
			list:[],
			isShow:0,
			isS:0,
			text:null,
			datelist:[],
			timelist:[]
		}
	}
	render(){
		return (
			<div id="Detail">
				{/*影院信息*/}
				<Header movieName={this.state.list.name}></Header>


				{/*影片拖拽移动*/}
				<div className="swiper-container">
				    <div className="swiper-wrapper">
				      	{
					      	this.state.looplist.map((item,index)=>
					      		<div className="swiper-slide"  key={item.movieId} onClick={this.handleClick.bind(this,index,item.movieId)}>
						      		<div className="img">
						      			<img src={item.img} />
						      			<em className={item.ratingFinal>0?'':'block'}>{item.ratingFinal}</em>
						      			<span className={this.state.isShow===index?'bg1':'bg'}></span>
						      		</div>
						      		<div className={this.state.isShow===index?'p1':'p'}>{item.title}</div>
					      		</div>
					      	)
				      	}
				    </div>
				</div>
				{/*影片信息*/}
				{this.state.looplist.length>0?
					<div className="title">
						<div className="left">
							<h1>{this.state.looplist[this.state.isShow].title}</h1>
							<p>
								{this.state.looplist[this.state.isShow].length} - {this.state.looplist[this.state.isShow].type}
							</p>
						</div>
						<i className="iconfont icon-jiantou1" onClick={this.toMovieDetail.bind(this)}></i>
					</div>
				:null}
				{/*影片日期*/}
				<ul className="clear date">
					{this.state.datelist.map((item,index)=>
						<li className={this.state.isS===index? 'active':''} key={item} onClick={this.handleClick1.bind(this,index)}>{item}</li>
					)}
				</ul>


				{/*影片时间*/}
				<Time mytime={this.state.timelist}{...this.props}></Time>
				

				{/*this.props.match.params.movieId*/}
				{/*this.props.match.params.cinemaId*/}
			</div>

			)
	}
	componentWillMount(){
		this.props.changeNavbar("Detail");
	}
	componentDidMount(){
		this.props.changeTitle("")
		axios.get("/Service/callback.mi/Showtime/ShowtimeMovieAndDateListByCinema.api?cinemaId=3976").then(res=>{
			console.log(res.data)
			this.setState({
				looplist:res.data.movies,
				list:res.data.cinema,
				datelist:res.data.movies[0].showDates,
				text:res.data.movies[0].movieId

			},function(){
				this.Swiper = new Swiper('.swiper-container', {
				  slidesPerView: 4,
				  spaceBetween: 30,
				  centeredSlides: true
				})
				// var dateStr = this.state.datelist[0];
				// var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
				// console.log(dateStr.match(reg));
				// console.log(RegExp.$2);
				// console.log(RegExp.$3);

			})
		}).catch(error=>{

		})
		axios.get(`/Service/callback.mi/showtime/ShowTimesByCinemaMovieDate.api?cinemaId=3976&movieId=${this.state.text}&date=2018-08-16&t=20188161513591162`).then(res=>{
			this.setState({
				timelist:res.data
			})
		})
	}
	handleClick(index,data){
		this.setState({
			isShow:index,
			text:data,
			isS:0,
			datelist:this.state.looplist[index].showDates
		})
		axios.get(`/Service/callback.mi/showtime/ShowTimesByCinemaMovieDate.api?cinemaId=3976&movieId=${data}&date=${this.state.datelist[0]}`).then(res=>{
			this.setState({
				timelist:res.data
			})
		})
		// console.log(this.state.timelist)
	}
	handleClick1(index,item){
		this.setState({
			isS:index
		})
		axios.get(`/Service/callback.mi/showtime/ShowTimesByCinemaMovieDate.api?cinemaId=3976&movieId=${this.state.text}&date=${this.state.datelist[index]}`).then(res=>{
			this.setState({
				timelist:res.data
			})
		})
	}
	toMovieDetail(){
		this.props.history.push(`/MovieDetail/${this.state.text}`)
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
		changeTitle(data){
			return {
				type : "changeTitle",
				payload : data
			}
		}
	}
	)(Detail)