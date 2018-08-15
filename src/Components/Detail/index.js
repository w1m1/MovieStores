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
			isShow:0
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
					      		<div className="swiper-slide"  key={item.movieId} onClick={this.handleClick.bind(this,index)}>
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
							<p>{this.state.looplist[this.state.isShow].length} - {this.state.looplist[this.state.isShow].type}</p>
						</div>
						<i className="iconfont icon-jiantou1"></i>
					</div>
				:null}

				{/*影片时间*/}
				<Time></Time>
				{/*this.props.match.params.movieId*/}
				{/*this.props.match.params.cinemaId*/}
			</div>

			)
	}

	componentWillMount(){
		this.props.changeNavbar("Detail");
	}
	componentDidMount(){
		// axios.get().then()
		this.props.changeTitle("")
		axios.get("/Service/callback.mi/Showtime/ShowtimeMovieAndDateListByCinema.api?cinemaId=3976&t=201881513534121306").then(res=>{
			console.log(res.data)
			this.setState({
				looplist:res.data.movies,
				list:res.data.cinema
			},function(){
				this.Swiper = new Swiper('.swiper-container', {
				  slidesPerView: 4,
				  spaceBetween: 30,
				  centeredSlides: true
				})
			})
		}).catch(error=>{

		})
	}
	handleClick(index){
		console.log(this.state.looplist[index].movieId)

		this.setState({
			isShow:index
		})
		

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