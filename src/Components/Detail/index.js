import React,{Component} from 'react'

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
}

export default Detail