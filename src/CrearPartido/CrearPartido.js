import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import DatePicker from "react-datepicker";

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
                    throw new Error(response.status);
                }
            })
                .then((data) => {
                    this.setState({ confirmacion: data })          
                    console.log("EXITOSO..." + data);
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    this.setState({ requestFailed: true });
                });

        }
        return (
            <div>
                <img src={mainPhoto} alt="Main Foto" className="image-full" />
                <h1 className="main-title">Sistema de confirmacion al partido de los miercoles</h1>
                <h1 className="main-title">{this.state.confirmacion}</h1>
                <div className="content">
                    FECHA:
                    <DatePicker
                        dateFormat="dd/MM/YYYY"
                        onChange={this.onChange}
                        selected={this.state.date}
                        value={this.state.date}
                    />

                    <button className="main-button" type="button" onClick={() => crearPartido()}>Confirmar</button>
                </div>
            </div >
        );
    }
}

export default CrearPartido;