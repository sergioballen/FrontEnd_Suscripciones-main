import React from "react";
import axios from "axios";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
class AddBook extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      ISBN: "",
      name: "",
      author: "",
      genre: "",
      copies: "",
      publication: "",
      fine: "",
    },
    error: false,
    errorMsg: "Error",
  };
  sendData = () => {
    let url = ApiUrl + "book/createBook";
    axios
      .post(url, this.state.form)
      .then((response) => {
       

        if (
          response.data.message.toLowerCase() === "book registered successfully"
        ) {
          this.setState({
            error: true,
            errorMsg: "Suscripcion registrada exitosamente",
            form: {
              ISBN: "",
              name: "",
              author: "",
              genre: "",
              copies: "",
              publication: "",
              fine: "",
            },
          });
        } else {
          
          this.setState({
            error: true,
            errorMsg: "Error registrando suscripcion",
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
                {rol === "admin" && (
                  <li className="nav-item dropdown">
                    <Dropdown>
                      <Dropdown.Toggle
                        as={Link}
                        variant="secondary"
                        id="dropdown-books"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-book" />
                        <span>Suscripciones </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/dashBoard/bookManagement">
                          Lista de suscripciones
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/createBook">
                          Añadir Ssucripcion
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                      <Dropdown.Toggle
                        as={Link}
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Vendedores</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoard/EmployeeManagement"
                        >
                          Listar Vendedores
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                          Añadir vendedor
                        </Dropdown.Item>
                      </Dropdown.Menu>
                      <Dropdown.Toggle
                        as={Link}
                        to="/"
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Cerrar Sesión</span>
                      </Dropdown.Toggle>
                    </Dropdown>
                  </li>
                )}
                {rol === "employee" && (
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
                            Lista de clientes
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
                            Lista de Ssucripciones
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/createBook"
                          >
                            Añadir Ssucripcion
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
                          <i className="fa-solid fa-note-sticky" />
                          <span>Suscripciones activas</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/loanManagement"
                          >
                            Lista de suscripciones activas
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/addLoan"
                          >
                            Añadir suscripciones
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
                )}
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
                        <h4 className="card-title">Añadir Suscripcion</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div class="row">
                            <div class="col-md-4 pr-1">
                              <div class="form-group">
                                <label>Código del servicio</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Code"
                                  name="ISBN"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div class="col-md-4 pl-1">
                              <div class="form-group">
                                <label>Nombre</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Name"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div class="col-md-4 pl-1">
                              <div class="form-group">
                                <label>Proveedor</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Suplier"
                                  name="author"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 pr-1">
                              <div class="form-group">
                                <label>Tipo de Servicio</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  name="genre"
                                  placeholder="Type of service"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div class="col-md-6 pl-1">
                              <div class="form-group">
                                <label>Cantidad en Stock</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  name="copies"
                                  placeholder="Stock"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 pr-1">
                              <div class="form-group">
                                <label>Fecha de salida del servicio</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Username"
                                  name="publication"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div class="col-md-6 pl-1">
                              <div class="form-group">
                                <label>Valor interés de mora diario</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Fine value"
                                  name="fine"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="text-center">
                            <button
                              type="submit"
                              class="btn btn-info btn-fill"
                              onClick={this.sendData}
                            >
                              Añadir
                            </button>
                            <button
                              type="submit"
                              class="btn btn-danger btn-fill"
                            >
                              Cancelar
                            </button>
                          </div>
                          <div class="clearfix"></div>
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
          <Footer />
        </div>
      </div>
    );
  }
}

export default AddBook;
