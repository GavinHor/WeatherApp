// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class WeeklyForcast extends Component {

    constructor() {
        super();
        this.setState({
            nextWeek: new Array(7),
            //Date().getDay() function only gives numbers 0-9, therefore array needed for translating between int to string.
            dailyDayTranslation: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thur",
                "Fri",
                "Sat"
            ]
        });
    }
	componentWillMount = () => {
        let daily = this.props.daily
        let dailyMaxs = new Array(7)
        let dailyMins = new Array(7)
        let dailyIcons = new Array(7)
        let dailyDay = new Array(7)

        //Inserting appropiate extract data into variables
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

        //Inserting variables into html
        let futureWeek = dailyIcons.map((icon, i) =>
            <tr class={style.weekly_tr}>
                <td >{dailyDay[i]}</td>
                <td >{dailyMins[i]} - {dailyMaxs[i]}°</td>
                <td > <img src={icon}></img></td>
            </tr>
        );

        this.setState({
            nextWeek: futureWeek
        });
    }
    // rendering a function when the button is clicked
    render() {
        //initialising variables
        return (
            <table class={style.details}>
                {this.state.nextWeek}
            </table>
        );
    }
}

