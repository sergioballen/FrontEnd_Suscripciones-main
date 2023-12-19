import React from "react";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
class AddCustomer extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      name: "",
      lastName: "",
      author: "",
      documentType: "",
      documentNumber: "",
      birthday: "",
      cellphone: "",
      address: "",
      username: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      email: this.state.form.username,
      customer: {
        password: this.state.form.password,
        rol: "customer",
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };

    

    const url = ApiUrl + "dashboard/registerCustomer/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.toLowerCase() === "customer registered successfully") {
          this.setState({
            error: true,
            errorMsg: "customer registered successfully",
            form: {
              name: "",
              lastName: "",
              author: "",
              documentType: "",
              documentNumber: "",
              birthday: "",
              cellphone: "",
              address: "",
              username: "",
              password: "",
            },
          });
        } else {
          this.setState({
            error: true,
            errorMsg: "Error registering employee",
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Error",
        });
      });
  };
  manejarChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div className="wraper">
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
                      <span>Clientes</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/CustomerManagement"
                      >
                        Lista de Clientes
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/addCustomer"
                      >
                        Añadir Cliente
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      variant="secondary"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-book" />
                      <span>Suscripciones</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/bookManagement"
                      >
                        Lista de suscripciones
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/createBook"
                      >
                        Añadir suscripcion
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-note-sticky" />
                      <span>Suscripciones activas</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/loanManagement"
                      >
                        Lista de Suscripciones activas
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/dashBoardEmployee/addLoan">
                        Activar Suscripcion
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
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-note-sticky" />
                      <span>Cerrar Sesión</span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-panel">
            <nav
              className="navbar navbar-expand-lg"
              color-on-scroll="500"
              data-image="../assets/img/sidebar-5.jpg"
            ></nav>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Añadir Cliente</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div className="row">
                            <div className="col-md-4 pr-1">
                              <div className="form-group">
                                <label>Nombres</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-4 pl-1">
                              <div className="form-group">
                                <label>Apellidos</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  name="lastName"
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-4 pl-1">
                              <div className="form-group">
                                <label>Tipo de docuemnto</label>
                                <select
                                  className="form-select form-control"
                                  name="documentType"
                                  required="required"
                                  onChange={this.manejarChange}
                                >
                                  <option value="">---Seleccione---</option>
                                  <option value="Citizenship card">
                                    Cédula de Ciudadanía
                                  </option>
                                  <option value="Foreigner ID">
                                    Cédula de Extranjeria
                                  </option>
                                  <option value="NIT">NIT</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Número de documento</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Document Number"
                                  name="documentNumber"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Cumpleaños</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="birthday"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                  ype="number"
                                  className="form-control"
                                  name="cellphone"
                                  placeholder="Cellphone"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Dirección</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  placeholder="Address"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Usuario</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Username"
                                  name="username"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Contraseña</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="password"
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-info btn-fill"
                              onClick={this.sendData}
                            >
                              Añadir
                            </button>
                            <button
                              type="submit"
                              className="btn btn-danger btn-fill"
                            >
                              Cancelar
                            </button>
                          </div>
                          <div className="clearfix"></div>
                        </form>
                        <br></br>
                        {this.state.error === true && (
                          <div className="alert alert-success" role="alert">
                            {this.state.errorMsg}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer><Footer /></footer>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
