import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactPixel from 'react-facebook-pixel';
import SubscriptionForm from '../../components/SubscriptionForm';
import PoliticModal from '../../components/PoliticModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlayCircle,
  faCircle,
  faChartLine,
  faHandHoldingUsd,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Gomes from '../../assets/images/gomes.jpg';
import './listaVip.css';
import '../../responsive.css';

function ListaVip() {

  ReactPixel.init('1270841196705594', {}, { debug: false, autoConfig: true });
  
  const [formModal, setFormModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    ReactPixel.fbq('track', 'PageView');
  }, []);

  function openFormModal(){
    setFormModal(true);
  }

  function closeFormModal(){
    setFormModal(false);
  }

  return (
    <div>
      <div className="vipList-background"/>
      <div className="background-overlay"/>
      <div className="container">
        <div id="vipList">
          <div className="row">
            <div className="col-md-6 col-lg-6 d-flex justify-content-center align-items-center" >
              <div className="vipList-info">
                <h1>FAÇA PARTE DA MINHA LISTA VIP VIVENDO DE OPÇÕES</h1>
                <button onClick={openFormModal}>QUERO FAZER PARTE DA LISTA VIP</button>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 d-flex justify-content-center align-items-center">
              <img src={Gomes} alt="Vinicius Gomes" className="gomes-image"/>
            </div>
          </div> 
          <div className="row">
            <div className="col-12">
              <div className="vipList-text">
                <h2>APRENDA A TURBINAR A SUA RENTABILIDADE NO MERCADO FINANCEIRO UTILIZANDO AS OPÇÕES</h2>
              </div>
            </div>
          </div>
        </div>
        <PoliticModal/>
        <div id="vipList-activity">   
          <div className="row">
            <div className="col-12">
              <div className="vipList-activity-icons">
                <FontAwesomeIcon icon={faPlayCircle} size="5x"/>
                <div className="circles">
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-one"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-two"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-three"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-four"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-five"/>
                </div>
                <FontAwesomeIcon icon={faChartLine} size="5x"/>
                <div className="circles">
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-one"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-two"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-three"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-four"/>
                  <FontAwesomeIcon icon={faCircle} size="2x" className="circle-five"/>
                </div>
                <FontAwesomeIcon icon={faHandHoldingUsd} size="5x"/>
              </div>
            </div>
          </div>   
        </div>

        <Modal
          className="form-modal"
          overlayClassName="form-overlay"
          isOpen={formModal}
          onRequestClose={closeFormModal}
          ariaHideApp={false}
          >
          <div>
          <div className="timesForm">
            <FontAwesomeIcon icon={faTimes} size="1x" onClick={closeFormModal} className="times"/>
          </div>
            <SubscriptionForm/>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ListaVip;
