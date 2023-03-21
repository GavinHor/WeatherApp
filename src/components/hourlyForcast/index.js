// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class HourlyForcast extends Component {

	constructor() {
		super();

		this.state = {
			hourlyTimes: [],
			hourlyTemps: [],
			iconsArray: [],
			iconsTimeArray: [],
			currentTime: new Date().getHours()
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.hourly !== this.props.hourly) {
			let icons3Hour5DayForcast = this.props.iconForcast;
			console.log("list of temps")
			console.log(icons3Hour5DayForcast)

			let iconsTimeArray = new Array(40);
			let iconsArray = new Array(40);

			for (let i = 0; i < 40; i++) {
				iconsArray[i] = icons3Hour5DayForcast[i]['weather'][0]['icon'];
				iconsTimeArray[i] = icons3Hour5DayForcast[i]['dt'];
			}

			let hourlyForcast = this.props.hourly;
			let times = hourlyForcast['time'];
			let temps = hourlyForcast['temperature_2m'];
			this.setState({
				hourlyTimes: times,
				hourlyTemps: temps,
				iconsArray: iconsArray,
				iconsTimeArray: iconsTimeArray,
				//+1 since getHours gives us 
				currentTime: new Date().getHours() + 1
			});

			console.log("hourly")
			console.log(hourlyForcast)
		}
	}

	// rendering a function when the button is clicked
	render() {
		let timeNow = this.state.currentTime;
		let hourTimes = this.state.hourlyTimes;
		let hourTemps = this.state.hourlyTemps;
		let iconsArray = this.state.iconsArray;
		let iconsTimeArray = this.state.iconsTimeArray;

		let hours = hourTimes.slice(timeNow, timeNow + 24).map((hour, i) =>
			<td key={i} class={style.hourlyForcast_td}>{new Date(hour * 1000).getHours()}:00</td>
		);

		let temps = hourTemps.slice(timeNow, timeNow + 24).map((temp, i) =>
			<td key={i} class={style.hourlyForcast_td}>{temp}°</td>
		);

		let icons = hourTimes.slice(timeNow, timeNow + 24).map(hourTime => (
			<td>
				{iconsTimeArray.includes(hourTime) && (
					<img src={`https://openweathermap.org/img/wn/${iconsArray[iconsTimeArray.indexOf(hourTime)]}@2x.png`} />
				)}
			</td>
		))
		return (
			<div class={style.hourlyForcastContainer}>
				<table class={style.hourlyForcast} id="Hourly"></table>
				<tr>
					{hours}
				</tr>
				<tr>
					{icons}
				</tr>
				<tr>
					{temps}
				</tr>
			</div>
		);
	}
}

