import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="nav-bar">
                <a 
                  href="https://www.instagram.com/vinicius_gomes92/" 
                  rel="noopener noreferrer" 
                  target="_blank" 
                  title="Instagram"
                  className="nav-bar-item"
                  >
                  <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>
                <NavLink to="/politica" className="nav-bar-item">
                  Política de Privacidade
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <div className="row">
          <div className="col-12">
              2021 VIVENDO DE OPÇÕES - TODOS OS DIREITOS RESERVADOS
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
