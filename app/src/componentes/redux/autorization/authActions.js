import { SET_LOGIN_INPUT, SET_REGISTER_INPUT } from "./authTypes"

export const setLoginInput = (payload) => ({
    type: SET_LOGIN_INPUT,
    payload
})

export const setRegisterInput = (payload) => ({
    type: SET_REGISTER_INPUT,
    payload
})

