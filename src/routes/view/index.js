import { h, Component } from "preact";
import { Button, IconButton } from "react-toolbox/lib/button";
import { Menu, IconMenu, MenuItem, MenuDivider} from "react-toolbox/lib/menu";
import Tooltip from 'react-toolbox/lib/tooltip';
import dateformat from "dateformat";

import style from "./style";

const TooltipButton = Tooltip(Button);

const InfoBar = () => (
  <div class={style.infoBar}>
    <IconButton icon="info" flat inverse class={style.icon} />
    <IconButton icon="replay" flat inverse class={style.icon} onClick={() => {
      document.getElementById("frame").src += '';
    }} />
    <IconButton icon="more_vert" flat inverse class={style.icon} onClick={() => {
      console.log("open menu");
    }} />
    <Menu position="bottomRight" active>
      <MenuItem icon='picture_in_picture' caption="Download Banner" />
      <MenuItem icon='image' caption="Download Backup Image" />
      <MenuDivider />
      <MenuItem icon='file_download' caption="Download Project" />
    </Menu>
  </div>
);

export default class Viewer extends Component {
  // gets called when this route is navigated to
  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (!this.props.currentProject && nextProps.currentProject) ||
      (!this.props.currentBanner && nextProps.currentBanner) ||
      (!this.props.currentProject.slug && nextProps.currentProject.slug) ||
      (!this.props.currentBanner.file && nextProps.currentBanner.file) ||
      nextProps.currentProject.slug !== this.props.currentProject.slug ||
      nextProps.currentBanner.file !== this.props.currentBanner.file
    );
  }

  getCurrentBannerUrl() {
    const { currentProject, currentBanner } = this.props;
    if (!currentProject || !currentBanner) {
      return "";
    }
    let baseUrl = currentProject.url;
    let bannerUrl = `${baseUrl}${currentBanner.file}/`;
    return bannerUrl;
  }

  componentDidUpdate() {
    let { currentBanner } = this.props;
    if (!currentBanner) {
      return;
    }
    const container = document.getElementById("frame");
    const frame = `<iframe src="${this.getCurrentBannerUrl()}" width="${currentBanner.width}" height="${currentBanner.height}
    class="${style.iframe}"
    frameBorder="0"
    scrolling="no""/>`;

    container.innerHTML = frame;
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
          key={currentBanner ? currentBanner.file : "default"}
          class={style.iframe}
          width={`${currentBanner ? currentBanner.width : 300}`}
          height={`${currentBanner ? currentBanner.height : 250}`}
          src={this.getCurrentBannerUrl()}
        />
      );
    }
  }

  formatDate() {
    const { currentProject } = this.props;
    if (!currentProject || !currentProject.date) {
      return null;
    }
    console.log(currentProject);
    const date = new Date(currentProject.date);
    return dateformat(date, "mmmm dS, yyyy");
  }

  render({ project, toggleDrawerActive, currentProject, currentBanner }) {
    return (
      <div class={style.view}>
        <div class={style.subnav}>
          <div>
            <h1>{currentProject.title}</h1>
          </div>
          <div class={style.liveDate}>
            <span class={style.title}>Live date:</span>
            <span class={style.date}>{this.formatDate()}</span>
          </div>
        </div>
        <div class={style.body}>
          <TooltipButton
            icon="menu"
            tooltipPosition="right"
            tooltip="View banner listing"
            flat
            floating
            accent
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