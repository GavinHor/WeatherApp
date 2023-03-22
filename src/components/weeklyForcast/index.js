// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class WeeklyForcast extends Component {

    constructor() {
        super();
        this.state = {
            dailyTempMax: new Array(7),
            dailyTempMin: new Array(7),
            dailyTime: new Array(7),
            dailyIcons: new Array(7),
            dailyDay: new Array(7),
            dailyDayTranslation: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thur",
                "Fri",
                "Sat"
            ]
        };
    }

    // rendering a function when the button is clicked
    render() {
        let daily = this.props.daily
        let dailyMaxs = this.state.dailyTempMax
        let dailyMins = this.state.dailyTempMin
        let dailyIcons = this.state.dailyIcons
        let dailyDay = this.state.dailyDay
        if (this.props.cf){
            for (let j = 0; j < 7; j++) {
                dailyMaxs[j] = daily[j]['day']['maxtemp_f']
                dailyMins[j] = daily[j]['day']['mintemp_f']
                dailyIcons[j] = daily[j]['day']['condition']['icon']
                dailyDay[j] = this.state.dailyDayTranslation[new Date(daily[j]['date_epoch'] * 1000).getDay()]
            }
        } else {
            for (let j = 0; j < 7; j++) {
                dailyMaxs[j] = daily[j]['day']['maxtemp_c'] 
                dailyMins[j] = daily[j]['day']['mintemp_c']
                dailyIcons[j] = daily[j]['day']['condition']['icon']
                dailyDay[j] = this.state.dailyDayTranslation[new Date(daily[j]['date_epoch'] * 1000).getDay()]
            }
        }

        let futureWeek = dailyIcons.map((icon, i) =>
            <tr class={style.weekly_tr}>
                <td >{dailyDay[i]}</td>
                <td >{dailyMins[i]} - {dailyMaxs[i]}°</td>
                <td > <img src={icon}></img></td>
            </tr>
        );

        return (
            <table class={style.details}>
                {futureWeek}
            </table>
        );
    }
}

