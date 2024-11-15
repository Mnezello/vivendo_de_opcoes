import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from '../../components/Loader';
import emailjs from 'emailjs-com';
import ReactPixel from 'react-facebook-pixel';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserLock,
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { 
  Check2Circle,
  ExclamationCircle
} from 'react-bootstrap-icons';
import './subscriptionForm.css';
import '../../responsive.css';

function SubscriptionForm() {

  ReactPixel.init('1270841196705594', {}, { debug: false, autoConfig: true });

  //Fields, errors
  const [inputs,setInputs] = useState({name:"", email:"", whatsApp:"", clearance: false});
  const [errors, setErrors] = useState({});
 
  //Loader modal, confirm modal, deny modal
  const [loaderModal, setLoaderModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [denyModal, setDenyModal] = useState(false);

  function openLoaderModal(){
    setLoaderModal(true);
  }

  function openConfirmModal(){
    setConfirmModal(true);
  }

  function openDenyModal(){
    setDenyModal(true);
  }

  function closeLoaderModal(){
    setLoaderModal(false);
  }

  function closeConfirmModal(){
    setConfirmModal(false);
  }

  function closeDenyModal(){
    setDenyModal(false);
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    if(event.target.type === "checkbox"){
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.checked}));
    }
  }

  const validate = (inputs) => {
    //Name errors
    const errors = {};
    if (!inputs.name) {
      errors.name = "Digite o seu nome completo";
    } 
    if(inputs.name !== "") {
      if(!inputs.name.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.name = "Digite um nome válido";
      }      
    }
    //Email errors
    if (!inputs.email) {
      errors.email = "O e-mail é obrigatório";
    } 
    if(inputs.email !== "") {
      if(!inputs.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/)){
        errors.email = "Digite um email válido";
      }      
    }
    //WhatsApp
    if(inputs.whatsApp !== ""){
      if(!inputs.whatsApp.match(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/i)){
        errors.whatsApp = "Insira um contato válido como 55 99999-9999";
      }      
    }  
    //Clearance
    if(inputs.clearance === false){
      errors.clearance = "Para prosseguir marque a autorização";
    }
    return errors;
  }

  function handleReset(){
    setInputs({name:"", email:"", whatsApp:"", clearance: false});
    document.getElementById("clearance").checked = false;
  }

  function handleSend(){
    document.getElementById("subscription-submit").disabled = true;
    document.getElementById("subscription-submit").style.opacity = "0.5";
  }

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
		setErrors(validationErrors);
    openLoaderModal();
		if(noErrors){
      emailjs.sendForm("service_kvakadm", "template_7ieajoe", event.target, "user_0Hv6ujxR134eSXfpX0YAx")
      .then(() => {
        closeLoaderModal();
        openConfirmModal();
        ReactPixel.fbq('track', 'Lead');
        handleReset();
        handleSend();
      }, (error) => {
        closeLoaderModal();
        openDenyModal();
        console.log(error.text);
      });
		}else{
      closeLoaderModal();
		}
	}

  return (
    <div>
      <div className="container">
        <div className='row'>
          <div className="col-12">
            <form className="subscription-form" onSubmit={handleSubmit}>
              <input 
                className="subscription-input" 
                name="name" 
                type="text" 
                placeholder="Seu nome completo" 
                maxLength="60" 
                value={inputs.name} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault();}}
              />
              {errors.name && <span>{errors.name}</span>}
              <input 
                className="subscription-input" 
                name="email" 
                type="text" 
                placeholder="Seu melhor e-mail" 
                maxLength="30" 
                value={inputs.email} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault();}}
              />
              {errors.email && <span>{errors.email}</span>}
              <input 
                className="subscription-input" 
                name="whatsApp" 
                type="tel" 
                placeholder="WhatsApp 99 99999-9999" 
                maxLength="13" 
                value={inputs.whatsApp} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault();}}
              />
              {errors.whatsApp && <span>{errors.whatsApp}</span>}
              <div className="subscription-clearance">
                <div className="subscription-container">
                  <input type="checkbox" id="clearance" name="clearance" value={inputs.clearance} onChange={handleInputChange} onKeyPress={(e) => {e.key==='Enter' && e.preventDefault();}}/>
                  <label htmlFor="clearance" className="subscription-label">
                    De acordo com as Leis 12.965/2014 e 13.709/2018, que regulam o uso da Internet e o tratamento de dados pessoais no Brasil, 
                    autorizo Vivendo de Opções a enviar notificações por e-mail ou outros meios e concordo com sua Política de Privacidade.
                  </label>
                </div>
                {errors.clearance && <span>{errors.clearance}</span>}
              </div>
              <input 
                className="subscription-submit" 
                type="submit" 
                id="subscription-submit" 
                value="QUERO FAZER PARTE DA LISTA VIP"
              />  
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="subscription-warning">
              <FontAwesomeIcon icon={faUserLock} size="1x" />
              <p>
                É nesse endereço de e-mail que serão enviadas todas as nossas comunicações, suas informações estão seguras conforme nossa <NavLink to="/politica">Política de Privacidade.</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="loader-modal"
        overlayClassName="form-overlay"
        isOpen={loaderModal}
        onRequestClose={closeLoaderModal}
        ariaHideApp={false}
        >
        <Loader/>
      </Modal>

      <Modal
        className="form-modal"
        overlayClassName="form-overlay"
        isOpen={confirmModal}
        onRequestClose={closeConfirmModal}
        ariaHideApp={false}
       
        >
        <div className="timesForm">
          <FontAwesomeIcon icon={faTimes} size="1x" onClick={closeConfirmModal} className="times"/>
        </div>
        <div className="subscription-confirm">
          <Check2Circle size={50}/>
          <h1>Contato enviado com sucesso!</h1>
          <h2>Enviamos um e-mail confirmando seu contato, cheque sua caixa de entrada ou lixo eletrônico</h2>
        </div>
      </Modal>

      <Modal
        className="form-modal"
        overlayClassName="form-overlay"
        isOpen={denyModal}
        onRequestClose={closeDenyModal}
        ariaHideApp={false}
        >
        <div className="timesForm">
          <FontAwesomeIcon icon={faTimes} size="1x" onClick={closeDenyModal} className="times"/>
        </div>
        <div className="subscription-deny">
          <ExclamationCircle size={50}/>
          <h1>Desculpe, seu contato não foi enviado</h1>
          <h2>Verifique sua conexão com a internet e tente novamente mais tarde</h2>
        </div>
      </Modal>
    </div>
  );
}

export default SubscriptionForm;
