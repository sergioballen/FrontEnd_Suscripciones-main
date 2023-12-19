import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
import { Alert } from "react-bootstrap";
class ListBook extends React.Component {
  state = {
    data: [],
    isModalOpen: false,
    selectedBook: null,
    error: false,
    errorMsg: "Error",
    form: {
      ISBN: "",
      name: "",
      author: "",
      genre: "",
      copies: "",
      publication: "",
      fine: "",
    },
  };

  bookSelected = (book) => {
    this.setState({
      form: {
        id: book._id,
        ISBN: book.ISBN,
        name: book.name,
        author: book.author,
        name: book.name,
        genre: book.genre,
        copies: book.copies,
        publication: book.publication,
        fine: book.fine,
      },
    });
  };
  getBooks = () => {
    let url = ApiUrl + "dashBoard/bookManagement";
    axios.get(url).then((response) => {
      this.setState({ data: response.data.books });
    });
  };

  openModal = (book) => {
    this.bookSelected(book);
    this.setState({
      isModalOpen: true,
      selectedBook: book,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedBook: null,
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
  deleteBook = (isbn) => {
    let url = ApiUrl + "dashBoard/booksManagement/delete/" + isbn;
    axios.delete(url).then((response) => {
      this.setState((prevState) => ({
        data: prevState.data.filter((book) => book.ISBN !== isbn),
        error: true,
        errorMsg: "Suscripcion borrada satisfactoriamente",
      }));
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
      this.getBooks();
    });
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      _id: this.state.form.id,
      name: this.state.form.name,
      author: this.state.form.author,
      genre: this.state.form.genre,
      copies: this.state.form.copies,
      publication: this.state.form.publication,
      fine: this.state.form.fine,
    };
    let url = ApiUrl + "dashBoard/bookManagement/edit";
    fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Book updated successfully") {
          this.setState({
            error: true,
            errorMsg: "Suscripcion actualizada satisfactoriamente",
          });
          this.closeModal();
          this.getBooks();
        } else if (data.error === "Error updating book") {
          this.setState({
            error: true,
            errorMsg: "Error actualizando suscripcion",
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

  componentDidMount() {
    this.getBooks();
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
                          Lista de Ssucripciones
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoardEmployee/createBook"
                        >
                          Añadir Suscripcion
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
                        <span>Suscripciones Activas</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoardEmployee/loanManagement"
                        >
                          Lista de Ssucripciones Activas
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoardEmployee/addLoan"
                        >
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
                        <span>Cerra Sesión</span>
                      </Dropdown.Toggle>
                    </Dropdown>
                  </li>
                </ul>
              )}
              {rol === "admin" && (
                <ul className="nav">
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
                          BLista de Suscripciones
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/createBook">
                          Añadir suscripcion
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
                          Lista de Vendedores
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                          Añadir Vendedor
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
                </ul>
              )}
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
                        <h4 className="card-title">Books</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>Código</th>
                              <th>Nombre</th>
                              <th>Proveedor</th>
                              <th>Tipo de servicio</th>
                              <th>Cantidad en Stock</th>
                              <th>Fecha de salida del servicio</th>
                              <th>Valor Interés de mora diario</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((book) => (
                              <tr key={book._id}>
                                <td>{book.ISBN}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.copies}</td>
                                <td>{this.formatDate(book.publication)}</td>
                                <td>${book.fine}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteBook(book._id)}
                                  >
                                    Borrar
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => this.openModal(book)}
                                  >
                                    Editar
                                  </button>
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
                  <Modal show={isModalOpen} onHide={this.closeModal}>
                    <ModalHeader closeButton>Editar Ssucripcion</ModalHeader>
                    <ModalBody>
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title">Editar Suscripcion</h4>
                        </div>
                        <div className="card-body">
                          <form>
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="PATCH"
                            />
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Código</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Code"
                                    name="ISBN"
                                    id="ISBN1"
                                    readOnly
                                    onChange={this.manejarChange}
                                    defaultValue={form.ISBN}
                                  />
                                </div>
                              </div>
                              <div className="col-md-8 pl-1">
                                <div className="form-group">
                                  <label>Nombre</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    onChange={this.manejarChange}
                                    defaultValue={form.name}
                                    id="name1"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-8 pr-1">
                                <div className="form-group">
                                  <label>Proveedor</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    id="author1"
                                    onChange={this.manejarChange}
                                    defaultValue={form.author}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Tipo de Servicio</label>
                                  <input
                                    id="genre1"
                                    type="text"
                                    className="form-control"
                                    name="genre"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.genre}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4 pr-1">
                                <div className="form-group">
                                  <label>Cantidad de Stock</label>
                                  <input
                                    id="copies1"
                                    type="number"
                                    className="form-control"
                                    name="copies"
                                    onChange={this.manejarChange}
                                    defaultValue={form.copies}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Fecha de Salida del servicio</label>
                                  <input
                                    id="date1"
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    required
                                    onChange={this.manejarChange}
                                    defaultValue={form.date}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 pl-1">
                                <div className="form-group">
                                  <label>Vaor Interés mora diario</label>
                                  <input
                                    id="fine1"
                                    type="text"
                                    className="form-control"
                                    name="fine"
                                    onChange={this.manejarChange}
                                    defaultValue={form.fine}
                                  />
                                </div>
                              </div>
                              <div
                                className="col-md-4 pl-1"
                                style={{ display: "none" }}
                              >
                                <div className="form-group">
                                  <label>id</label>
                                  <input
                                    id="id"
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    onChange={this.manejarChange}
                                    defaultValue={form.id}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.closeModal}
                              >
                                Cerrar
                              </button>
                              <button
                                class="btn btn-primary"
                                onClick={this.sendData}
                              >
                                Guardar cambios
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
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

export default ListBook;
