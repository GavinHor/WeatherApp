// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $, { get } from 'jquery';
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
			displayHourly: false,
			displayWeekly: false,
			displayError: false,
			displaySettingsToggle: false,
			settingsTrueFalse: [false, false],
			searchedLocation: "London"
		});
	}

	//Gets data upon startup
	componentDidMount = () => {
		this.fetchWeatherData()
	}
	
	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<body class={style.container}>
				{this.state.displaySettingsToggle ? <SettingsPage updateSettings={this.updateSettings} /> : null}
				{this.state.displayError ? <header class={style.error}>Invalid input, please search for something else</header> : null}
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
						<HourlyForcast hourly={this.state.Forcast} cf={this.state.settingsTrueFalse[0]} />
					</header> : null
				}
				{this.state.displayWeekly ? <WeeklyForcast daily={this.state.Forcast} cf={this.state.settingsTrueFalse[0]} /> : null}

				<footer class={style.footer}>
					<div class={style.Search}>
						<button type="button" class={style.textButton} onclick={this.searchLocation}>Search</button>
						<textarea id="Location" class={style.textArea}></textarea>
					</div>
					<SettingsButton clickFunction={this.displaySettings} />
				</footer>
			</body>
		);
	}

	//Get value from text area for location by: City, Country (will display closest city)
	searchLocation = () => {
		let locationSearched = document.getElementById('Location').value
		if (locationSearched == "") {
			return
		}
		this.setState({
			searchedLocation: document.getElementById('Location').value
		});
		this.fetchWeatherData();
	}

	//Renders and derenders appropriate html/components to display settings
	displaySettings = () => {
		if (this.state.displayError == true) {
			return
		}
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

	//Calls API for weather data
	fetchWeatherData = () => {
		let location = this.state.searchedLocation
		$.ajax({
			url: `http://api.weatherapi.com/v1/forecast.json?key=98d8a154a76746a5b7c120414232203&q=${location}&days=7&aqi=no&alerts=yes`,
			dataType: "json",
			success: this.parseResponseWeather,
			error: this.showError
		})
	}

	//Extracts Json to be rendered
	parseResponseWeather = (parsed_json) => {
		console.log(parsed_json)
		var location = parsed_json['location']['name']
		var temp = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['temp_c']
		var conditions = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['condition']['text']
		var iconCondition = parsed_json['forecast']['forecastday']['0']['hour'][new Date().getHours()]['condition']['icon']
		var currentForcast = parsed_json['forecast']['forecastday']
		var CurrentWarning = parsed_json['alerts']['alert']['0']


		let cf = this.state.settingsTrueFalse[0]
		if (cf) {
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
		});

		if (!this.state.displaySettingsToggle) {
			this.setState({
				displayHourly: true,
				displayWeekly: true,
				displayError: false,
			})
		}
	}

	//display Error component
	showError = () => {
		console.log("Error, incorrect Values, Please try something else")
		this.setState({
			displayError: true
		});
	}

	//Grabs values settingsPage component and sets respective states to change specific values
	//trueFalse[0] = celcius or farenheit
	//trueFalse[1] = 
	updateSettings = (trueFalse) => {
		this.setState({
			settingsTrueFalse: trueFalse
		});
		document.getElementsByClassName('style.container').style.background = black;
	}
}
