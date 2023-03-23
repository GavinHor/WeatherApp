// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from '../iphone/style.less';
//import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class AdvancedInformation extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(){
		super();
		// button display state
		this.state = {
			trueFalseSettings: [false, false]
		};
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		let url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=12c329204b860543a28b9d884867f9e5";
		$.ajax({
			url,
			dataType: "jsonp",
			success : this.parseResponse,
			error(req, err){ console.log('API call failed ' + err); }
		});
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class="">
				<header class={ style.header }>
					Advanced Information
				</header>

				<table>
					<tr>
						<td>
							Pressure
						</td>
						<td>
							{this.pressure}
						</td>
					</tr>
					<tr>
						<td>
							Humidity
						</td>
						<td>
							{this.humidity}
						</td>
					</tr>
					<tr>
						<td>
							Visibility
						</td>
						<td>
							{this.visibility}
						</td>
					</tr>
					<tr>
						<td>
							Wind Speed
						</td>
						<td>
							{this.windSpeed}
						</td>
					</tr>
					<tr>
						<td>
							Wind Direction
						</td>
						<td>
							{this.windDirection}
						</td>
					</tr>
					<tr>
						<td>
							Wind Gust
						</td>
						<td>
							{this.windGust}
						</td>
					</tr>
					<tr>
						<td>
							Clouds
						</td>
						<td>
							{this.clouds}
						</td>
					</tr>
					<tr>
						<td>
							Sunrise Time
						</td>
						<td>
							{this.sunriseTime}
						</td>
					</tr>
					<tr>
						<td>
							Sunset Time
						</td>
						<td>
							{this.sunsetTime}
						</td>
					</tr>
					<tr>
						<td>
							Pressure
						</td>
						<td>
							{this.state.pressure}
						</td>
					</tr>
				</table>
			</div>
		);
	}

	test = (param) => {
		return param;
	}
	parseResponse = (parsed_json) => {
		console.log('Parsing the json');
		let location = parsed_json['name'];
		let temp_c = parsed_json['main']['temp'];
		let conditions = parsed_json['weather']['0']['description'];

		const advancedInformation = new Map([
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

		const convertToDateTime = (unixTimestamp) => {
			return new Date(unixTimestamp * 1000).toLocaleString();
		};

		this.pressure = advancedInformation.get('Pressure');
		this.humidity =  advancedInformation.get('Humidity');
		this.visibility = advancedInformation.get('Visibility');
		this.windSpeed = advancedInformation.get('Wind Speed');
		this.windDirection = advancedInformation.get('Wind Direction');
		this.windGust = advancedInformation.get('Wind Gust');
		this.clouds = advancedInformation.get('Clouds');
		this.sunriseTime = convertToDateTime(advancedInformation.get('Sunrise Time'));
		this.sunsetTime = convertToDateTime(advancedInformation.get('Sunset Time'));
		console.log(this.pressure);

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
			sunriseTime: convertToDateTime(advancedInformation.get('Sunrise Time')),
			sunsetTime: convertToDateTime(advancedInformation.get('Sunset Time'))
		});

		return advancedInformation;
	};
	/*
	//Gets the table element, and goes through each element in the AdvancedInformation map
	//Adds each key and value to the table, keys in one column and value in the other
	addToTable(parsed_json){
		let dataForTable = document.querySelector('table').innerHTML;

		const advancedInformation = new Map([
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

		advancedInformation.forEach((dataPoint, value) => {
			dataForTable += '<tr>';
			dataForTable += '<td>'+dataPoint+'</td>' + '<td>'+value+'</td>';
			dataForTable += '<tr>';
		});
	}
	*/
}
