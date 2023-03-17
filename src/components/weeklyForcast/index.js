// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class WeeklyForcast extends Component {

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
            <table class={style.details}>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>cloudy</td>
                </tr>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>cloudy</td>
                </tr>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>cloud</td>
                </tr>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>cloudy</td>
                </tr>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>sunny</td>
                </tr>
                <tr class={style.tr}>
                    <td>Today</td>
                    <td>4 - 18</td>
                    <td>cloudy</td>
                </tr>
            </table>
        );
    }

}

