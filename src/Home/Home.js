import React, { Component } from "react";
import mainPhoto from '../../src/images/tenor.gif';
import '../../src/resources/style.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Home extends Component {
    render() {
        return (
            <div className="main-content">
                <div className="table-content" >
                    <h1 className="main-title">BIENVENIDO AL SISTEMA DE CONFIRMACION AL PARTIDO DE LOS MIERCOLES!</h1>
                    <img src={mainPhoto} alt="Main Foto" className="giphy-embed" />
                </div>
            </div >
        );
    }
}

export default Home;