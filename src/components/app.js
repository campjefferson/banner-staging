import { h, Component } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import Footer from "./footer";
import CampaignListing from "./campaignlisting";
import Home from "../routes/home";
import Viewer from "../routes/view";
import { Layout, NavDrawer, Panel, Sidebar } from "react-toolbox";

import projectsData from "../data/projects/projects.json";
import style from "./style";
export default class App extends Component {
  state = {
    searchTerm: null,
    drawerActive: false,
    displayType: "list",
    projects: projectsData,
    viewType: "main",
    currentProject: null,
    currentBanner: null
  };

  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
    const projectUrl = e.url.substr(1);

    let currentProject =
      projectsData.filter(project => {
        return project.slug === projectUrl;
      })[0] || null;
    let currentBanner = null;

    if (currentProject) {
      const sets = Object.keys(currentProject.banners);
      const banners = currentProject.banners[sets[0]];
      const bannerKeys = Object.keys(banners);
      currentBanner = banners[bannerKeys[0]];
    }

    this.setState({
      ...this.state,
      currentProject,
      currentBanner,
      viewType: e.url === "/" ? "main" : "project"
    });
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

  setCurrentBanner(currentBanner) {
    this.setState({
      ...this.state,
      drawerActive: false,
      currentBanner
    });
  }

  render(props, state) {
    const {
      displayType,
      searchTerm,
      viewType,
      currentProject,
      currentBanner
    } = state;
    const projects = this.getFilteredProjects(searchTerm);
    return (
      <Layout id="app">
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
          className={style.menu}
        >
          <CampaignListing
            project={currentProject}
            currentBanner={currentBanner}
            setCurrentBanner={this.setCurrentBanner.bind(this)}
          />
        </NavDrawer>
        <Panel>
          <Header
            handleSearchTermChange={this.handleSearchTermChange}
            searchTerm={searchTerm}
            displayType={displayType}
            viewType={viewType}
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
                currentProject={currentProject}
                currentBanner={currentBanner}
              />
            </Router>
          </main>
          <Footer />
        </Panel>
      </Layout>
    );
  }
}
