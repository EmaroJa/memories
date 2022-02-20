import { AUTH, LOGOUT } from "../constants/actionsTypes";

const reducer = (auth = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...auth, authData: action?.data };
        default:
            return auth;
    }
}

export default reducer;