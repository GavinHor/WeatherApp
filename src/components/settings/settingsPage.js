// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class SettingsPage extends Component {

    constructor() {
		super();

		this.state = {
            trueFalseSettings: [false,false]
		};
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
                                <input type="checkbox" onclick={this.changeCelciusFarenheit} checked={this.state.trueFalseSettings[0]}></input>
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
                                <input type="checkbox" id="lightDark" onclick={this.changeDarkLight} checked={this.state.trueFalseSettings[1]}>test </input>
                                <span class={style.slider}></span>
                            </label>
                        </td>
                    </tr>
                </table>
            </header>
        );
    }

    changeCelciusFarenheit = () => {
        let trueFalse = this.state.trueFalseSettings
        trueFalse[0] = !trueFalse[0]
        this.setState({
            trueFalseSettings: trueFalse
        })
        this.props.updateSettings(trueFalse)
    }

    changeDarkLight = () => {
        let trueFalse = this.state.trueFalseSettings
        trueFalse[1] = !trueFalse[1]
        this.setState({
            trueFalseSettings: trueFalse
        })
        this.props.updateSettings(trueFalse)
    }
    
}

