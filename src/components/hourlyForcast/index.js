// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class HourlyForcast extends Component {

	constructor() {
		super();

		this.state = {
			hourlyTimes: new Array(24),
			hourlyTemps: new Array(24),
			hourlyIcons: new Array(24),
			currentTime: new Date().getHours()
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevprops.hourly !== this.props.hourly)
		{
			console.log("test")
		}
	}
	// rendering a function when the button is clicked
	render() {
		let hourly = this.props.hourly
		let tempType = ''
		let hourTimes = this.state.hourlyTimes
		let hourTemps = this.state.hourlyTemps
		let hourIcons = this.state.hourlyIcons
		let timeNow = this.state.currentTime
		let j = 0

		if (this.props.cf)
		{
			tempType = 'temp_f'
		} else {
			tempType = 'temp_c'
		}
		console.log(tempType)

		while (j < 24) {
			for (let k = timeNow; k < 24; k++) {
				hourTimes[j] = new Date(hourly['0']['hour'][k]['time_epoch'] * 1000).getHours()
				hourTemps[j] = hourly['0']['hour'][k][tempType]
				hourIcons[j] = hourly['0']['hour'][k]['condition']['icon']
				j += 1
			}
			for (let l = 0; l < timeNow; l++) {
				hourTimes[j] = new Date(hourly['0']['hour'][l]['time_epoch'] * 1000).getHours()
				hourTemps[j] = hourly['0']['hour'][l][tempType]
				hourIcons[j] = hourly['0']['hour'][l]['condition']['icon']
				j += 1
			}
			j += 5
		}

		console.log(this.state.hourlyTimes)

		let hours = hourTimes.slice(1, 24).map((hour, i) =>
			<td key={i} class={style.hourlyForcast_td}>{hour}:00</td>
		);

		let temps = hourTemps.map((temp, i) =>
			<td key={i} class={style.hourlyForcast_td}>{temp}°</td>
		);

		let icons = hourIcons.map((icons, i) =>
			<td class={style.hourlyForcast_td}><img key={i} src={icons}></img></td>
		);
		return (
			<div class={style.hourlyForcastContainer}>
				<table class={style.hourlyForcast} id="Hourly"></table>
				<tr>
					<td class={style.hourlyForcast_td}>Now</td>
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

