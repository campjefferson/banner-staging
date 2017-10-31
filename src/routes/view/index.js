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

  getCurrentBannerUrl() {
    const { currentProject, currentBanner } = this.props;
    if (!currentProject || !currentBanner) {
      return "";
    }
    let baseUrl = currentProject.url;
    let bannerUrl = `${baseUrl}${currentBanner.file}`;
    return bannerUrl;
  }

  renderIframe() {
    let { currentBanner } = this.props;
    if (!currentBanner) {
      return <div class={style.defaultIframe} />;
    } else {
      return (
        <iframe
          id="frame"
          frameBorder="0"
          scrolling="no"
          class={style.iframe}
          width={`${currentBanner ? currentBanner.width : 300}`}
          height={`${currentBanner ? currentBanner.height : 250}`}
          src={this.getCurrentBannerUrl()}
        />
      );
    }
  }

  render({ project, toggleDrawerActive, currentBanner }) {
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
          <IconButton
            icon="content_copy"
            flat
            onClick={toggleDrawerActive}
            class={style.menuButton}
          />
          {this.renderIframe()}
        </div>
        <InfoBar />
      </div>
    );
  }
}
