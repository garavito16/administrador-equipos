import axios from "axios"
import './Lista.css';

export default props => {

    const eliminarPlayer = (idPlayer) => {
        var result = window.confirm("Esta seguro de eliminar el jugador");
        if (result == true) {
            axios.delete("http://localhost:8000/api/player/delete/" + idPlayer)
            .then(response => {
                props.setRecargar(true);
            })
            .catch(err => {
                console.log("error : " + err);
            });
        }
    }

    return (
        <div>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Name Player</th>
                        <th>Prefered position</th>
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
                                        {player.posicion}
                                    </td>
                                    <td>
                                        <button className="btn btnEliminar" onClick={(e) => eliminarPlayer(player._id)}>
                                            Eliminar
                                        </button>
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