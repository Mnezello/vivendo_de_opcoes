import React, { useEffect } from 'react';
import Routes from './Routes';
import LoadingPage from './components/LoadingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  useEffect(() => {
    const loader = document.querySelector(".loading-page");
    loader.classList.add("loading-hide");
  },[]);

  return (
    <div className="App">
      <LoadingPage/>
      <Routes/>
    </div>
  );
}

export default App;
