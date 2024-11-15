import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from '../../components/Loader';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { 
  Check2Circle,
  ExclamationCircle
} from 'react-bootstrap-icons';
import TestimonyEx1 from '../../assets/images/testemunho1.jpeg';
import TestimonyEx2 from '../../assets/images/testemunho2.jpeg';
import './testimonyForm.css';
import '../../responsive.css';

function TestimonyForm() {

  //Fields, errors
  const [inputs,setInputs] = useState({
    name:"", 
    email:"", 
    testimony:"",
    authorization: false
  });
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
    const errors = {};
    //name errors
    if (!inputs.name) {
      errors.name = "Digite seu nome";
    } 
    if(inputs.name !== ""){
      if(!inputs.name.match(/^[A-Za-z -]+$/i)){
        errors.name = "Digite somente letras";
      }      
    }
    //Email errors
    if (!inputs.email) {
      errors.email = "Digite seu e-mail";
    } 
    if(inputs.email !== "") {
      if(!inputs.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/)){
        errors.email = "Digite um email válido";
      }      
    }
    //Testimony errors
    if (!inputs.testimony) {
      errors.testimony = "Digite seu testemunho";
    } 
    if(inputs.testimony !== ""){
      if(!inputs.testimony.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.testimony = "Digite somente letras e pontuação";
      }      
    }
    //Authorization
    if(inputs.authorization === false){
      errors.authorization = "Para prosseguir marque a autorização";
    }
    return errors;
  }

  function handleReset(){
    setInputs({
      name:"", 
      email:"", 
      testimony:"",
      authorization: false
    });
    document.getElementById("authorization").checked = false;
  }

  function handleSend(){
    document.getElementById("testimony-submit").disabled = true;
    document.getElementById("testimony-submit").style.opacity = "0.5";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
		setErrors(validationErrors);
    openLoaderModal();
    if(noErrors){
      emailjs.sendForm("service_lhukss5", "template_jt1y8f8", event.target, "user_NfOkrbP6PolrHIefPnbbg")
      .then(() => {
        closeLoaderModal();
        openConfirmModal()
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
            <div className="testimony-text">
              <h2>Muito obrigado por responder essa pesquisa!</h2>
              <p>Mas eu quero te pedir uma ajuda <b>100% opcional.</b> Eu vou lançar meu curso de opções. Porém como nunca lancei eu ainda não tenho testemunhos sobre o meu produto</p>
              <p>Mas sei que você consome o meu produto então eu quero que você seja brutalmente honesto pois preservo minha integridade e a sua também</p>
              <div className="testimony-examples">
                <img src={TestimonyEx1} alt="Exemplo de testemunho" className="testimony-image"/>
                <img src={TestimonyEx2} alt="Exemplo de testemunho" className="testimony-image"/>
              </div>
            </div>
            <form className="testimony-form" onSubmit={handleSubmit}>
              <input 
                className="testimony-input" 
                name="name" 
                type="text" 
                placeholder="Digite seu nome aqui" 
                maxLength="30" 
                value={inputs.name} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
              />
              {errors.name && <span>{errors.name}</span>}
              <input 
                className="testimony-input" 
                name="email" 
                type="text" 
                placeholder="Digite seu e-mail" 
                maxLength="30" 
                value={inputs.email} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
              />
              {errors.email && <span>{errors.email}</span>}
              <textarea 
                className="testimony-textarea" 
                name="testimony" 
                placeholder="Digite seu testemunho" 
                maxLength="600" value={inputs.testimony} 
                onChange={handleInputChange} 
                onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
              />
              {errors.testimony && <span>{errors.testimony}</span>}
              <div className="testimony-authorization">
                <div className="testimony-container">
                  <input 
                    type="checkbox" 
                    id="authorization" 
                    name="authorization" 
                    value={inputs.authorization} 
                    onChange={handleInputChange} 
                    onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                  />
                  <label htmlFor="authorization" className="authorization-label">
                    Autorizo Vivendo de Opções a utilizar meu testemunho em campanhas de marketing e propaganda conforme a Política de Privacidade.
                  </label>
                </div>
                {errors.authorization && <span>{errors.authorization}</span>}
              </div>
              <input className="testimony-submit" type="submit" id="testimony-submit" value="COLETOR DE TESTEMUNHOS"/>
            </form>
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
        <div className="testimony-confirm">
          <Check2Circle size={50}/>
          <h1>Obrigado pelo seu Testemunho!</h1>
          <h2>Sua opinião é importante para nós, assim podemos melhorar sempre</h2>
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
        <div className="testimony-deny">
          <ExclamationCircle size={50}/>
          <h1>Desculpe, seu testemunho não foi enviado</h1>
          <h2>Verifique sua conexão com a internet e tente novamente mais tarde</h2>
        </div>
      </Modal>
    </div>
  );
}

export default TestimonyForm;
