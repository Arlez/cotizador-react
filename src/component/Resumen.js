import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import { capitalizarTexto } from '../helper';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: white;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    const {marca, year, plan} = datos;

    if(marca === '' || year === '' || plan === '') return null;

    return (     
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {capitalizarTexto(marca)}</li>
                <li>Año: {year}</li>
                <li>Plan: {capitalizarTexto(plan)}</li>
            </ul>
        </ContenedorResumen>   
     );
}

Resumen.propTypes = {
    datos: PropType.object.isRequired
}
export default Resumen;