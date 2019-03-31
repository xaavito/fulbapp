
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Confirmacion from './Confirmacion/Confirmacion'
import CrearPartido from './CrearPartido/CrearPartido'
import Asistencia from './Asistencia/Asistencia'

class Main extends Component {

    render() {
        /*
        var http = require("http");
        setInterval(function () {
            http.get("https://fulbapp-cli.herokuapp.com/");
        }, 300000); // every 5 minutes (300000)
        */    
        return (
            <BrowserRouter>
                <Switch>
                <Route
                        path='/Asistencia'
                        component={Asistencia}
                    />
                    <Route
                        path='/CrearPartido'
                        component={CrearPartido}
                    />
                    <Route
                        path='/'
                        component={Confirmacion}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;