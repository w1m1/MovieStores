const comingsoonReducer = (prevState=null,action=null)=>{
	let {type,payload} = action;
	switch(type){
		case "comingsoon" : 
		return {...payload}
		default : 
		return prevState
	}
}
export default comingsoonReducer