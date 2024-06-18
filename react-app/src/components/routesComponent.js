import React, { Component } from "react";
import {Routes, Route} from "react-router-dom";
import * as ROUTES from "../constants/routePaths";
import HomePage from "../pages/homePage";



class RoutesComponent extends Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={ROUTES.HOME_PAGE} element={<HomePage/>} />
                </Routes>
            </div>
        );
    }
}

export default RoutesComponent;