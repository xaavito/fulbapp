import React, { Component } from "react";
//import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class Jugador extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    state = {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        confirmacion: false,
        response: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    agregarJugador = () => {
        console.log("Llamando a Agregar Jugador");
        console.log("STATE :" + JSON.stringify(this.state));

        fetch(this.API_ENDPOINT + '/agregar-jugador', {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                // eslint-disable-next-line no-dupe-keys
                'Access-Control-Allow-Origin': 'https://fulbapp-cli.herokuapp.com'
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            this.setState({ confirmacion: true });
            return response.text();
        })
            .then((data) => {
                console.log("EXITOSO... " + data);
                this.setState({ response: data })
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ response: error })
                this.setState({ requestFailed: true });
            });
    }

    render() {
        return (
            <div className="main-content">
                <div className="table-content" >
                    <h1 className="sub-title">{this.state.response}</h1>
                    <Table borderlessvariant="dark">
                        <tbody>
                            <tr key="1">
                                <td>Nombre</td>
                                <td><input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={this.state.nombre}
                                    onChange={this.onChange} /></td>
                            </tr>
                            <tr key="2">
                                <td>Apellido</td>
                                <td><input
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    value={this.state.apellido}
                                    onChange={this.onChange} /></td>
                            </tr>
                            <tr key="3">
                                <td>Email Invitado</td>
                                <td> <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onChange} /></td>
                            </tr>
                            <tr key="4">
                                <td>Telefono</td>
                                <td> <input
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    value={this.state.telefono}
                                    onChange={this.onChange} /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="content-button">
                        <Button disabled={this.state.confirmacion} variant="primary" className="main-button" type="button" onClick={() => this.agregarJugador()}>Confirmar</Button>
                    </div>
                </div >
            </div>
        );
    }
}

export default Jugador;