
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Confirmacion from './Confirmacion/Confirmacion'
import CrearPartido from './CrearPartido/CrearPartido'
import Asistencia from './Asistencia/Asistencia'
import Invitado from './Invitado/Invitado'
import Jugador from './Jugador/Jugador'
import Historico from './Historico/Historico'
import Reglamento from './Reglamento/Reglamento'

import Home from './Home/Home'

class Main extends Component {

    render() {
        return (
            <BrowserRouter>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" />
                <Switch>
                    <Route
                        path='/Reglamento'
                        component={Reglamento}
                    />
                    <Route
                        path='/Historico'
                        component={Historico}
                    />
                    <Route
                        path='/Confirmar'
                        component={Confirmacion}
                    />
                    <Route
                        path='/Asistencia'
                        component={Asistencia}
                    />
                    <Route
                        path='/Invitado'
                        component={Invitado}
                    />
                    <Route
                        path='/Jugador'
                        component={Jugador}
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