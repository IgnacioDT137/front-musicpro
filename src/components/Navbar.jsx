import { useState } from "react"
import Cookies from "universal-cookie";
import { GlobalContext } from '../context/GlobalContext';
import { useContext } from 'react';

const cookies = new Cookies()

const Navbar = () => {

    const [tipoUsuario, setTipoUsuario] = useState(cookies.get('tipo'))
    const { carrito, setCarrito } = useContext(GlobalContext)

    const cerrarSesion = () => {
        cookies.remove('usuario')
        cookies.remove('rut')
        cookies.remove('email')
        cookies.remove('tipo')
        alert("Vuelve pronto!")
        window.location.href = "/"
    }

    return ( 
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-light" href="/">MusicPro&#127925;</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            {tipoUsuario == undefined ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/login">Iniciar sesión</a></li>
                </ul>
                :
                ""
            }

            {tipoUsuario == 0 ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><button className="nav-link text-light" onClick={() => {cerrarSesion()}}>Cerrar sesión</button></li>
                </ul>
                :
                ""
            }

            {tipoUsuario == 4 ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/crud-usuarios">Panel de usuarios</a></li>
                    <li className="nav-item"><button className="nav-link text-light" onClick={() => {cerrarSesion()}}>Cerrar sesión</button></li>
                </ul>
                :
                ""
            }

            {tipoUsuario == 1 ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/vendedor">Panel de pedidos pendientes</a></li>
                    <li className="nav-item"><button className="nav-link text-light" onClick={() => {cerrarSesion()}}>Cerrar sesión</button></li>
                </ul>
                :
                ""
            }

            {tipoUsuario == 2 ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/OrdenesPedidos">Panel de ordenes</a></li>
                    <li className="nav-item"><button className="nav-link text-light" onClick={() => {cerrarSesion()}}>Cerrar sesión</button></li>
                </ul>
                :
                ""
            }

            {tipoUsuario == 3 ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/entregas">Panel de envios</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/pagos">Panel de pagos</a></li>
                    <li className="nav-item"><button className="nav-link text-light" onClick={() => {cerrarSesion()}}>Cerrar sesión</button></li>
                </ul>
                :
                ""
            }
            </div>
        </div>
    </nav>
    )
}

export default Navbar