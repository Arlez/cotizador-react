import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';

const Parrafo = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const ResultadoCotizacion =styled.div`
    text-align: center;
    padding: .5rem;
    border: 1px solid #26c6da;
    background-color: rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const ParrafoCotizacion = styled.p`
    color: #00838f;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0;
`;
const Resultado = ({cotizaciones}) => {
    return ( 
        (cotizaciones === 0) 
        ? <Parrafo>Elige marca, año y tipo de seguro</Parrafo> 
        :   <ResultadoCotizacion>
                <ParrafoCotizacion>Valor Cotización: ${cotizaciones}</ParrafoCotizacion>
            </ResultadoCotizacion>
    )
}
 
Resultado.propTypes = {
    cotizaciones: PropType.number.isRequired
}

export default Resultado;