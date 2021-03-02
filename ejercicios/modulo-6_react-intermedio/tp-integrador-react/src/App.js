// import './App.css';
// import React, { useState, useEffect } from 'react';
import React, { useReducer } from 'react';
import axios from 'axios';
import Persona from './components/Persona';
import Categoria from './components/Categoria';
import Libro from './components/Libro';

function App() {
  return (
    <>
      <div className='container'>
        <h1 className='app-title'>My Books</h1>
        <div className='app'>
          <Categoria />
          <Libro />
          <Persona />
        </div>
      </div>
      
    </>
  );
}

export default App;
