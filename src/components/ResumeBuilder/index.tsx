import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import "react-tippy/dist/tippy.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import "./theme/main.scss";

import React from "react";
import styles from "./style.module.scss";
import TopNavbar from "./component/TopNavbar";
import One from "./template/One";

class Home extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: "Source Sans Pro" }}>
        <div className={styles.loading} style={{ background: "#03A9F4" }}>
          <div className={styles.loading_gradient}></div>
        </div>

        <TopNavbar />

        <div className={styles.container}>
          <One />
        </div>
      </div>
    );
  }
}

export default Home
