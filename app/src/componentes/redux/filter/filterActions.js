import { SET_FILTER_VALUE, SET_FILTER_TYPE } from "./filterTypes"

export const setFilterValue = (payload) => ({
    type: SET_FILTER_VALUE,
    payload
})

export const setFilterType = (payload) => ({
    type: SET_FILTER_TYPE,
    payload
})
