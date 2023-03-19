// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import SettingsButton from '../SettingsButton';
import HourlyForcast from '../hourlyForcast';
import WeeklyForcast from '../weeklyForcast';

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({
			display: true,
			displayHourly: false,
			displayWeekly: false,
		});
	}

	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<body class={style.container}>
				<header class={style.header}>
					<div class={style.city}>{this.state.locate}</div>
					<span class={style.temperature}>{this.state.temp}</span>
					<div class={style.conditions}>{this.state.cond}</div>
					<table class={style.maxMinTemperature}>
						<tr>
							<td> {this.state.highestTemp} </td>
							<td> {this.state.lowestTemp} </td>
						</tr>
					</table>
					<hr class={style.hr}></hr>
					{this.state.displayHourly ? <HourlyForcast hourly={this.state.hourly7DayForcast}/> : null}
				</header>
				{this.state.displayWeekly ? <WeeklyForcast daily={this.state.daily7DayForcast}/> : null}
				<footer class={style.footer}>
					<div>button</div>
					<div>button</div>
					<div>
						<SettingsButton clickFunction={this.test} />
					</div>
				</footer>
				<div class={style_iphone.container}>
					{this.state.display ? <Button class={style_iphone.button} clickFunction={this.fetchWeatherData} /> : null}
				</div>
			</body>
		);
	}

	fetchWeatherData = () => {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=55c7ce0930b022b960dec0062ba360b6",
			dataType: "json",
			success: this.parseResponseOpenWeather,
			error: function (req, err) { console.log('API call failed ' + err); }
		})

		$.ajax({
			url: "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timeformat=unixtime&timezone=auto",
			dataType: "json",
			success: this.parseResponseMeteoWeather,
			error: function (req, err) { console.log('API call failed ' + err); }
		})


		// once the data grabbed, hide the button
		this.setState({ 
			display: false,
			displayHourly: true,
			displayWeekly: true
		});
	}

	parseResponseOpenWeather = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var highestTemp_c = parsed_json['main']['temp_max'];
		var lowestTemp_c = parsed_json['main']['temp_min'];
		var conditions = parsed_json['weather']['0']['description'];
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c + "°",
			cond: conditions,
			highestTemp: 'H:' + highestTemp_c,
			lowestTemp: 'L:' + lowestTemp_c
		});
		console.log(parsed_json)
	}
	
	//7 day forcast split into 2 categories
	//1 for the overall day 
	//1 for each hour of the day
	parseResponseMeteoWeather = (parsed_json) => {
		var dailyForcast = parsed_json['hourly']
		var weeklyForcast = parsed_json['daily']

		this.setState({
			hourly7DayForcast: dailyForcast,
			daily7DayForcast: weeklyForcast
		})
		console.log(parsed_json)
	}
}
