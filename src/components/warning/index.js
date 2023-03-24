// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class Warning extends Component {

    //Rendering html only if there is a warning for the specified location that the user has inputted
    render() {
        let info = this.props.warningInfo
        if (info == null) {
            return
        }
        let event = info['event']
        let desc = info['desc']

        return (
            <header class={style.warning}>
                    <h1 class={style.warningTitle}>{event} Warning: </h1>
                    {desc}
            </header>
        );
    }
}
