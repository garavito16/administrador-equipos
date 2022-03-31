import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Switch,Link,Route,withRouter, BrowserRouter} from 'react-router-dom';
import Lista from '../../Components/Lista/Lista';
import Formulario from '../../Components/Formulario/Formulario';
import './Main.css';
import ListaEstados from '../../Components/ListaEstados.js/ListaEstados';

function Main(props) {
    const [players,setPlayers] = useState([]);
    const [recargar,setRecargar] = useState(true);

    useEffect(()=>{
        if(recargar) {
            axios.get("http://localhost:8000/api/player/all")
                .then(response=>{
                    setPlayers(response.data);
                    setRecargar(false);
                })
        }
    },[recargar]);

    return (
        <BrowserRouter>
            <div className='plataforma'>
                <div className='divLinks'>
                    <Link className='linkManagerPlayers' to="/players/list">Manage Players</Link>
                    <span> | </span>
                    <Link className='linkManagerPlayers' to="/status/game/1">Manage Player Status</Link>
                </div>

                <Route path="/players/list" render={(routeprops)=>
                    <div className='contenedor'>
                        <Link to="/players/list">List</Link>
                        <span> | </span>
                        <Link to={'/players/addPlayer'}>Add player</Link>
                        <div className='componente'>
                            <Lista setRecargar={setRecargar} players={players} {...routeprops} />
                        </div>
                    </div>
                }/>

                <Route path="/players/addPlayer" render={(routeprops)=>
                    <div className='contenedor'>
                        <Link to="/players/list">List</Link>
                        <span> | </span>
                        <Link to={'/players/addPlayer'}>Add player</Link>
                        <div className='componente'>
                            <Formulario setRecargar={setRecargar} {...routeprops} />
                        </div>
                    </div>
                }/>
                
                <Route path="/status/game/:identificador" render={(routeprops)=>
                    <div className='contenedor'>
                        <div className='componente'>
                            <ListaEstados players={players} setRecargar={setRecargar} {...routeprops} />
                        </div>
                    </div>
                }/>
            </div>
        </BrowserRouter>
    )
}

export default Main;