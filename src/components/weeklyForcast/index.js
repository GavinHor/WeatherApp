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

	//checks to see if max,min, and average temp of the previous are the same, if not then update 
	//should be statistically impossible for that to happen
    componentDidUpdate = (prevProps, prevStates) => {
        let currentCheck = this.props.daily['0']['day']['mintemp_f']
        let currentCheck2 = this.props.daily['0']['day']['maxtemp_f']
        let currentCheck3 = this.props.daily['0']['day']['avgtemp_f']
        let previousCheck = prevProps.daily['0']['day']['mintemp_f']
        let previousCheck2 = prevProps.daily['0']['day']['maxtemp_f']
        let previousCheck3 = prevProps.daily['0']['day']['avgtemp_f']
        if (currentCheck !== previousCheck && currentCheck2!==previousCheck2 && currentCheck3 !== previousCheck3)
        {
            this.componentWillMount()
        }
    }

    //what to render once mounted/remounted
	componentWillMount = () => {
        //declaring variables
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


        dailyDay[0] = "Today";
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

