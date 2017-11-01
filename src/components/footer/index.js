import { h, Component } from "preact";

import style from "./style";
import Chevron from "../../assets/img/svg/cj-chevron";

export default class Footer extends Component {
  render(props) {
    return (
      <footer class={style.Footer}>
        <Chevron />
      </footer>
    );
  }
}
