import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64"
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import useStyles from "./styles";

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ creator: "", title: "", message: "", selectedFiled: "", tags: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
    }

    const handleChange = (e, name) => {
        if (e.target.value) setPostData((state) => ({...state, [name]: e.target.value}));
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete={"off"} noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant={"h6"}>Creating a Memory</Typography>
                <TextField name={"creator"} variant={"outlined"} label={"Creator"} fullWidth value={postData.creator} onChange={(e) => handleChange(e, "creator")} />
                <TextField name={"message"} variant={"outlined"}label={"Message"} fullWidth value={postData.message} onChange={(e) => handleChange(e, "message")} />
                <TextField name={"title"} variant={"outlined"}label={"Title"} fullWidth value={postData.title} onChange={(e) => handleChange(e, "title")} />
                <TextField name={"tags"} variant={"outlined"}label={"Tags"} fullWidth value={postData.tags} onChange={(e) => handleChange(e, "tags")} />
                <div className={classes.fileInput}> <FileBase type={"file"} multiple={false} onDone={({base64}) => setPostData((state) => ({...state, selectedFile: base64}))} /> </div>
                <Button className={classes.buttonSubmit} variant={"contained"} color={"primary"} type={"submit"} size={"large"} fullWidth>Submit</Button>
                <Button variant={"contained"} color={"secondary"} size={"small"} fullWidth onClick={() => setPostData({title:"", message:"", tags:"", creator:"", selectedFiled:""})}>Clear</Button>
            </form>

        </Paper>
    );
}
export default Form;