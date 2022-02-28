import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Button, Avatar, Paper, Grid, Typography, Container }  from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";

const Auth =  () => {
    const classes = useStyles();
    const [isSignUp, setIsSingup] = useState(false);
    const [user, setUser] = useState({ email: "", password: ""});
    const [showPassowrd, SetShowPassowrd] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(isSignUp ? signup(user, navigate) : signin(user, navigate));        
    }
        
    const handleChange = (e) => {
        setUser(({ ...user, [e.target.name]: e.target.value }));
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

    const changeMode = () => {
        let SignupMode;
        setIsSingup((previousIsSignUp) => {
            SignupMode = !previousIsSignUp;
            return !previousIsSignUp
        });
        if (SignupMode === "true") setUser({ firstName: "", lastName: "", email: "", password: "", confirmedPassword: "" });
        else setUser({ email: "", password: "" });
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
                            <Input name={"firstName"} label={"First Name"} type={"text"} handleChange={handleChange} autoFocus half />
                            <Input name={"lastName"} label={"Last Name"} type={"text"} handleChange={handleChange} half />
                        </>
                    )} 
                    <Input name={"email"} type={"email"} label={"email"} handleChange={handleChange} />
                    <Input name={"password"} type={showPassowrd ? "text" : "password"} label={"password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                    { isSignUp && <Input name={"confirmedPassword"} label={"Repeat Password"} type={"password"} handleChange={handleChange}></Input>
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
                        <Button className={classes.googleButton} color={"primary"} variant={"contained"} disabled={renderProps.disabled} startIcon={<Icon />} fullWidth onClick={renderProps.onClick} >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Button variant={"text"} color={"secondary"} size={"small"} fullWidth onClick={changeMode} >
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