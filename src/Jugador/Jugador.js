import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from 'react-bootstrap/Button'

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
                <img src={mainPhoto} alt="Main Foto" className="image-full" />
                <h1 className="sub-title">{this.state.response}</h1>
                <div className="table-content" >
                    Nombre
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={this.state.nombre}
                        onChange={this.onChange} />
                    Apellido
                    <input
                        type="text"
                        name="apellido"
                        id="apellido"
                        value={this.state.apellido}
                        onChange={this.onChange} />
                    Email Invitado
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.onChange} />
                    Telefono
                    <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        value={this.state.telefono}
                        onChange={this.onChange} />
                    <Button disabled={this.state.confirmacion} variant="primary" size="lg" className="main-button" type="button" onClick={() => this.agregarJugador()}>Confirmar</Button>
                </div>
            </div >
        );
    }
}

export default Jugador;