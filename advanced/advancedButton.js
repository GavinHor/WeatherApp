// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class AdvancedButton extends Component{
	render() {
		let cFunction = this.props.clickFunction;
		if(typeof cFunction !== 'function'){
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}

		return (
			<div>
				<button onClick={cFunction} class={style.advanced}>
					<img src="../../assets/icons/Plus.png" class={style.advancedButton}></img>
				</button>
			</div>
		);
	}
}
