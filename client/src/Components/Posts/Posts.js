import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    // console.log(posts);
    const classes = useStyles();
    return (        
            !posts.length ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} alignItems="stretch" container spacing={3}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} key={post._id}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                    }
                </Grid>
            )        
    );
}
export default Posts;
