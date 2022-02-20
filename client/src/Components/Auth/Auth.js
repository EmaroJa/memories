import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Button, Avatar, Paper, Grid, Typography, Container }  from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth =  () => {
    const classes = useStyles();
    const [isSignUp, setIsSingup] = useState(false);
    const [user, setUser] = useState({ firstName: "", email: "", password: "" });
    const [showPassowrd, SetShowPassowrd] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {

    }
        
    const handleChange = (e, name) => {
        setUser((state) => ({ ...state, [name]: e.target.value }));
    }

    const handleShowPassword = () => SetShowPassowrd((previousState) => !previousState);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google auth has failed.. Pleas try again!");
    }

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? "Sign Up" : "Sign In" }</Typography>            
            <form className={classes.form} autoComplete="false" onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    {  isSignUp && (
                        <>
                            <Input name={"firstName"} type={"text"} label={"First Name"} handleChange={handleChange} autoFocus half />
                            <Input name={"firstName"} label={"First Name"} type={"text"} handleChange={handleChange} half />
                        </>
                    )} 
                    <Input name={"email"} type={"email"} label={"email"} handleChange={handleChange} />
                    <Input name={"password"} type={showPassowrd ? "text" : "password"} label={"password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                    { isSignUp && <Input name={"confirmPassword"} label={"Repeat Password"} type={"password"} handleChange={handleChange}></Input>
                    }
                </Grid>
                <Button className={classes.submit} type={"submit"} color={"primary"} variant={"contained"} fullWidth >
                    {
                        isSignUp ? "Sign Up" : "Sign In"
                    }
                </Button>
                <GoogleLogin 
                    clientId={"342048216011-urfje3sijohh51fmef8vqhko91qvnr5e.apps.googleusercontent.com"}
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color={"primary"} variant={"contained"} disabled={renderProps.disabled}startIcon={<Icon />} fullWidth onClick={renderProps.onClick} >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Button variant={"text"} color={"secondary"} size={"small"} fullWidth onClick={(e) => setIsSingup((previousIsSignUp) => !previousIsSignUp)} >
                    {
                        !isSignUp ? "Sign Up" : "Sign In"
                    }
                </Button>
            </form>
            </Paper>
        </Container>
    );
};

export default Auth;