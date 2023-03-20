// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class WeeklyForcast extends Component {

    constructor() {
        super();
        this.state = {
            dailyTempMax: [],
            dailyTempMin: [],
            dailyTime: []
        };
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.daily !== this.props.daily)
        {
            let daily = this.props.daily;
            let dailyMax = daily['temperature_2m_max'];
            let dailyMin = daily['temperature_2m_min'];
            let dailyTimeDay = daily['time'];
    
            this.setState({
                dailyTempMax: dailyMax,
                dailyTempMin: dailyMin,
                dailyTime: dailyTimeDay
            });
        }
    }

    // rendering a function when the button is clicked
    render() {
        let dailyMax = this.state.dailyTempMax
        let dailyMin = this.state.dailyTempMin
        let dailyTimeDay = this.state.dailyTime

        return (
            <table class={style.details}>
                {dailyMax.map((dailyMax, i) => (
                <tr class={style.weekly_tr}>
                    <td>{new Date(dailyTimeDay[i] * 1000).getDay()}</td>
                    <td key={i}>{dailyMax} - {dailyMin[i]}</td>
                    <td>test</td>
                </tr>))}
            </table>
        );
    }
}

