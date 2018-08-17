import	React,{Component} from'react'
import './index.css'
class Header extends Component{
	render(){
		return(
			<div id="header">
				<div className="left">
					<h2>{this.props.movieName}</h2>
					<ul className="clear">
						<li><img src="https://static1.mtime.cn/html5/20180727153608/images/2014/i_cine_01.png"/></li>
						<li><img src="https://static1.mtime.cn/html5/20180727153608/images/2014/is_cine_06.png"/></li>
						<li><img src="https://static1.mtime.cn/html5/20180727153608/images/2014/is_cine_05.png"/></li>
						<li><img src="https://static1.mtime.cn/html5/20180727153608/images/2014/is_cine_02.png"/></li>
					</ul>
				</div>
				<div className="right">
					<i className="iconfont icon-dianhua"></i>
					<i className="iconfont icon-dingwei"></i>
				</div>
			</div>
			)
	}
}
export default Header