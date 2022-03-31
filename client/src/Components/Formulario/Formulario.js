import axios from "axios";
import { useState } from "react"
import './Formulario.css';

export default props => {

    const [nombre, setNombre] = useState("");
    const [posicion, setPosicion] = useState("");
    const [errores, setErrores] = useState([]);

    const enviarDatos = (e) => {
        e.preventDefault();
        let validar = true;
        let aux = [];

        if(nombre.length === 0) {
            aux.push("El nombre del jugador es requerido");
            validar = false;
        } else if (nombre.length < 3) {
            aux.push("El nombre del jugador debe tener mas de 2 caracteres");
            validar = false;
        }

        if(posicion.length === 0) {
            aux.push("La posicion del jugador es requerida");
            validar = false;
        } else if (posicion.length < 3) {
            aux.push("La posicion del jugador debe tener mas de 3 caracteres");
            validar = false;
        }

        if(validar) {
            axios.post("http://localhost:8000/api/player/new", { nombre, posicion })
            .then(response => {
                props.setRecargar(true);
                props.history.push('/players/list');
            })
            .catch(err => {
                console.log("ocurrio un error : " + err);
                const auxErrores = err.response.data.errors;
                const mostrar = [];
                for (const key of Object.keys(auxErrores)) {
                    mostrar.push(auxErrores[key].message);
                }
                setErrores(mostrar);
            });
        } else {
            setErrores(aux);
        }
    }

    return (
        <div>
            {
                errores.map((error,index)=>{
                    return (
                        <p key={"indice"+index}>{error}</p>
                    )
                })
            }
            <form className="formulario" onSubmit={(e) => enviarDatos(e)}>
                <div className="grupoForm">
                    <label className="etiqueta">Player name:</label>
                    <input className="ingresa" placeholder="Ingrese player name" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="grupoForm">
                    <label className="etiqueta">Prefered position:</label>
                    <input className="ingresa" placeholder="Ingrese prefered position" type="text" value={posicion} onChange={(e) => setPosicion(e.target.value)} />
                </div>
                <div className="divBoton">
                    <input className="btn btnGuardar" type="submit" value="ADD" />
                </div>
            </form>
        </div>
    )
}