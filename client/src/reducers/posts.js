// reducers are ment to update app states
const reducer = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...posts, action.payload];
        case "UPDATE":
            return posts.map((post) => action.payload._id === post._id ? action.payload : post);
        default: 
            return posts;
    }
}

export default reducer;