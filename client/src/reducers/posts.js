// reducers are ment to update app states
const reducer = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...posts, action.payload];
        default: 
            return posts;

    }
}

export default reducer;