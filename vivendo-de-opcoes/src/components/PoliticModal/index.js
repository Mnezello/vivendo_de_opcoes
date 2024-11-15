import { NavLink } from 'react-router-dom';
import './politicModal.css';
import '../../responsive.css';

function PoliticModal() {
  
  function closePoliticModal(){
    document.getElementById("politic-modal").style.display = "none";
  }

  return (
    <div className="politic-modal" id="politic-modal">
        <p>
            Nós utilizamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços,
            personalizar publicidade e recomendar conteúdo de seu interesse. Ao continuar navegando, ou clicar em "Prosseguir, 
            você concorda com tal monitoramento. Para mais informações, consulte a nossa Política de Privacidade cliclando <NavLink to="/politica">aqui.</NavLink>
        </p>
        <button onClick={closePoliticModal}>
            PROSSEGUIR
        </button>
    </div>
  );
}

export default PoliticModal;
