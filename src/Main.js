
import React, { Component } from "react";
import { BrowserRouter, Route , Switch} from "react-router-dom"
import Confirmacion from './Confirmacion/Confirmacion'
import CrearPartido from './CrearPartido/CrearPartido'

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
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