import { SET_LOGIN_INPUT, SET_PASSWORD, SET_REGISTER_INPUT, SET_USERNAME } from "./authTypes"

const initialState = {
    input: "login",
    username: "",
    password: "",
    token: undefined,
}

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LOGIN_INPUT:
            return { ...state, input: "login" }

        case SET_REGISTER_INPUT:
            return { ...state, input: "register" }

        case SET_USERNAME:
            return { ...state, username: payload.username }

        default:
            return state
    }
}
