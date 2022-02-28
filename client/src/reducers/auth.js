import { AUTH, LOGOUT } from "../constants/actionsTypes";

const reducer = (auth = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log("action:", action);
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
            return { ...auth, authData: action?.payload };
        case LOGOUT:
            localStorage.removeItem("profile");
            return { ...auth, authData: null };
        default:
            return auth;
    }
}

export default reducer;