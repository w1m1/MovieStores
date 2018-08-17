import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { ActivityIndicator} from 'antd-mobile';
import './index.css'
class Home extends Component{
	constructor(){
		super();
		this.state = {
			nowplaying:[],
			comingsoon:[],
			daynews:[],
			newsimg:null,
			animating:true
		}
	}
	render(){
		return (
			<div id="Home">
				<div className="moviebox">
					<div className="head" onClick={this.toFilm.bind(this,"")}>
						<h2>正在热映({this.state.nowplaying.length}部)</h2>
						<span className="iconfont icon-jiantou1"></span>
					</div>
					{
						this.state.nowplaying.map((data,index)=>{
							if(index<8){
								return (
									<div className="movies" key={data.id} onClick={this.toMovieDetail.bind(this,data.id)}>
										<img  alt=""  src={data.img} />
										<p>{data.t}</p>
										{data.r>1?<span>{data.r}</span>:null}
									</div>
									)
							}
						})
					}
				</div>
				<div className="moviebox">
					<div className="head" onClick={this.toFilm.bind(this,"/comingsoon")}>
						<h2>即将上映({this.state.comingsoon.length}部)</h2>
						<span className="iconfont icon-jiantou1"></span>
					</div>
					{
						this.state.comingsoon.map((data,index)=>{
							if(index<8){
								return (
									<div className="movies" key={data.id} onClick={this.toMovieDetail.bind(this,data.id)}>
										<img  alt=""  src={data.image} />
										<p>{data.title}</p>
									</div>
									)
							}
						})
					}
				</div>
				<img  alt="" className="duiqi" src={this.state.newsimg}/>
				<div className="daynews">
					<div className="head">
						<h2>今日热点</h2>
					</div>
					{
						this.state.daynews.map(item=>{
							return (
								<div className="news" key={item.id}>
									<div className="left">
										<img  alt="" src={item.img}/>
									</div>
									<div className="right">
										<h3>{item.title}</h3>
										<p>{item.desc}</p>
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
		let arr = [axios.get("/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=201881416261995236"),
				   axios.get("/Service/callback.mi/PageSubArea/GetFirstPageAdvAndNews.api?t=20188159424192936"),
				   axios.get("/Service/callback.mi/PageSubArea/MallAreaFirstH5Url.api?t=201881510242221119"),
				   axios.get("/Service/callback.mi/Movie/MovieComingNew.api?locationId=290&t=201881510442496952")
		]
		Promise.all(arr).then(res=>{
			
			console.log(res);
			this.setState({
				nowplaying : res[0].data.ms,
				daynews : res[1].data.hotPoints,
				newsimg: res[2].data.areaFirst.image,
				comingsoon: res[3].data.moviecomings,
				animating : false
			})
		}).catch(err=>{
			this.setState({
				animating : false
			})
		})
		this.props.changeNavbar("Normal")
	}
	toFilm(href){
		this.props.history.push(`/Film${href}`)
	}
	toMovieDetail(data){
		this.props.history.push(`/MovieDetail/${data}`)
	}
}

export default connect(
	null
	,{
		changeNavbar(data){
			return {
				type : "changeNavbar",
				payload : data
			}
		}
	}
	)(Home)