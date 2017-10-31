import { h, Component } from "preact";
import AppBar from "react-toolbox/lib/app_bar";
import Navigation from "react-toolbox/lib/navigation";
import Input from "react-toolbox/lib/input";
import { Link } from "preact-router";
import { IconButton } from "react-toolbox/lib/button";

import style from "./style";
import KoodoLogo from "../../assets/img/svg/koodo";

export default class Header extends Component {
  renderSortToggleButton() {
    const displayType = this.props.displayType;
    return (
      <IconButton
        class={style.icon}
        icon={displayType === "cards" ? "view_list" : "view_module"}
        flat
        onClick={this.props.toggleDisplayType}
      />
    );
  }
  renderHomeButton() {
    return (
      <Link href="/" title="Home">
        <IconButton class={style.icon} icon={"home"} flat />
      </Link>
    );
  }

  renderSortToggleOrHomeButton(viewType) {
    switch (viewType) {
      case "main":
        return this.renderSortToggleButton();
        break;
      case "project":
        return this.renderHomeButton();
        break;
    }
  }

  render(props) {
    const { searchTerm, displayType, viewType } = props;
    return (
      <AppBar title="" class={style.appBar} leftIcon={<KoodoLogo />}>
        <Navigation type="horizontal" class={style.nav}>
          <Input
            type="text"
            class={style.search}
            value={searchTerm}
            onChange={this.props.handleSearchTermChange}
            placeholder="Search projects"
          />
          <IconButton class={`${style.icon}`} icon="search" flat disabled />
          {this.renderSortToggleOrHomeButton(viewType)}
        </Navigation>
      </AppBar>
    );
  }
}
