// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class SettingsButton extends Component {
	
	// rendering a function when the button is clicked
	render() {
		let cFunction = this.props.clickFunction;
		if(typeof cFunction !== 'function'){
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}

		return (	
			<div>
				<button onClick={cFunction} class={style.settings}>
					<img src="../../assets/icons/Gear.png" class={style.settingButton}></img>
				</button>
			</div>
		);
	}
}

