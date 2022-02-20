import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.tokenId;
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, user]);

    const handleLogout = () => {
        setUser(null);
        dispatch({ type: "LOGOUT" });
        navigate("./");
    }

    return (
        <AppBar className={classes.appBar} position={"static"} color={"inherit"}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to={"/"} className={classes.heading} variant={"h2"} align={"center"}>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height={60} />
            </div>
            <Toolbar className={classes.toolbar} >
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant={"h6"}>{user.result.name}</Typography>
                        <Button variant={"contained"} color={"secondary"} onClick={handleLogout} >Logout</Button>
                    </div>
                    
                ) : (
                    <Button component={Link} to={"/auth"} variant={"contained"} color={"primary"} >Sign in</Button>
                )}
            </Toolbar>                          
        </AppBar>
    );
}

export default NavBar;