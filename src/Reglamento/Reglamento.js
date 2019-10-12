import React, { Component } from "react";
import '../../src/resources/style.scss';
import Table from 'react-bootstrap/Table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Reglamento extends Component {
    API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5001";

    render() {
        return (
            <div className="main-content">
                <div className="table-content-asistentes" >
                    <h1 className="main-title">REGLAMENTO</h1>
                    <Table borderlessvariant="dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Mail</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

export default Reglamento;