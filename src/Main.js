import React, { Component } from "react";

class Main extends Component {


    render() {
        const confirmarAlDoparti = () => {
            fetch('http://localhost:5001/api/greeting', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //solo con post

                body: JSON.stringify({
                    firstParam: 'yourValue',
                    secondParam: 'yourOtherValue',
                }),
                
                mode: 'no-cors'
            }).then(function (response) {
                return response.json();
            })
                .then(function (myJson) {
                    console.log(myJson);
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