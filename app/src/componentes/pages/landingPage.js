import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { setFilterValue, setFilterType } from "../redux/filter/filterActions"

import Propuesta from "../components/propuesta";
import Filter from "../components/filter"

const LandingPage = () => {

    const [propuestas, setPropuestas] = useState([]);
    const [filterPropuestas, setFilterPropuestas] = useState([]);
    const filterStatus = useSelector(state => state.filter)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("http://localhost:3001/api/propuestas/")
            .then((response) => {
                setPropuestas(response.data);
                setFilterPropuestas(response.data);
            })
    }, []);

    const handleFilter = (event) => {
        event.preventDefault();
        const field = filterStatus.filterField;
        const value = filterStatus.filterValue;

        const propuestasFiltradas = propuestas.filter(propuesta => {
            if (!value) return true
            let auxFields = Object.keys(propuesta);
            let auxValues = Object.values(propuesta);
            let posicion = auxFields.indexOf(field);
            return auxValues[posicion] === value
        })

        setFilterPropuestas(propuestasFiltradas)
    }

    const handleChangeValue = (event) => {
        dispatch(setFilterValue(event.target.value));
    }

    const handleChangeField = (event) => {
        dispatch(setFilterType(event.target.value))
    }


    return (
        <div>
            <Filter onclick={handleFilter} onChangeValue={handleChangeValue} onChangeRadio={handleChangeField} />
            {filterPropuestas.map(propuesta => <Propuesta key={propuesta.id} equipo={propuesta.equipo} puesto={propuesta.puesto} lugar={propuesta.lugar} horario={propuesta.dia} id={propuesta.id} />)}
        </div>
    )
}

export default LandingPage