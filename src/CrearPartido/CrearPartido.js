import React, { Component } from "react";
// import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import "react-datepicker/dist/react-datepicker.css";

class CrearPartido extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    state = {
        date: new Date(),
        confirmacion: '',
    }

    onChange = date => this.setState({ date })

    render() {
        const crearPartido = () => {
            const fechaDelPartidoNuevo = this.state.date;
            const fechaFormateada = fechaDelPartidoNuevo.toLocaleDateString("es-AR");
            console.log(JSON.stringify({ 'fecha': fechaFormateada }));
            fetch(this.API_ENDPOINT + '/crear-partido', {
                method: 'POST',
                headers: {
                    'Accept': 'text/html',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "fecha": fechaFormateada })
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status, response.statusText);
                }
            })
                .then((data) => {
                    this.setState({ confirmacion: 'Se Creado el partido exitosamente!' })
                    console.log("EXITOSO..." + data);
                })
                .catch((error) => {
                    console.log('error: ' + error.statusText);
                    this.setState({ requestFailed: true });
                });

        }
        return (
            <div className="main-content">

                <div className="table-content" >
                    <h1 className="main-title">Sistema de confirmacion al partido de los miercoles</h1>
                    <h1 className="sub-title">{this.state.confirmacion}</h1>
                    <Table borderlessvariant="dark">
                        <tbody>
                            <tr key="1">
                                <td>FECHA:</td>
                                <td>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.onChange}
                                        selected={this.state.date}
                                        value={this.state.date}
                                        disabled={this.state.confirmacion}
                                        placeholderText="Seleccione una fecha!"
                                        minDate={new Date()}
                                    /></td>
                            </tr>
                        </tbody>

                    </Table>
                    <div className="content-button">
                        <Button
                            className="main-button"
                            type="button"
                            onClick={() => crearPartido()}
                            disabled={this.state.confirmacion}>
                            Confirmar
                    </Button>
                    </div>
                </div>
            </div >
        );
    }
}

export default CrearPartido;