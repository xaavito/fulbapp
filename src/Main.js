
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Confirmacion from './Confirmacion/Confirmacion'
import CrearPartido from './CrearPartido/CrearPartido'
import Asistencia from './Asistencia/Asistencia'
import Home from './Home/Home'

class Main extends Component {

    render() {
        return (
            <BrowserRouter>
                <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></link>
                <Switch>
                    <Route
                        path='/Confirmar'
                        component={Confirmacion}
                    />
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
                        component={Home}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;