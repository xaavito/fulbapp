import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import Button from 'react-bootstrap/Button'

class Confirmacion extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    state = {
        jugadorID: '',
        confirmacion: 'C',
        resultado: '',
        jugadorNombre: ''
    }

    saveSelectValue = (e) => {
        let data = {}
        data = e.target.value
        console.log("confirmacion " + data);
        this.setState({ confirmacion: data })
    }

    loadJugadorNombre = () => {
        console.log("Llamando a obtener nombre jugador")
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);

        fetch(this.API_ENDPOINT + '/get-user-name', {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/'
            },
            body: JSON.stringify({ "id": parsed.id })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response;
        })
            .then((data) => {
                //this.setState({ confirmacion: 'Se Creado el partido exitosamente!' })
                console.log("EXITOSO... " + data.body);
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
    }

    render() {
        const confirmarAlDoparti = () => {
            const queryString = require('query-string');
            const parsed = queryString.parse(this.props.location.search);

            fetch('https://fulbapp-serv.herokuapp.com/confirmar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
                body: JSON.stringify({
                    "jugador": parsed.id,
                    "confirma": this.state.confirmacion
                })
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response;
                /*
                else {
                    this.setState({ resultado: "Confirmacion exitosa! Gracias!" })
                }
                */
            })
                .then((data) => {
                    console.log("DATA STORED " + data);
                    this.setState({ resultado: "Confirmacion exitosa! Gracias!" })
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    this.setState({ requestFailed: true });
                    this.setState({ resultado: "Ha ocurrido un error! por favor intente nuevamente o contactese con el admin" })
                });

        }
        return (

            <div className="main-content">
                {this.loadJugadorNombre()}
                <img src={mainPhoto} alt="Main Foto" className="image-full" />
                <h1 className="main-title">Sistema de confirmacion al partido de los miercoles</h1>
                <h1 className="sub-title">{this.state.resultado}</h1>
                <div className="content">
                    <h1>Bienvenido Dani!</h1>
                    <div className="select">
                        <select className="main-button" onChange={this.saveSelectValue}>
                            <option value="C">Confirmo</option>
                            <option value="B">Baja</option>
                            <option value="S">Suplente</option>
                        </select>
                    </div>
                    <Button variant="primary" size="lg" className="main-button" type="button" onClick={() => confirmarAlDoparti()}>Confirmar</Button>
                </div>
            </div >
        );
    }
}

export default Confirmacion;