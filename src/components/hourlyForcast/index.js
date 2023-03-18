// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class HourlyForcast extends Component {

	constructor() {
		super();
		this.state = {
			value: 10,
		};
	}

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.hourlyForcastContainer}>
				<button onclick={this.clicked}>GetHourly</button>
				<table class={style.hourlyForcast} id="Hourly"></table>
			</div>
		);
	}

	clicked = () => {
		//initialising variables
		let hourly = this.props.hourly;

		let currentHour = new Date();
		currentHour = currentHour.getHours();
		let hourHTML = "<td class='hourlyForcast_td'>Now</td>"

		let imageHTML = "<tr><td class='hourlyForcast_td'>image</td>"
		console.log(hourly['time']);

		let temperatureHTML = "<tr><td class='hourlyForcast_td'>" + hourly['temperature_2m'][currentHour]



		//Inputs time along with the corrosponding images and temperatures from Meteo API
		//+1 to skip current hour as variable is initialised with the first hour 
		for (let i = currentHour + 1; i < 24 + currentHour; i++) {

			//*1000 since java uses milliseconds internally while Unix time stamps use seconds
			let hour = new Date(                 hourly['time'][i] * 1000)
			hour = hour.getHours();

			hourHTML += "<td class='hourlyForcast_td'>" + hour + ":00</td>"
			imageHTML += "<td class='hourlyForcast_td'>Image</td>"
			temperatureHTML += "<td class='hourlyForcast_td'>" + hourly['temperature_2m'][i] + "°"
		}

		hourHTML += "</tr>"
		temperatureHTML += "</tr>"
		imageHTML += "</tr>"

		document.getElementById("Hourly").innerHTML = hourHTML + imageHTML + temperatureHTML;
		let css = document.querySelectorAll('.hourlyForcast_td');
		console.log(css)
		for (let i = 0; i < css.length; i++){
			css[i].style.padding = "0.25em 2em 0.25em 2em";
		}
	}
}

