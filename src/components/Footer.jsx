import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <nav>
              <ul className="footer-menu">
                <li>
                  <a href="#">Ingrith Yiseth Rodriguez Lopez</a>
                </li>
                <li>
                  <a href="#">Sergio Mauricio Ballen Sedano</a>
                </li>
                <li>
                  <a href="#">Ronaldo Perez Diaz</a>
                </li>
              </ul>
              <p className="copyright text-center">
                ©<a>Universidad Pedagógica y Tecnológica de Colombia</a>
              </p>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
