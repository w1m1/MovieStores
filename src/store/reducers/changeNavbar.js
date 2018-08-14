const changeNavbar = (prevState="Normal",action="")=>{
	let {type,payload} = action;
	switch(type){
		case "changeNavbar" : 
		return payload;
		default : 
		return prevState
	}
}
export default changeNavbar