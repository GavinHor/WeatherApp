// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';

export default class SettingsPage extends Component {

    constructor() {
		super();

		this.setState({
            //array for all values so properties of html in parent class isn't excessively long
            trueFalseSettings: [false,false]
		});
	}

    // rendering appropiate html for settingsPage
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

    //toggle function for if extract data is celcius or farenheit
    changeCelciusFarenheit = () => {
        let trueFalse = this.state.trueFalseSettings
        trueFalse[0] = !trueFalse[0]
        this.setState({
            trueFalseSettings: trueFalse
        })
        this.props.updateSettings(trueFalse)
    }

    //toggle function for if application should be in is light mode or dark mode
    changeDarkLight = () => {
        let trueFalse = this.state.trueFalseSettings
        trueFalse[1] = !trueFalse[1]
        this.setState({
            trueFalseSettings: trueFalse
        })
        this.props.updateSettings(trueFalse)
    }
    
}

