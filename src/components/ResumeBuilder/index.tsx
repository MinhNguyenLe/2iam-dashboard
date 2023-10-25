import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import "react-tippy/dist/tippy.css";
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-toastify/dist/ReactToastify.css';
import './theme/main.scss';

import React from "react";
import { connect } from "react-redux";

import styles from "./style.module.scss";
import TopNavbar from "./component/TopNavbar";
import Footer from "./component/Footer";

import One from "./template/One";

interface TProps {
  theme: {
    color: string;
    fontFamily: string;
  };
  itemStatus: {
    [key: string]: boolean;
  };
  userData: {
    [key: string]: string;
  };
}

class Home extends React.Component<TProps> {
  constructor(props: TProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div style={{ fontFamily: this.props.theme.fontFamily }}>
          <div
            className={styles.loading}
            style={{ background: this.props.theme.color }}
          >
            <div className={styles.loading_gradient}></div>
          </div>

          <TopNavbar
            itemStatus={this.props.itemStatus}
            theme={this.props.theme}
            userData={this.props.userData}
          />

          <div className={styles.container}>
            <One />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (store: any) => ({
  theme: store.theme,
  userData: store.userData,
  itemStatus: store.itemStatus,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
