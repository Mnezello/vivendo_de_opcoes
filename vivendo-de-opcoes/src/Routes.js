import { Route, Switch, BrowserRouter  as Router } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import ListaVip from '../src/pages/ListaVip';
import Pesquisa from '../src/pages/Pesquisa';
import PoliticaPrivacidade from '../src/pages/PoliticaPrivacidade';
import Erro404 from '../src/pages/Erro404';

function Routes () {
  return (
    <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={ListaVip} />
            <Route exact path="/pesquisa" component={Pesquisa} />
            <Route exact path="/politica" component={PoliticaPrivacidade} />
            <Route path="*" component={Erro404} />
        </Switch>
        <Footer />
    </Router>
  );
}

export default Routes;
