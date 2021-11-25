import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: .5rem;
    border: 1px solid #bdbbbb;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    padding: .8rem;
    background-color: #00838f;
    border: none;
    color: white;
    width: 100%;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color .3s ease-in-out;
    &:hover{
        cursor: pointer;
        background-color: #00b7c8;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 1rem;
    max-width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [ error, guardarError] = useState(false);

    //extraer los valores
    const {marca, year, plan} = datos;
    
    //obtener los datos del formulario y guardarlos en el state
    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    //enviar formulario
    const cotizarSeguro = e => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //obtener la diferencia de aÑos
        let resultado = 2000;
        const diferencia = obtenerDiferenciaYear(year);

        //por cada año hay que restar 3%
        resultado-= ((diferencia*3) * resultado)/10;

        //americano 15% - asiatico 5% - europeo 30%
        resultado = calcularMarca(marca) * resultado;

        //basico 20% - completo 50%
        resultado = parseFloat( obtenerPlan(plan) * resultado ).toFixed(2);

        //cargar spinner
        guardarCargando(true);

        setTimeout(() => {

            //elimina spinner
            guardarCargando(false);

            //carga la cotizacion
            guardarResumen({
                cotizaciones: Number(resultado),
                datos
            })

        }, 1500);
    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >      
            { error ? <Error>Todos los campos son obligatorios</Error> : null} 

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>                
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>                
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Button type="submit">Cotizar</Button>
        </form>
     );
}
Formulario.propTypes = {
    guardarCargando: PropType.func.isRequired,
    guardarResumen: PropType.func.isRequired
}
export default Formulario;