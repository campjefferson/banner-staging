import { h, Component } from "preact";
import { Button, IconButton } from "react-toolbox/lib/button";

import style from "./style";

const InfoBar = () => (
  <div class={style.infoBar}>
    <IconButton icon="info" flat inverse class={style.icon} />
    <IconButton icon="replay" flat inverse class={style.icon} />
    <IconButton icon="file_download" flat inverse class={style.icon} />
  </div>
);

export default class Viewer extends Component {
  // gets called when this route is navigated to
  componentDidMount() {}

  // Note: `user` comes from the URL, courtesy of our router
  render({ project, toggleDrawerActive }) {
    return (
      <div class={style.view}>
        <div class={style.subnav}>
          <div>
            <h1>Project: {project}</h1>
          </div>
          <div class={style.liveDate}>
            <span class={style.title}>Live date:</span>
            <span class={style.date}>Oct 31, 2017</span>
          </div>
        </div>
        <div class={style.body}>
          <IconButton icon="content_copy" flat onClick={toggleDrawerActive} class={style.menuButton} />
          <iframe style="width:300px;height:250px;border:1px solid black;" />
        </div>
        <InfoBar />
      </div>
    );
  }
}
