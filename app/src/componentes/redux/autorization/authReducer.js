import { SET_LOGIN_INPUT, SET_REGISTER_INPUT } from "./authTypes"

const initialState = {
    token: undefined,
    input: "login"
}

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LOGIN_INPUT:
            return { ...state, input: "login" }

        case SET_REGISTER_INPUT:
            return { ...state, input: "Register" }

        default:
            return state
    }
}
