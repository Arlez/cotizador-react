import React, { useState } from "react";
import Header from './component/Header';
import Formulario from './component/Formulario';
import Resumen from './component/Resumen';
import Resultado from './component/Resultado';
import Spinner from './component/Spinner';
import styled from "@emotion/styled";

const Contenedor = styled.div`
    max-width: 992px;
    margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #e1e1e1;
  padding: 3rem;
`;

function App() {

  const [ resumen, guardarResumen] = useState({
    cotizaciones: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const [cargando, guardarCargando] = useState(false);

  const {cotizaciones, datos} = resumen;

  return (
    <Contenedor>
      <Header
        titulo='Cotizador de Seguros'
      />
      <ContenedorFormulario>
        <Formulario
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />

        <Resumen datos={datos}/>
        
        { cargando ? <Spinner/> : null }

        {
          !cargando 
          ? <Resultado
            cotizaciones={cotizaciones}
          /> 
          : null 
        }
    
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
