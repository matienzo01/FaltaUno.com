import { SET_USERNAME } from "./authTypes"

const initialState = {
    username: "",
}

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {

        case SET_USERNAME:
            return { ...state, username: payload.username }

        default:
            return state
    }
}
