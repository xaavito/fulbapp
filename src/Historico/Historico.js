import React, { Component } from "react";
import '../../src/resources/style.scss';
import Table from 'react-bootstrap/Table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Historico extends Component {
    API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5001";

    state = {
        partidos: null,
        error: false,
        estado: 100
    }

    loadPartidos = () => {
        if (this.state.partidos == null) {
            console.log("Llamando a obtener historico ")

            fetch(this.API_ENDPOINT + '/get-historico', {
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
                    this.setState({ partidos: data })
                    console.log("EXITOSO... " + data);
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
                {this.loadPartidos()}
                <div className="table-content-asistentes" >
                    <h1 className="main-title">HISTORICO DE RESULTADOS!</h1>
                    <Table borderlessvariant="dark">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Goles Blanco</th>
                                <th>Goles Azul</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.partidos && this.state.partidos.map((partido) => {
                                return <tr key={partido.fecha}>
                                    <td>{partido.fecha}</td>
                                    <td>{partido.goles_blanco}</td>
                                    <td>{partido.goles_azul}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

export default Historico;