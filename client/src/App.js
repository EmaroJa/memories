import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
// import useStyles from "./styles";

const App = () => (
    <BrowserRouter>
        <Container maxWidth={"lg"}>
            <NavBar />
            <Routes>
                <Route path={"/"} exact element={<Home />} />
                <Route path={"/auth"} exact element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>
);

export default App;