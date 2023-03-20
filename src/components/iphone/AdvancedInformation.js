// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		/*
		var advancedInformation = [
			parsed_json['main']['0']['pressure'],
			parsed_json['main']['0']['humidity'],
			parsed_json['visibility']['0'],
			parsed_json['wind']['0']['speed'],
			parsed_json['wind']['0']['deg'],
			parsed_json['wind']['0']['gust'],
			parsed_json['clouds']['0']['all'],
			parsed_json['dt']['0'],
			parsed_json['sys']['0']['type'],
			parsed_json['sys']['0']['sunrise'],
			parsed_json['sys']['0']['sunset']
		];
		*/

		var advancedInformation = new Map([
			['Temperature', parsed_json['main']['temp']],
			['Pressure', parsed_json['main']['0']['pressure']],
			['Humidity', parsed_json['main']['0']['humidity']],
			['Visibility', parsed_json['visibility']['0']],
			['Wind Speed', parsed_json['wind']['0']['speed']],
			['Wind Direction', parsed_json['wind']['0']['deg']],
			['Wind Gust', parsed_json['wind']['0']['gust']],
			['Clouds', parsed_json['clouds']['0']['all']],
			['Sunrise Time', parsed_json['sys']['0']['sunrise']],
			['Sunset Time', parsed_json['sys']['0']['sunset']]
		]);

		convertToDateTime = (unixTimestamp) => {
			datetime = new Date(unixTimestamp * 1000).toLocaleString();
		}

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond: conditions,
			pressure: advancedInformation.get('Pressure'),
			humidity: advancedInformation.get('Humidity'),
			visibility: advancedInformation.get('Visibility'),
			windSpeed: advancedInformation.get('Wind Speed'),
			windDirection: advancedInformation.get('Wind Direction'),
			windGust: advancedInformation.get('Wind Gust'),
			clouds: advancedInformation.get('Clouds'),
			sunriseTime: advancedInformation.get('Sunrise Time'),
			sunsetTime: advancedInformation.get('Sunset Time'),
		});
	}

	advancedInformation.set(advancedInformation.get('Sunset Time'), convertToDateTime(advancedInformation.get('Sunset Time')));
	advancedInformation.set(advancedInformation.get('Sunset Time'), convertToDateTime(advancedInformation.get('Sunrise Time')));

	function addToTable(){
		const dataForTable = document.querySelector('table').innerHTML;

		advancedInformation.forEach((dataPoint, value) => {
			dataForTable += <tr>;
			dataForTable += <td>dataPoint<td> + <td>value<td>;
			dataForTable += <tr>;
		});
	}

	render(){
		return(
			<div class="AdvancedInformation">
				<table></table>
				<>
					{addToTable}
				</>
			</div>
		);
	}
}
