import {HashRouter as Router,
		Route,
		Switch,
		Redirect} from "react-router-dom"
import React from "react"

import App from '../App'

import Home from '../Components/Home'
import Film from '../Components/Film'
import ComingSoon from '../Components/Film/ComingSoon'
import NowPlaying from '../Components/Film/NowPlaying'

import Detail from '../Components/Detail'
import CinemaList from '../Components/CinemaList'
import Mine from '../Components/Mine'
import Login from '../Components/Login'
import Reg from '../Components/Reg'
import SelectSeat from '../Components/SelectSeat'
import Pay from '../Components/Pay'
import Shop from '../Components/Shop'

const router = (
	<Router>
		<App>
			<Switch>
				<Route path="/index" component={Home}/>
				<Route path="/film" render={()=>{
					return (
						<Film>
							<Switch>
								<Route path="/film/comingsoon" component={ComingSoon}/>
								<Route path="/film/nowplaying" component={NowPlaying}/>
								<Redirect from="/film" to="/film/NowPlaying"/>
							</Switch>
						</Film>
						)
				}}/>
				<Route path="/cinemalist" component={CinemaList}/>
				<Route path="/mine" component={Mine}/>
				<Route path="/detail/movie/:movieId/cinema/:cinemaId" component={Detail}/>
				<Route path="/detail/movie/:movieId" component={Detail}/>
				<Route path="/login" component={Login}/>
				<Route path="/reg" component={Reg}/>
				<Route path="/selectseat" component={SelectSeat}/>
				<Route path="/pay" component={Pay}/>
				<Route path="/Shop" component={Shop}/>
				
				<Redirect from="*" to="/index"/>
			</Switch>
		</App>

{
	/*
		https://m.mtime.cn/#!/theater/290/3400/date/20180813/movie/257529/
		https://m.mtime.cn/#!/theater/290/8180/date/20180813/
	*/
}
	</Router>

	)

export default router