import React, { Component } from "react";

class Main extends Component {
    render() {
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
                <button type="button">Confirmar</button>
            </div>
        );
    }
}

export default Main;