import { h, Component } from "preact";

// components
import { Button, IconButton } from "react-toolbox/lib/button";
import { FontIcon } from "react-toolbox/lib/font_icon";
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from "react-toolbox/lib/card";
import { List, ListItem } from "react-toolbox/lib/list";
import Dropdown from "react-toolbox/lib/dropdown";

// utility
import dateformat from "dateformat";
import {
  nameSortAsc,
  nameSortDesc,
  dateSortAsc,
  dateSortDesc
} from "../../utils/sort";

// style
import style from "./style";

const sortBy = [
  { value: "name", label: "Project Name" },
  { value: "date", label: "Project Date" }
];

const ListItemContent = ({ title, date }) => (
  <div class={style.listItemContent}>
    <h3>{title}</h3>
    <h5>{dateformat(date, "mmmm dS, yyyy")}</h5>
    <div class={style.listItemButtons}>
      <IconButton icon="remove_red_eye" flat class={style.listItemIcon} />
      <IconButton icon="file_download" flat class={style.listItemIcon} />
    </div>
  </div>
);

const ListHeader = ({ nameDir, dateDir, onNameClick, onDateClick }) => (
  <div class={style.listHeader}>
    <Button
      flat
      ripple={false}
      style={style.listHeaderButton}
      onClick={onNameClick}>
      Name
      <FontIcon value={`${nameDir === 1 ? "arrow_downward" : "arrow_upward"}`} />
    </Button>
    <Button
    flat
    ripple={false}
    style={style.listHeaderButton}
    onClick={onNameClick}>
      Live Date
      <FontIcon value={`${nameDir === 1 ? "arrow_downward" : "arrow_upward"}`} />
    </Button>
    <span />
  </div>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: "name",
      nameDir: 1,
      dateDir: 1
    };
  }

  handleChange = sortValue => {
    this.setState({
      ...this.state,
      sortValue
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.displayType !== this.props.displayType ||
      nextProps.searchTerm !== this.props.searchTerm ||
      nextState.sortValue !== this.state.sortValue ||
      nextState.nameDir !== this.state.nameDir ||
      nextState.dateDir !== this.state.dateDir
    );
  }

  toggleNameDir() {
    const nameDir = this.state.nameDir * -1;
    this.setState({
      ...this.state,
      sortValue: "name",
      nameDir
    });
  }

  toggleDateDir() {
    const dateDir = this.state.dateDir * -1;
    this.setState({
      ...this.state,
      sortValue: "date",
      dateDir
    });
  }

  renderProjectCards(projects) {
    return (
      <section class={style.cardsWrap}>
        {projects.map(project => {
          const { title, slug, date } = project;
          const thumbnail = `../../data/projects/${slug}/thumbnail.png`;
          return (
            <Card className={style.card}>
              <CardMedia
                aspectRatio="wide"
                className={style.cardMedia}
                image={thumbnail}
              />
              <CardTitle title={title} className={style.cardTitle} />
              <CardActions className={style.cardActions}>
                <CardText>{dateformat(date, "mmmm dS, yyyy")}</CardText>
                <IconButton
                  icon="file_download"
                  flat
                  class={style.cardDownload}
                />
              </CardActions>
            </Card>
          );
        })}
      </section>
    );
  }

  renderProjectsList(projects) {
    return (
      <List>
        <ListItem
          ripple={false}
          className={style.listItem}
          itemContent={
            <ListHeader
              nameDir={this.state.nameDir}
              dateDir={this.state.dateDir}
              onNameClick={this.toggleNameDir.bind(this)}
              onDateClick={this.toggleDateDir.bind(this)}
            />
          }
        />
        {projects.map(project => {
          const { title, image, date } = project;
          return (
            <ListItem
              ripple={false}
              className={style.listItemProject}
              itemContent={<ListItemContent title={title} date={date} />}
            />
          );
        })}
      </List>
    );
  }

  getSortedProjects(
    projects,
    sortValue = null,
    nameDir = null,
    dateDir = null
  ) {
    if (!sortValue) {
      sortValue = this.state.sortValue;
    }

    if (!nameDir) {
      nameDir = this.state.nameDir;
    }

    if (!dateDir) {
      nameDir = this.state.nameDir;
    }
    const result = projects.sort(
      sortValue === "date"
        ? dateDir === 1 ? dateSortDesc : dateSortAsc
        : nameDir === 1 ? nameSortDesc : nameSortAsc
    );
    return result;
  }

  renderProjects(projects) {
    const { displayType } = this.props;

    if (displayType === "list") {
      return this.renderProjectsList(projects);
    } else {
      return this.renderProjectCards(projects);
    }
  }

  render(props, state) {
    const { sortValue, nameDir, dateDir } = state;

    const projects = this.getSortedProjects(
      this.props.projects,
      sortValue,
      nameDir,
      dateDir
    );

    return (
      <div class={style.home}>
        <div class={style.sortWrap}>
          <div class={style.sort}>
            <h4>Sort by</h4>
            <Dropdown
              auto={false}
              source={sortBy}
              onChange={this.handleChange}
              value={sortValue}
            />
          </div>
        </div>
        <section class={style.projectsContainer}>
          <h1 style={{ marginLeft: `24px` }}>Projects</h1>
          {this.renderProjects(projects)}
        </section>
      </div>
    );
  }
}
