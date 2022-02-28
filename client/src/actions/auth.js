
import * as api from "../api/index";

export const signup = (user, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(user);
        console.log(data);
        dispatch({ type: "AUTH", payload: data });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const signin = (user, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(user);
        dispatch({ type: "AUTH", payload: data });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};