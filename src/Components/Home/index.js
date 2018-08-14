import React,{Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './index.css'
class Home extends Component{
	constructor(){
		super();
		this.state = {
			nowplaying:[]
		}
	}
	render(){
		return (
			<div id="Home">
				<div className="moviebox">
					<div className="head" onClick={this.toFilm.bind(this)}>
						<h2>正在热映({this.state.nowplaying.length}部)</h2>
						<span className="iconfont icon-jiantou1"></span>
					</div>
					{
						this.state.nowplaying.map((data,index)=>{
							if(index<8){
								return (
									<div className="movies" key={data.id} onClick={this.toMovieDetail.bind(this,data.id)}>
										<img  src={data.img} />
										<p>{data.t}</p>
										{data.r>1?<span>{data.r}</span>:null}
									</div>
									)
							}
						})
					}
				</div>

			</div>

			)
	}
	componentDidMount(){
		axios.get("/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=201881416261995236").then(res=>{
			console.log(res.data);
			this.setState({
				nowplaying : res.data.ms
			})
		})
		this.props.changeNavbar("Normal")
	}
	toFilm(){
		this.props.history.push('/Film')
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