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
import MovieDetail from '../Components/MovieDetail'

import Actordetail from '../Components/Actordetail'
import {Provider} from 'react-redux'
import store from '../store'

const router = (
	<Provider  store={store}>
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
					<Route path="/cinemalist/:movieid" component={CinemaList}/>
					<Route path="/mine" component={Mine}/>
					<Route path="/detail/cinema/:cinemaId/movie/:movieId" component={Detail}/>
					<Route path="/detail/cinema/:cinemaId" component={Detail}/>
					<Route path="/login" component={Login}/>
					<Route path="/reg" component={Reg}/>
					<Route path="/selectseat" component={SelectSeat}/>
					<Route path="/pay" component={Pay}/>
					<Route path="/shop" component={Shop}/>
					<Route path="/moviedetail/:id/fullcredits" component={Actordetail}/>
					<Route path="/moviedetail/:id" component={MovieDetail}/>
					
					<Redirect from="*" to="/index"/>
				</Switch>
			</App>
		</Router>
	</Provider>

	)

export default router