import { SET_FILTER_TYPE, SET_FILTER_VALUE } from "./filterTypes"

const initialState = { filterValue: '', filterField: '' }

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_FILTER_VALUE:
            return { ...state, filterValue: payload }

        case SET_FILTER_TYPE:
            return { ...state, filterField: payload }
        default:
            return state
    }
}

export default reducer