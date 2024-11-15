import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';

function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
            <div className="header">
              <NavLink to="/">
                <img src={logo} alt="Logo" className="main-logo"/>
              </NavLink>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Header;
