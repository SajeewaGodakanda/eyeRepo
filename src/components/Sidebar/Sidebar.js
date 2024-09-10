
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "ocullogo.jpg";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = React.useRef();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  // Use slice to display only the first five routes
  const displayedRoutes = props.routes.slice(0, 5);
  return (
<div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a href="https://www.creative-tim.com" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a href="https://www.creative-tim.com" className="simple-text logo-normal">
          OCULARTECH.AI
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {displayedRoutes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
