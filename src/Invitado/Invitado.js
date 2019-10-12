import React, { Component } from "react";
// import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

class Invitado extends Component {
    API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5001";

    state = {
        nombre: '',
        email: '',
        confirmacion: true,
        response: '',
        error: false,
        estado: 100
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    agregarInvitado = () => {
        console.log("Llamando a Agregar Invitado");
        console.log("STATE :" + JSON.stringify(this.state));

        fetch(this.API_ENDPOINT + '/agregar-invitado', {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                // eslint-disable-next-line no-dupe-keys
                'Access-Control-Allow-Origin': this.API_ENDPOINT
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            this.setState({estado: response.status});
                
            if (response.status >= 500) {
                this.setState({error: true}); 
            }
            return response.json();
        })
            .then((data) => {
                console.log("EXITOSO... " + data);
                this.setState({ response: data })
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
    }

    render() {
        return (
            <div className="main-content">
                <div className="table-content" >
                    <h1 className="main-title">PAGINA DE GENERACION DE INVITADOS</h1>
                    <h1 className="sub-title">{this.state.response}</h1>
                    <Table borderlessvariant="dark">
                        <tbody>
                            <tr key="1">
                                <td>Nombre Invitado</td>
                                <td> <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={this.state.nombre}
                                    onChange={this.onChange} /></td>
                            </tr>
                            <tr key="2">
                                <td>Email Invitado</td>
                                <td> <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onChange} /></td>
                            </tr>
                        </tbody>

                    </Table>
                    <div className="content-button">
                        <Button disabled={this.state.nombre} variant="primary" className="main-button" type="button" onClick={() => this.agregarInvitado()}>Confirmar</Button>
                    </div>
                </div>
            </div >
        );
    }
}

export default Invitado;