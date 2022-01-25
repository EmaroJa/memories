import * as api from "../api"

//Actions creators

export const getPosts = () => async (dispatch) => { //add async as we are using thunk
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data }); //instead of return
    } catch (error) {
        console.log(error.messaeg);
    }    
}


export const createPost = (post) => async (dispatch) => { //add async as we are using thunk
    try {        
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data }); //instead of return
    } catch (error) {
        console.log(error.messaeg);
    }    
}

