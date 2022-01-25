import { combineReducers } from "redux";
import posts from "./posts";

export default combineReducers({ // combine all reducers into one object => to access them later in state object in useSelector
    // use all individual reducers that we have
    posts, // the same as posts: posts
});