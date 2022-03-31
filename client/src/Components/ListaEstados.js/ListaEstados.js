import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './ListaEstados.css';

export default props => {

    let identificador = props.match.params.identificador;
    console.log(identificador);
    identificador = "game"+identificador;

    const cambiarEstado = (valor,idPlayer) => {
        axios.put("http://localhost:8000/api/player/edit/"+idPlayer,{[identificador]:valor})
            .then(response=>{
                console.log(response);
                props.setRecargar(true);
            })
            .catch(err=>{
                console.log("error :"+err);
            });
    }

    return (
        <div>
            <Link to="/status/game/1">Game 1</Link>
            <span> | </span>
            <Link to="/status/game/2">Game 2</Link>
            <span> | </span>
            <Link to="/status/game/3">Game 3</Link>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Name Player</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.players.map((player, index) => {
                            return (
                                <tr key={"Indice" + index}>
                                    <td>
                                        {player.nombre}
                                    </td>
                                    <td>
                                        {
                                            (player[identificador] === "playing") ?
                                                <button className="btnStatus playingSelect">
                                                    Playing
                                                </button>
                                                :
                                                <button className="btnStatus" onClick={(e) => cambiarEstado("playing",player._id)}>
                                                    Playing
                                                </button>
                                        }
                                        {
                                            (player[identificador] === "notplaying") ?
                                                <button className="btnStatus notplayingSelect">
                                                    Not Playing
                                                </button>
                                                :
                                                <button className="btnStatus" onClick={(e) => cambiarEstado("notplaying",player._id)}>
                                                    Not Playing
                                                </button>
                                        }
                                        {
                                            (player[identificador] === "undecided") ?
                                                <button className="btnStatus undecidedSelect">
                                                    Undecided
                                                </button>
                                                :
                                                <button className="btnStatus" onClick={(e) => cambiarEstado("undecided",player._id)}>
                                                    Undecided
                                                </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}