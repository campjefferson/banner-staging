import { h, Component } from "preact";
import { Button, IconButton } from "react-toolbox/lib/button";

import style from "./style";

export default class Viewer extends Component {
  // gets called when this route is navigated to
  componentDidMount() {}

  // Note: `user` comes from the URL, courtesy of our router
  render({ project, toggleDrawerActive }) {
    return (
      <div class={style.view}>
        <h1>Project: {project}</h1>
        <Button label="open drawer" onClick={toggleDrawerActive} />
      </div>
    );
  }
}
