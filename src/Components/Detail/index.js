import React,{Component} from 'react'

import {connect} from 'react-redux'
import axios from 'axios'

class Detail extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<div id="Detail">
				Detail
				{this.props.match.params.movieId}
				{this.props.match.params.cinemaId}
			</div>

			)
	}
	componentWillMount(){
		this.props.changeNavbar("Detail");
	}
	componentDidMount(){
		// axios.get().then()
		this.props.changeTitle("西红柿首富")
	}
}

export default connect(
	null
	,
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