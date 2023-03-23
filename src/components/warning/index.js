// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
export default class Warning extends Component {

    componentWillMount = () => {

    }

    // rendering a function when the button is clicked
    render() {
        let info = this.props.warningInfo
        if (info == null) {
            return
        }
        console.log(info)
        let event = info['event']
        let desc = info['desc']

        //let severity = info['severity']
        return (
            <header class={style.warning}>
                    <h1 class={style.warningTitle}>{event} Warning: </h1>
                    {desc}
            </header>
        );
    }
}
