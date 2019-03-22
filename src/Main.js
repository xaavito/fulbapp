import React, { Component } from "react";

class Main extends Component {
    render() {
        const confirmarAlDoparti = () => {
            fetch('http://localhost:5001/api/greeting', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
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
                <h1>Bienvenido Dani!</h1>
                <ul className="header">
                    <li><a href="/">Home</a></li>
                    <li><a href="/stuff">Stuff</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div className="content">
                    <select>
                        <option value="C">Confirmo</option>
                        <option value="B">Baja</option>
                        <option value="S">Suplente</option>
                    </select>
                </div>
                <button type="button" onClick={() => confirmarAlDoparti()}>Confirmar</button>
            </div >
        );
    }
}

export default Main;