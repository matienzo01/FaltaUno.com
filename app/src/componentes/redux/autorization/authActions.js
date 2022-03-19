import { SET_LOGIN_INPUT, SET_REGISTER_INPUT, SET_USERNAME } from "./authTypes"

export const setLoginInput = (payload) => ({
    type: SET_LOGIN_INPUT,
    payload
})

export const setRegisterInput = (payload) => ({
    type: SET_REGISTER_INPUT,
    payload
})

export const setUsername = (payload) => ({
    type: SET_USERNAME,
    payload
})

