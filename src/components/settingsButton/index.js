// import preact
import { h, render, Component } from 'preact';
	
export default class SettingsButton extends Component {

	constructor(parseResponse) {
		super();
		this.state = {
			value: 0,
			display: true
		};
	}

	clicked = () => {
		this.setState(prev => ({ value: prev.value +1 }));
	};

	// rendering a function when the button is clicked
	render() {
		return (
			<div>
				{this.state.display ? 
				<button onclick={this.clicked}>Test: {this.state.value}</button>
				: null}
			</div>
		);
	}

}

