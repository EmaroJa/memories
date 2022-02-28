import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React from "react";

const Input = ({ name, label, type, half, handleShowPassword, handleChange }) => (
    <Grid item xs={12} sm={half ? 6 : 12} >
        <TextField 
            name={name}
            label={label}
            onChange={handleChange}
            variant={"outlined"}
            required
            fullWidth
            type={type}
            InputProps={ name === "password" ? {
                endadorment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} >
                            { type === "password" ? <Visibility /> : < VisibilityOff /> }
                        </IconButton>                
                    </InputAdornment>
                ),
            } : null }
        />
    </Grid>
);

export default Input;