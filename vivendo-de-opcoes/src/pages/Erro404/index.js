import { NavLink } from 'react-router-dom';
import './erro404.css';
import '../../responsive.css';

function Error404() {
  return (
    <div className="error-404">
      <h1>404</h1>
      <h3>
        Desculpe, a página que você estava tentando acessar não foi encontrada
      </h3>
      <h3>
        Acesse: <NavLink to="/">www.vivendodeopcoes.com.br</NavLink>
      </h3>
    </div>
  );
}

export default Error404;
