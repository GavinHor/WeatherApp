// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 69
        };
    }

    getValue() {
        return this.state.value;
    }

    // rendering a function when the button is clicked
    render() {
        return (
            <header class={style.header}>
                <table class={style.settingsTable}>
                    <tr>
                        <td>
                            <p>Celcius/Farenheit</p>
                        </td>
                        <td>
                            <label class={style.switch}>
                                <input type="checkbox"> </input>
                                <span class={style.slider}></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Light Mode/Dark Mode</p>
                        </td>
                        <td>
                            <label class={style.switch}>
                                <input type="checkbox"> </input>
                                <span class={style.slider}></span>
                            </label>
                        </td>
                    </tr>
                </table>
            </header>
        );
    }
}

