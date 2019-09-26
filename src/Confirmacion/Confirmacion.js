import React, { Component } from "react";
//import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import Button from 'react-bootstrap/Button'
// import { Redirect } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

import { Link } from 'react-router-dom'

class Confirmacion extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    // TODO: FIX DE TODAS ESTAS VARIABLES
    state = {
        jugadorID: '',
        confirmacion: 'C',
        resultado: '',
        jugadorNombre: null,
        responseOK: false,
        error: false,
        estado: 100
    }

    saveSelectValue = (e) => {
        let data = {}
        data = e.target.value
        this.setState({ confirmacion: data })
    }

    loadJugadorNombre = () => {
        if (!this.state.jugadorNombre) {
            console.log("Llamando a obtener nombre jugador ")
            const queryString = require('query-string');
            const parsed = queryString.parse(this.props.location.search);

            fetch(this.API_ENDPOINT + '/get-user-name', {
                method: 'POST',
                headers: {
                    'Accept': 'text/html',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    // eslint-disable-next-line no-dupe-keys
                    'Access-Control-Allow-Origin': 'https://fulbapp-cli.herokuapp.com'
                },
                body: JSON.stringify({ "id": parsed.id })
            }).then((response) => {
                this.setState({estado: response.status});
                
                if (response.status >= 500) {
                    this.setState({error: true}); 
                }
                return response.json();
            })
                .then((data) => {
                    this.setState({ jugadorNombre: data.mensaje })
                    console.log("EXITOSO... " + data.mensaje);
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    this.setState({ requestFailed: true });
                });
        }
    }

    render() {
        let idJugador = '';
        const confirmarAlDoparti = () => {
            const queryString = require('query-string');
            const parsed = queryString.parse(this.props.location.search);
            idJugador = parsed.id;
            fetch(this.API_ENDPOINT + '/confirmar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    // eslint-disable-next-line no-dupe-keys
                    'Access-Control-Allow-Origin': 'https://fulbapp-cli.herokuapp.com'
                },
                body: JSON.stringify({
                    "jugador": idJugador,
                    "confirma": this.state.confirmacion
                })
            }).then((response) => {
                this.setState({estado: response.status});
                
                if (response.status >= 500) {
                    this.setState({error: true}); 
                }
                return response.text();
            })
                .then((data) => {
                    console.log("DATA STORED " + data);
                    //TODO: MUY FEO QUEDO TYODO ESTO
                    this.setState({ responseOK: true })
                    this.setState({ resultado: "Confirmacion exitosa! Gracias!" })
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    this.setState({ requestFailed: true });
                    this.setState({ resultado: "Ha ocurrido un error! por favor intente nuevamente o contactese con el admin" })
                });

        }
        //   lo scamos por ahora
        //  {this.state.jugadorNombre == null ? <Redirect to='/'/> : <div/>}
        return (

            <div className="main-content">
                {this.loadJugadorNombre()}
                <div className="table-content" >
                    <h1 className="main-title">Sistema de confirmacion al partido de los miercoles</h1>
                    <h1 className="sub-title">{this.state.resultado}</h1>
                    <Table borderlessvariant="dark">
                        <tbody>
                            <tr key="1">
                                <h1 className="main-title">Bienvenido {this.state.jugadorNombre}</h1>
                            </tr>
                            <tr key="2">
                                <td> <select className="main-button" onChange={this.saveSelectValue}>
                                    <option value="C">Confirmo!</option>
                                    <option value="B">Baja!</option>
                                </select></td>
                            </tr>
                        </tbody>

                    </Table>
                    <div className="content-button">
                        <Button disabled={this.state.responseOK} variant="primary" className="main-button" type="button" onClick={() => confirmarAlDoparti()}>Confirmar</Button>
                        <br/>
                        <Link to ='/Asistencia'>Ver Asistentes</Link>
                    </div>

                </div>
            </div >
        );
    }
}

export default Confirmacion;