import { useSelector } from "react-redux"

const Filter = ({ onclick, onChangeValue, onChangeRadio }) => {

    const filterValue = useSelector(state => state.filter.filterValue);

    return <form>
        <div>
            <label>Filtro</label>
        </div>
        <input type="text" placeholder="Ingrese el campo que desea" value={filterValue} onChange={onChangeValue} />
        <div >
            <label>
                <input readOnly type="radio" value="lugar" name="type" onClick={onChangeRadio} />
                Estadio
            </label>
            <label>
                <input readOnly type="radio" value="equipo" name="type" onClick={onChangeRadio} />
                Equipo
            </label>
            <label>
                <input readOnly type="radio" value="puesto" name="type" onClick={onChangeRadio} />
                Posicion
            </label>
        </div>

        <button onClick={onclick}>Filtrar</button>
    </form>
}

export default Filter