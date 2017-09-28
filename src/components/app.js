import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import Home from "../routes/home";
import Viewer from "../routes/view";
import { Layout, NavDrawer, Panel, Sidebar } from "react-toolbox";

// remove for production
import faker from "faker";
const projectsData = [
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  },
  {
    title: faker.company.companyName(),
    image: "https://placeimg.com/400/245/any",
    date: faker.date.past()
  }
];

export default class App extends Component {
  state = {
    searchTerm: null,
    drawerActive: false,
    displayType: "list",
    projects: this.getFilteredProjects()
  };

  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  handleSearchTermChange = searchTerm => {
    this.setState({
      ...this.state,
      searchTerm,
      projects: this.getFilteredProjects(searchTerm)
    });
  };

  toggleDrawerActive = () => {
    this.setState({ ...this.state, drawerActive: !this.state.drawerActive });
  };

  getFilteredProjects(searchTerm) {
    if (!searchTerm) {
      return projectsData;
    }

    const projects = projectsData.filter(project => {
      return project.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    });

    return projects;
  }

  toggleDisplayType() {
    this.setState({
      ...this.state,
      displayType: this.state.displayType === "cards" ? "list" : "cards"
    });
  }

  render(props, state) {
    const { displayType, searchTerm, projects } = state;
    return (
      <Layout id="app">
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
        >
          <p>Navigation, account switcher, etc. go here.</p>
        </NavDrawer>
        <Panel style={{ paddingTop: `56px` }}>
          <Header
            handleSearchTermChange={this.handleSearchTermChange.bind(this)}
            searchTerm={searchTerm}
            displayType={displayType}
            toggleDisplayType={this.toggleDisplayType.bind(this)}
          />
          <main>
            <Router onChange={this.handleRoute}>
              <Home
                path="/"
                displayType={displayType}
                projects={projects}
                searchTerm={searchTerm}
              />
              <Viewer
                path="/:project"
                toggleDrawerActive={this.toggleDrawerActive.bind(this)}
              />
            </Router>
          </main>
        </Panel>
      </Layout>
    );
  }
}
