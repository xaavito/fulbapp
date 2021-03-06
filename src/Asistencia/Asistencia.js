import React, { Component } from "react";
//import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import Table from 'react-bootstrap/Table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Button from 'react-bootstrap/Button'

class Asistencia extends Component {
    API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5001";

    state = {
        jugadores: null,
        error: false,
        estado: 100
    }

    convertConfirm = (confirmStatus) => {
        if (confirmStatus === 'C') {
            return 'Confirmado';
        }
        if (confirmStatus === 'B') {
            return 'Baja';
        }
        if (confirmStatus === 'S') {
            return 'Suplente';
        }
    }

    reloadConfirmados = () => {
        this.setState({ jugadores: null });
        this.loadConfirmados();
    }

    loadConfirmados = () => {
        if (this.state.jugadores == null) {
            console.log("Llamando a obtener nombre jugador ")

            fetch(this.API_ENDPOINT + '/get-confirmados', {
                method: 'GET',
                headers: {
                    'Accept': 'text/html',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    // eslint-disable-next-line no-dupe-keys
                    'Access-Control-Allow-Origin': this.API_ENDPOINT
                }
            }).then((response) => {
                this.setState({estado: response.status});
                
                if (response.status >= 500) {
                    this.setState({error: true}); 
                }
                return response.json();
            })
                .then((data) => {
                    console.log("EXITOSO... " + data);
                    this.setState({ jugadores: data })
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    this.setState({ requestFailed: true });
                });
        }
    }

    render() {
        return (
            <div className="main-content">
                {this.loadConfirmados()}
                <div className="table-content-asistentes" >
                    <h1 className="main-title">PAGINA DE ASISTENCIA A ULTIMO EVENTO</h1>
                    <Table borderlessvariant="dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Mail</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jugadores && this.state.jugadores.map((jugador) => {
                                return <tr key={jugador.mail}>
                                    <td>{jugador.nombre}</td>
                                    <td>{jugador.mail}</td>
                                    <td>{this.convertConfirm(jugador.condicion)}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <div className="content-button">
                        <Button variant="primary" className="main-button" type="button" onClick={() => this.reloadConfirmados()}>Recargar</Button>
                    </div>
                </div>
            </div >
        );
    }
}

export default Asistencia;