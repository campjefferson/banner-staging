import { h, Component } from "preact";
import { Button, IconButton } from "react-toolbox/lib/button";
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from "react-toolbox/lib/card";
import { List, ListItem } from "react-toolbox/lib/list";
import Dropdown from "react-toolbox/lib/dropdown";
import dateformat from "dateformat";

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
      onClick={onNameClick}
      label="Name"
      icon={`${nameDir === 1 ? "keyboard_arrow_down" : "keyboard_arrow_up"}`}
    />
    <Button
      flat
      onClick={onDateClick}
      label="Live Date"
      icon={`${dateDir === 1 ? "keyboard_arrow_down" : "keyboard_arrow_up"}`}
    />
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
    this.nameSortDesc = this.nameSortDesc.bind(this);
    this.dateSortDesc = this.dateSortDesc.bind(this);
    this.nameSortAsc = this.nameSortAsc.bind(this);
    this.dateSortAsc = this.dateSortAsc.bind(this);
  }

  handleChange = sortValue => {
    this.setState({
      ...this.state,
      sortValue
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return;
    nextProps.displayType !== this.props.displayType ||
      nextProps.searchTerm !== this.props.searchTerm ||
      nextState.sortValue !== this.state.sortValue ||
      nextState.nameDir !== this.state.nameDir ||
      nextState.dateDir !== this.state.dateDir;
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
          const { title, image, date } = project;
          return (
            <Card className={style.card}>
              <CardMedia
                aspectRatio="wide"
                className={style.cardMedia}
                image={image}
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
              className={style.listItem}
              itemContent={<ListItemContent title={title} date={date} />}
            />
          );
        })}
      </List>
    );
  }

  nameSortDesc(a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  nameSortAsc(a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  }

  dateSortDesc(a, b) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  }

  dateSortAsc(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
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
        ? dateDir === 1 ? this.dateSortDesc : this.dateSortAsc
        : nameDir === 1 ? this.nameSortDesc : this.nameSortAsc
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
        <h1 style={{ marginLeft: `24px` }}>Projects</h1>
        {this.renderProjects(projects)}
      </div>
    );
  }
}
