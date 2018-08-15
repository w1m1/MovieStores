import React,{Component} from 'react'
import './index.css'
import axios from 'axios'
let Swiper = window.Swiper
class Detail extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="Detail">


				<div className="swiper-container">
				    <div className="swiper-wrapper">
				      <div className="swiper-slide"></div>
				      <div className="swiper-slide">Slide 2</div>
				      <div className="swiper-slide">Slide 3</div>
				      <div className="swiper-slide">Slide 4</div>
				      <div className="swiper-slide">Slide 5</div>
				      <div className="swiper-slide">Slide 6</div>
				      <div className="swiper-slide">Slide 7</div>
				      <div className="swiper-slide">Slide 8</div>
				      <div className="swiper-slide">Slide 9</div>
				      <div className="swiper-slide">Slide 10</div>
				    </div>
				    <div className="swiper-pagination"></div>
				  </div>
				{this.props.match.params.movieId}
				{this.props.match.params.cinemaId}
			</div>

			)
	}
	componentDidMount(){
		axios.get("/v4/api/billboard/home?__t=1533710356000").then(res=>{
			console.log(res.data)
		}).catch(error=>{

		})
		https://m.mtime.cn/Service/callback-ticket.mi/cinema/showtime.api?cinemaId=3976&t=20188158281158489
		var swiper = new Swiper('.swiper-container', {
		  slidesPerView: 4,
		  spaceBetween: 30,
		  centeredSlides: true,
		  pagination: {
		    el: '.swiper-pagination',
		    clickable: true,
		  },
		});
		
	}
}

export default Detail