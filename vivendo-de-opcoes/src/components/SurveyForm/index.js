import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from '../../components/Loader';
import emailjs from 'emailjs-com';
import BackToTop from '../../components/BackToTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircle } from 'react-bootstrap-icons';
import TestimonyForm from '../TestimonyForm';
import './surveyForm.css';
import '../../responsive.css';

function SurveyForm() {

  //Fields, errors
  const [inputs,setInputs] = useState({
    idade: "",
    sexo: "",
    profissao: "",
    renda: "",
    capital: "",
    opcoes: "",
    desafio: "",
    produto: "",
    beneficios: ""
  });
  const [errors, setErrors] = useState({});

  //Loader modal, Send survey modal, deny modal
  const [loaderModal, setLoaderModal] = useState(false);
  const [sendSurvey, setSendSurvey] = useState(false);
  const [denyModal, setDenyModal] = useState(false);

  function openLoaderModal(){
    setLoaderModal(true);
  }

  function openSendSurvey(){
    setSendSurvey(true);
  }

  function openDenyModal(){
    setDenyModal(true);
  }

  function closeLoaderModal(){
    setLoaderModal(false);
  }

  function closeSendSurvey(){
    setSendSurvey(false);
  }

  function closeDenyModal(){
    setDenyModal(false);
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const validate = (inputs) => {
    //idade errors
    const errors = {};
    if(inputs.idade !== ""){
      if(!inputs.idade.match(/([0-9])\w+/i)){
        errors.idade = "Digite uma idade válida, como 23";
      }
    }
    //sexo
    if(!inputs.sexo){
      errors.sexo = "Selecione o sexo";
    }  
    //profissao
    if(inputs.profissao !== ""){
      if(!inputs.profissao.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.profissao = "Insira somente letras e pontuação";
      }      
    }
    //renda
    if(inputs.renda !== ""){
      if(!inputs.renda.match(/([0-9])\w+/i)){
        errors.renda = "Digite um valor inteiro válido, como 2000";
      } 
    }
    //capital
    if(inputs.capital !== ""){
      if(!inputs.capital.match(/([0-9])\w+/i)){
        errors.capital = "Digite um valor inteiro válido, como 1000";
      } 
    }
    //opcoes
    if(!inputs.opcoes){
      errors.opcoes = "Selecione a resposta";
    }  
    //desafio
    if(inputs.desafio !== ""){
      if(!inputs.desafio.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.desafio = "Insira somente letras e pontuação";
      }      
    }
    //produto
    if(inputs.produto !== ""){
      if(!inputs.produto.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.produto = "Insira somente letras e pontuação";
      }      
    }
    //beneficios
    if(inputs.beneficios !== ""){
      if(!inputs.beneficios.match(/^[A-Za-z ,.':;-]+$/i)){
        errors.beneficios = "Insira somente letras e pontuação";
      }      
    }
    return errors;
  }

  function handleReset(){
    setInputs({
      idade: "",
      sexo: "",
      profissao: "",
      renda: "",
      capital: "",
      opcoes: "",
      desafio: "",
      produto: "",
      beneficios: ""
    });
  }

  function handleSend(){
    document.getElementById("survey-submit").disabled = true;
    document.getElementById("survey-submit").style.opacity = "0.5";
  }

	const handleSubmit = (event) => {
		event.preventDefault();
    const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
		setErrors(validationErrors);
    openLoaderModal();
    if(noErrors){
      emailjs.sendForm("service_lhukss5", "template_8fmr1ge", event.target, "user_NfOkrbP6PolrHIefPnbbg")
      .then(() => {
        closeLoaderModal();
        openSendSurvey();
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
      <div className="container pt-3 pb-5">
        <div className='row'>
          <div className="col-12 d-flex justify-content-center">
            <form className="survey-form" onSubmit={handleSubmit}>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="idade">Idade</label>
                <input 
                  className="survey-input" 
                  name="idade" 
                  type="text" 
                  id="idade" 
                  placeholder="18" 
                  maxLength="2" 
                  value={inputs.idade} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.idade && <span>{errors.idade}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="sexo">Sexo</label>
                <select 
                  className="survey-input" 
                  name="sexo" id="sexo" 
                  value={inputs.sexo} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                  >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {errors.sexo && <span>{errors.sexo}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="profissao">Profissão</label>
                <input 
                  className="survey-input"
                  name="profissao"
                  type="text" 
                  id="profissao" 
                  placeholder="Sua profissão..." 
                  maxLength="30" 
                  value={inputs.profissao} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.profissao && <span>{errors.profissao}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="renda">Renda Média</label>
                <input 
                  className="survey-input" 
                  name="renda" 
                  type="text" 
                  id="renda" 
                  placeholder="1000" 
                  maxLength="12" 
                  value={inputs.renda} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.renda && <span>{errors.renda}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="capital">Capital para investir</label>
                <input 
                  className="survey-input" 
                  name="capital" 
                  type="text" 
                  id="capital" 
                  placeholder="1000" 
                  maxLength="12" 
                  value={inputs.capital} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.capital && <span>{errors.capital}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="opcoes">Você já tentou operar opções?</label>
                <select 
                  className="survey-input" 
                  name="opcoes" 
                  id="opcoes" 
                  value={inputs.opcoes} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                  >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {errors.opcoes && <span>{errors.opcoes}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="desafio">Qual o maior desafio para operar opções?</label>
                <input 
                  className="survey-input" 
                  name="desafio" 
                  type="text" 
                  id="desafio" 
                  placeholder="O maior desafio é..." 
                  maxLength="100" 
                  value={inputs.desafio} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.desafio && <span>{errors.desafio}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="produto">Se você viver de mercado, o que não poderia faltar nesse produto ou serviço?</label>
                <input 
                  className="survey-input" 
                  name="produto" 
                  type="text" 
                  id="produto" 
                  placeholder="Não poderia faltar..." 
                  maxLength="60" 
                  value={inputs.produto} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.produto && <span>{errors.produto}</span>}
              </div>
              <div className="survey-form-item">
                <label className="survey-label" htmlFor="befeficios">Quais são os benefícios que o Viver de Opções deve ter?</label>
                <input 
                  className="survey-input" 
                  name="beneficios" 
                  type="text" 
                  id="beneficios" 
                  placeholder="Os benefícios devem ser..." 
                  maxLength="100" 
                  value={inputs.beneficios} 
                  onChange={handleInputChange} 
                  onKeyPress={(e) => {e.key==='Enter' && e.preventDefault()}}
                />
                {errors.beneficios && <span>{errors.beneficios}</span>}
              </div>
              <input className="survey-submit" type="submit" id="survey-submit" value="COLETOR DE TESTEMUNHOS"/>
            </form>
            <BackToTop/>
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
        isOpen={sendSurvey}
        onRequestClose={closeSendSurvey}
        ariaHideApp={false}
        preventScroll={false}
        >
        <div className="timesForm">
          <FontAwesomeIcon icon={faTimes} size="1x" onClick={closeSendSurvey} className="times"/>
        </div>
        <div className="survey-confirm">
          <TestimonyForm/>
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
        <div className="survey-deny">
          <ExclamationCircle size={50}/>
          <h1>Desculpe, sua pesqusia não foi enviada</h1>
          <h2>Verifique sua conexão com a internet e tente novamente mais tarde</h2>
        </div>
      </Modal>
    </div>
  );
}

export default SurveyForm;
