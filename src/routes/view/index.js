import { h, Component } from "preact";
import style from "./style";

export default class Viewer extends Component {
  // gets called when this route is navigated to
  componentDidMount() {}

  // Note: `user` comes from the URL, courtesy of our router
  render({ project }) {
    return (
      <div class={style.view}>
        <h1>Project: {project}</h1>
      </div>
    );
  }
}
