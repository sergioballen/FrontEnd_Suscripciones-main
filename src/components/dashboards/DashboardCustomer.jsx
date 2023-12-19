import React from "react";
import Footer from "../Footer";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/light-bootstrap-dashboard.css";
import "../../assets/css/demo.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
class Dashboard extends React.Component {
  // Obtener el rol del localStorage

  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div className="wrapper">
          <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
            <div className="sidebar-wrapper">
              <div className="logo">
                <a className="simple-text">
                  <img
                    src="https://www.uptc.edu.co/sitio/export/sites/default/portal/.content/imagenes/header-v2/uptc_log_2021.png_1492831668.png"
                    style={{ height: "100px" }}
                    alt="Logo UPTC"
                  />
                </a>
              </div>
              <ul className="nav">
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      variant="secondary"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-users" />
                      <span>Suscripciones Activas </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/dashBoardCustomer/loans">
                        Suscripciones Activas
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      to="/"
                      variant="secondary"
                      id="dropdown-books"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-book" />
                      <span>Cerrar Sesión </span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-panel">
            {/* Navbar */}
            <nav
              className="navbar navbar-expand-lg "
              color-on-scroll={500}
              data-image="../assets/img/sidebar-5.jpg"
            >
              <div className="container-fluid">
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navigation"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a className="dropdown-item" href="#">
                          Actualizar data
                        </a>
                        <div className="divider" />
                        <a className="dropdown-item" href="/">
                          Cerrar Sesión
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <footer><Footer /></footer>
        </div>
      </div>
    );
  }
}

export default Dashboard;
