import { h, Component } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import Footer from "./footer";
import Home from "../routes/home";
import Viewer from "../routes/view";
import { Layout, NavDrawer, Panel, Sidebar } from "react-toolbox";

// remove for production
//import projectsData from "../data/fakeProjectsData";
import projectsData from "../data/projects/projects.json";
import style from "../style";
export default class App extends Component {
  state = {
    searchTerm: null,
    drawerActive: false,
    displayType: "list",
    projects: projectsData
  };

  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  /** Gets fired when the search term.
	 *	@param {string} searchTerm the new search term
	 */
  handleSearchTermChange = searchTerm => {
    this.setState({
      ...this.state,
      searchTerm
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

  toggleDisplayType = () => {
    this.setState({
      ...this.state,
      displayType: this.state.displayType === "cards" ? "list" : "cards"
    });
  };

  render(props, state) {
    const { displayType, searchTerm } = state;
    const projects = this.getFilteredProjects(searchTerm);
    return (
      <Layout id="app">
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
        >
          <p>Navigation, account switcher, etc. go here.</p>
        </NavDrawer>
        <Panel>
          <Header
            handleSearchTermChange={this.handleSearchTermChange}
            searchTerm={searchTerm}
            displayType={displayType}
            toggleDisplayType={this.toggleDisplayType}
          />
          <main class={style.main}>
            <Router onChange={this.handleRoute}>
              <Home
                path="/"
                displayType={displayType}
                projects={projects}
                searchTerm={searchTerm}
              />
              <Viewer
                path="/:project"
                toggleDrawerActive={this.toggleDrawerActive}
              />
            </Router>
          </main>
          <Footer></Footer>
        </Panel>
      </Layout>
    );
  }
}
