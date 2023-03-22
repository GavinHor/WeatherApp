// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import SettingsButton from '../settings/settingsButton';
import HourlyForcast from '../hourlyForcast';
import WeeklyForcast from '../weeklyForcast';
import SettingsPage from '../settings/settingsPage';

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
			displaySettingsToggle: false,
			settingsTrueFalse: [false, false]
		});
	}

	componentDidMount = () => {
		this.fetchWeatherData()
	}
	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<body class={style.container}>
				{this.state.displaySettingsToggle ?
					<header class={style.header}>
						<table class={style.settingsTable}>
							<tr>
								<td>
									<p>Celcius/Farenheit</p>
								</td>
								<td>
									<label class={style.switch}>
										<input type="checkbox" onChange={this.changeCF}checked={this.state.settingsTrueFalse[0]}></input>
										<span class={style.slider}></span>
									</label>
								</td>
							</tr>
							<tr>
								<td>
									<p>Light Mode/Dark Mode</p>
								</td>
								<td>
									<label class={style.switch}>
										<input id="lightDark" type="checkbox" onChange={this.changeLightDark} checked={this.state.settingsTrueFalse[1]}> </input>
										<span class={style.slider}></span>
									</label>
								</td>
							</tr>
						</table>
					</header> : null}
				{this.state.displayHourly ?
					<header class={style.header}>
						<div class={style.city}>{this.state.locate}</div>
						<span class={style.temperature}>{this.state.temp}</span>
						<img class={style.mainIcon} src={this.state.icon} alt=""></img>
						<div class={style.conditions}>{this.state.cond}</div>
						<table class={style.maxMinTemperature}>
							<tr>
								<td> {this.state.highestTemp} </td>
								<td> {this.state.lowestTemp} </td>
							</tr>
						</table>
						<hr class={style.hr}></hr>
						<HourlyForcast hourly={this.state.Forcast} cf={this.state.settingsTrueFalse[0]}/>
					</header> : null
				}
				{this.state.displayWeekly ? <WeeklyForcast daily={this.state.Forcast} cf={this.state.settingsTrueFalse[0]}/> : null}

				<footer class={style.footer}>
					<SettingsButton clickFunction={this.displaySettings} />
				</footer>
			</body>
		);
	}

	displaySettings = () => {
		if (this.state.displaySettingsToggle == true) {
			this.setState({
				displaySettingsToggle: false,
				displayHourly: true,
				displayWeekly: true
			});
			this.fetchWeatherData();

		} else {
			this.setState({
				displaySettingsToggle: true,
				displayHourly: false,
				displayWeekly: false
			});
		}
		console.log("Settings displayed?: " + this.state.displaySettingsToggle)
	}

	fetchWeatherData = () => {
		$.ajax({
			url: "http://api.weatherapi.com/v1/forecast.json?key=98d8a154a76746a5b7c120414232203&q=London&days=7&aqi=no&alerts=no",
			dataType: "json",
			success: this.parseResponseWeather,
			error: function (req, err) { console.log('API call failed ' + err); }
		})
	}

	parseResponseWeather = (parsed_json) => {
		console.log(parsed_json)
		var location = parsed_json['location']['name']
		var temp = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['temp_c']
		var conditions = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['condition']['text']
		var iconCondition = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['condition']['icon']
		var currentForcast = parsed_json['forecast']['forecastday']

		let cf = this.state.settingsTrueFalse[0]
		if (cf)
		{
			var temp = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['temp_f']
			var highestTemp = parsed_json['forecast']['forecastday']['0']['day']['maxtemp_f']
			var lowestTemp = parsed_json['forecast']['forecastday']['0']['day']['mintemp_f']
		} else {
			var temp_c = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['temp_c']
			var highestTemp = parsed_json['forecast']['forecastday']['0']['day']['maxtemp_c']
			var lowestTemp = parsed_json['forecast']['forecastday']['0']['day']['mintemp_c']
		}

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp + "°",
			cond: conditions,
			highestTemp: 'H:' + highestTemp + "°",
			lowestTemp: 'L:' + lowestTemp + "°",
			icon: iconCondition,
			Forcast: currentForcast,
			displayHourly: true,
			displayWeekly: true,
			display: false
		});

	}

	changeCF = () => {
		console.log("CF")
		let trueFalse = this.state.settingsTrueFalse
		trueFalse[0] = !trueFalse[0]
		console.log(trueFalse)
		this.setState({
			settingsTrueFalse: trueFalse
		})
	}

	changeLightDark = () => {
		console.log("LD")
		let trueFalse = this.state.settingsTrueFalse
		trueFalse[1] = !trueFalse[1]
		this.setState({
			settingsTrueFalse: trueFalse
		})
	}
}
