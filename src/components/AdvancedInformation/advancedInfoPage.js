// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class AdvancedInfoPage extends Component {

    constructor() {
        super();
        this.setState({
            feelslike_c: "",
            feelslike_f: "",
            gust_kph: "",
            gust_mph: "",
            humidity: "",
            precip_in: "",
            precip_mm: "",
            pressure_in: "",
            pressure_mb: "",
            vis_km: "",
            vis_miles: "",
            wind_degree: "",
            wind_dir: "",
            wind_kph: "",
            wind_mph: ""
        });
    }

    componentWillMount = () => {
        let currentWeather = this.props.currentInfo
        console.log(currentWeather)
        this.setState({

            feelslike_c: currentWeather['feelslike_c'],
            feelslike_f: currentWeather['feelslike_f'],
            gust_kph: currentWeather['gust_kph'],
            gust_mph: currentWeather['gust_mph'],
            humidity: currentWeather['humidity'],
            precip_in: currentWeather['precip_in'],
            precip_mm: currentWeather['precip_mm'],
            pressure_in: currentWeather['pressure_in'],
            pressure_mb: currentWeather['pressure_mb'],
            vis_km: currentWeather['vis_km'],
            vis_miles: currentWeather['vis_miles'],
            wind_degree: currentWeather['wind_degree'],
            wind_dir: currentWeather['wind_dir'],
            wind_kph: currentWeather['wind_kph'],
            wind_mph: currentWeather['wind_mph']
        })
        console.log(this.state.wind_mph)
    }

    // rendering a function when the button is clicked
    render() {

        return (
            <header class={style.header}>
                <table>
                    <tr>
                        <div>What temperature does it feel?</div>
                        <div>{this.state.feelslike_c}°C</div>
                        <div>{this.state.feelslike_f}°F</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Gust</div>
                        <div>{this.state.gust_kph} kph</div>
                        <div>{this.state.gust_mph} mph</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Humidity</div>
                        <div>{this.state.humidity}%</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Precipitation</div>
                        <div>{this.state.precip_mm} mm</div>
                        <div>{this.state.precip_in} inches</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Pressure</div>
                        <div>{this.state.pressure_mb} millie</div>
                        <div>{this.state.pressure_in} Inches</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Visual Range</div>
                        <div>{this.state.vis_km} km</div>
                        <div>{this.state.vis_miles} Miles</div>
                    </tr>
                    <tr>
                        <div class={style.AdvancedInfoPage_break}>Wind</div>
                        <div>{this.state.wind_degree} degrees</div>
                        <div>{this.state.wind_dir}</div>
                        <div>{this.state.wind_kph} kph</div>
                        <div>{this.state.wind_mph} mph</div>
                    </tr>
                </table>
            </header>
        );
    }
}

