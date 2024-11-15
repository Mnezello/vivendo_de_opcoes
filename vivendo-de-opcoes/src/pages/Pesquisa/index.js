import React, { useEffect } from 'react';
import SurveyForm from '../../components/SurveyForm';
import PoliticModal from '../../components/PoliticModal';
import './pesquisa.css';
import '../../responsive.css';

function Pesquisa() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className="survey-background"/>
      <div className="background-overlay"/>
      <div className="container">
        <div id="survey">
          <div className="row">
            <div className="col-12">
              <h1>PESQUISA VIVENDO DE OPÇÕES</h1>
              <SurveyForm/>
              <PoliticModal/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pesquisa;
