import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CrearPartido extends Component {
    API_ENDPOINT = 'https://fulbapp-serv.herokuapp.com';

    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        const crearPartido = () => {
            fetch(this.API_ENDPOINT + '/crear-partido', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
                body: { fecha: this.state.date }
            }).then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
                .then((data) => {
                    console.log("DATA STORED " + data);
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
                <div className="content">
                    FECHA:
                    <DatePicker
                        dateFormat="dd/MM/YYYY"
                        onChange={this.onChange}
                        selected={this.state.date}
                    />

                    <button className="main-button" type="button" onClick={() => crearPartido()}>Confirmar</button>
                </div>
            </div >
        );
    }
}

export default CrearPartido;