import React,{Component} from 'react'

class Mine extends Component{
	constructor(){
		super();
		this.stMineate = {

		}
	}
	render(){
		return (
			<div id="Mine">
				Mine
				{
					document.cookie?null:window.location.href="/#/login"
				}
			</div>

			)
	}
}

export default Mine