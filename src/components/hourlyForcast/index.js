// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class HourlyForcast extends Component {

	constructor() {
		super();
		this.state = {
			value: 10,
			display: true
		};
	}

	// rendering a function when the button is clicked
	render() {
		return (
			<div class={style.hourlyForcastContainer}>
				<table class={style.hourlyForcast}>
					<tr>
						<td>Now</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
						<td>Time</td>
					</tr>
					<tr>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
						<td>Image</td>
					</tr>
					<tr>
						<td>now</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td>9</td>
						<td>10</td>
						<td>11</td>
						<td>12</td>
					</tr>
				</table>
			</div>
		);
	}

}

