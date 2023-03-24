// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class HourlyForcast extends Component {

	//declaring states
	constructor() {
		super();

		this.setState({
			hourlyTimes: new Array(24),
			hourlyTemps: new Array(24),
			hourlyIcons: new Array(24),
			currentTime: new Date().getHours()
		});
	}

	//checks to see if max,min, and average temp of the previous are the same, if not then update 
	//should be statistically impossible for that to happen
	componentDidUpdate = (prevProps, prevStates) => {
        let currentCheck = this.props.hourly['0']['day']['mintemp_f']
        let currentCheck2 = this.props.hourly['0']['day']['maxtemp_f']
		let currentCheck3 = this.props.hourly['0']['day']['avgtemp_f']
        let previousCheck = prevProps.hourly['0']['day']['mintemp_f']
        let previousCheck2 = prevProps.hourly['0']['day']['maxtemp_f']
		let previousCheck3 = prevProps.hourly['0']['day']['avgtemp_f']
        if (currentCheck !== previousCheck && currentCheck2!==previousCheck2 && currentCheck3 !== previousCheck3)
        {
            this.componentWillMount()
        }
	}

	componentWillMount = () =>{
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

		//extract weather data and inserts them into appropiate values
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

		//Inserts values into appropiate html
		let hours = hourTimes.slice(1, 24).map((hour, i) =>
			<td key={i} class={style.hourlyForcast_td}>{hour}:00</td>
		);

		let temps = hourTemps.map((temp, i) =>
			<td key={i} class={style.hourlyForcast_td}>{temp}°</td>
		);

		let icons = hourIcons.map((icons, i) =>
			<td class={style.hourlyForcast_td}><img key={i} src={icons}></img></td>
		);

		this.setState({
			hourlyTimes: hours,
			hourlyTemps: temps,
			hourlyIcons: icons
		});
	}
	// render appropiate html
	render() {
		//html to be rendered
		return (
			<div class={style.hourlyForcastContainer}>
				<table class={style.hourlyForcast} id="Hourly"></table>
				<tr>
					<td class={style.hourlyForcast_td}>Now</td>
					{this.state.hourlyTimes}
				</tr>
				<tr>
					{this.state.hourlyIcons}
				</tr>
				<tr>
					{this.state.hourlyTemps}
				</tr>
			</div>
		);
	}
}

