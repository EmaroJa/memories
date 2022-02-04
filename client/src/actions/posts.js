import * as api from "../api/index.js";

//Actions creators

export const getPosts = () => async (dispatch) => { //add async as we are using thunk
    try {
        const { data } = await api.fetchPosts();
        console.log(data);
        dispatch({ type: "FETCH_ALL", payload: data }); //Change state
    } catch (error) {
        console.log(error.messaeg);
    }    
}


export const createPost = (post) => async (dispatch) => { //add async as we are using thunk
    try {        
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data }); //Change state
    } catch (error) {
        console.log(error.messaeg);
    }    
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { updatedPost } = await api.updatePost(id, post);
        dispatch({ type: "UPDATE", paylaod: updatedPost });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: "DELETE", payload: id });
    } catch (error) {
        console.log(error);
    }
}

