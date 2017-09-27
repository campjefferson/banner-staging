import { h, Component } from 'preact';
import style from './style';
import { Button } from 'react-toolbox/lib/button';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<Button label="Hello World!" />
			</div>
		);
	}
}
