const nowplayingReducer = (prevState=[],action=[])=>{
	let {type,payload} = action;
	console.log(payload);
	switch(type){
		case "nowplayingMovies" : 
		return [...prevState,...payload];
		default : 
		return prevState
	}
}
export default nowplayingReducer