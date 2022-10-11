import React from "react";
import classNames from "classnames";
import { Nav, Navbar } from "react-bootstrap";

interface Props {
  toggle(): void;
}

interface State {
  dropShadow: boolean;
}

export class MainNavigationBar extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {dropShadow: false};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const {dropShadow} = this.state;
    const el = document.documentElement;
    if (el.scrollTop > 0 && dropShadow) return;
    this.setState({dropShadow: el.scrollTop > 0});
  }

  render() {
    const {dropShadow} = this.state;
    const burgerCss = "navbar-toggler-humburger-icon btn btn-link d-flex flex-center d-xl-none";
    const css = classNames("navbar-glass fs--1 navbar-top sticky-kit", {'navbar-glass-shadow': dropShadow});

    return (
      <Navbar className={css} expand="lg">
        <Navbar.Toggle className="toggle-icon-wrapper me-md-3 me-2 d-xl-none" as="div" aria-controls="responsive-navbar-nav">
          <button className={burgerCss} id="burgerMenu" onClick={this.props.toggle}>
            <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
          </button>
        </Navbar.Toggle>
        <Nav navbar className="align-items-center d-none d-lg-block" as="ul"/>
        <Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">{this.props.children}</Nav>
      </Navbar>
    );
  }
}