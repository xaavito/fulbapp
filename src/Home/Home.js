import React, { Component } from "react";
import mainPhoto from '../../src/images/main.jpg';
import '../../src/resources/style.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Home extends Component {
    render() {
        return (
            <div className="main-content">
                <img src={mainPhoto} alt="Main Foto" className="image-full" />
                BIENVENIDO AL SISTEMA DE CONFIRMACION AL PARTIDO DE LOS MIERCOLES!
            </div >
        );
    }
}

export default Home;