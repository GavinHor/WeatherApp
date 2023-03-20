// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class HourlyForcast extends Component {

	constructor() {
		super();

		this.state = {
			hourlyTimes: [],
			hourlyTemps: [],
			currentTime: new Date().getHours()
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.hourly !== this.props.hourly)
		{
			let hourlyForcast = this.props.hourly;
			let times = hourlyForcast['time'];
			let temps = hourlyForcast['temperature_2m'];
			this.setState({
				hourlyTimes: times,
				hourlyTemps: temps,
				//+1 since getHours gives us 
				currentTime: new Date().getHours() + 1
			});
			console.log(this.state.hourlyTemps)
		}
	}

	// rendering a function when the button is clicked
	render() {
		let timeNow = this.state.currentTime;
		let hourTimes = this.state.hourlyTimes;
		let hourTemps = this.state.hourlyTemps;

		let hours = hourTimes.slice(timeNow, timeNow + 24).map((hour, i) =>
		<td key={i} class={style.hourlyForcast_td}>{new Date(hour * 1000).getHours()}:00</td>
		);

		let temps = hourTemps.slice(timeNow, timeNow + 24).map((temp, i) =>
		<td key={i} class={style.hourlyForcast_td}>{temp}°</td>
		);

		let currentTemp = this.props.current

		return (
			<div class={style.hourlyForcastContainer}>
				<table class={style.hourlyForcast} id="Hourly"></table>
				<tr>
					<td>Now</td>
					{hours}
				</tr>
				<tr>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
					<td class={style.hourlyForcast_td}>Images</td>
				</tr>
				<tr>
					<td>{currentTemp}</td>
					{temps}
				</tr>
			</div>
		);
	}
}

