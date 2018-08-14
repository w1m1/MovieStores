const changeTitle = (prevState="",action="")=>{
	let {type,payload} = action;
	switch(type){
		case "changeTitle" : 
		return payload;
		default : 
		return prevState
	}
}
export default changeTitle