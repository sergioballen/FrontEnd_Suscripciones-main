import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
class LoansCustomer extends React.Component {
  state = {
    data: [],
    error: false,
    errorMsg: "Error",
    form: {
      id: "",
      username: "",
      password: "",
      rol: "",
      Name: "",
      lastName: "",
      documentType: "",
      documentNumber: "",
      cellphone: "",
      address: "",
      birthday: "",
    },
  };

  getLoans = () => {
    let email = localStorage.getItem("username");
    let url = ApiUrl + "dashBoard/loansHistoryManagement/" + email;
    axios
      .get(url)
      .then((response) => {
        const { customerData } = response.data;
        if (customerData && customerData.customer.loans) {
          const allLoans = customerData.customer.loans.map((loan) => ({
            id: loan.id,
            isbn: loan.isbn,
            startDate: loan.startDate,
            endDate: loan.endDate,
            state: loan.state,
            _id: loan._id,
            customerUsername: customerData.email,
          }));

          console.log(allLoans);

          this.setState({ data: allLoans });
        } else {
          console.log("No se encontraron las suscripciones para el cliente.");
        }
      })
      .catch((error) => {
        // Manejar el error en caso de fallo en la solicitud
        console.log("Error al obtener las suscripciones:", error);
        this.setState({ data: [] });
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

  componentDidMount() {
    this.getLoans();
  }

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  render() {
    const { data, isModalOpen, form } = this.state;

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
                      <span>Suscripciones activas </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/dashBoardCustomer/loans">
                        Suscripciones activas
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
            <nav
              className="navbar navbar-expand-lg"
              color-on-scroll="500"
              data-image="../assets/img/sidebar-5.jpg"
            ></nav>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">Lista de suscripciones activas</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>Código del servicio</th>
                              <th>Fecha de inicio Suscripción</th>
                              <th>Fecha final de suscripción</th>
                              <th>Estado</th>
                              <th>Pagado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((loans) => (
                              <tr key={loans._id}>
                                <td>{loans.isbn}</td>
                                <td>{this.formatDate(loans.startDate)}</td>
                                <td>{this.formatDate(loans.endDate)}</td>
                                <td>{loans.state ? "Active" : "Inactive"}</td>
                                <td>
                                  {this.formatDate(loans.startDate) -
                                    this.formatDate(loans.endDate) >
                                  8
                                    ? "Con deuda"
                                    : "Sin deuda"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {this.state.error === true && (
                      <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                      </div>
                    )}
                  </div>
                  {/*END TABLE*/}
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

export default LoansCustomer;
