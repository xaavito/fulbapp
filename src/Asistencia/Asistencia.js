import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import Table from 'react-bootstrap/Table'

class Asistencia extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    state = {
        jugadores: ''
    }

    saveSelectValue = (e) => {
        let data = {}
        data = e.target.value
        console.log("confirmacion " + data);
        this.setState({ confirmacion: data })
    }

    loadConfirmados = () => {
        console.log("Llamando a obtener nombre jugador ")
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);

        fetch(this.API_ENDPOINT + '/get-confirmados', {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                // eslint-disable-next-line no-dupe-keys
                'Access-Control-Allow-Origin': 'https://fulbapp-cli.herokuapp.com'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
            .then((data) => {
                this.setState({ jugadores: data })
                console.log("EXITOSO... " + data);
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
    }

    render() {
        return (
            <div className="main-content">
                <img src={mainPhoto} alt="Main Foto" className="image-full" />
                {this.loadConfirmados()}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Mail</th>
                            <th>COnfirmado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jugadores.map(function (jugador) {
                            return <tr>
                                <td>{jugador.nombre}</td>
                                <td>{jugador.mail}</td>
                                <td>{jugador.condicion}</td>
                            </tr>;
                        })}
                    </tbody>
                </Table>;
            </div >
        );
    }
}

export default Asistencia;