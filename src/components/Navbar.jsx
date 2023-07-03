import { useState, useEffect } from "react"
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies()

const Navbar = () => {

    const setDolar = async () => {
        var fecha = new Date()
        var firstdate = fecha.toISOString().slice(0,10)
        await axios.get(
            `api/SieteRestWS/SieteRestWS.ashx?user=210519246&pass=1uxu0j48Bdxq&timeseries=F073.TCO.PRE.Z.D&firstdate=${firstdate}`
        ).then(async (response) => {
            const valor = await response.data.Series.Obs[0].value
            cookies.set("dolar", valor, {path: "/"})
        }).catch(e => {
            return
        })
    }

    useEffect(() => {
        setDolar()
    }, [])

    const [tipoUsuario, setTipoUsuario] = useState(cookies.get('tipo'))

    const cerrarSesion = () => {
        cookies.remove('usuario')
        cookies.remove('rut')
        cookies.remove('email')
        cookies.remove('tipo')
        alert("Vuelve pronto!")
        window.location.href = "/"
    }

    const removeDolar = () => {
        cookies.remove("useDolar", {path: "/"})
        window.location.reload(false)
    }

    const boton = async () => {
        console.log(cookies.get("dolar"));
        if (cookies.get("useDolar") === undefined) {
            cookies.set("useDolar", true, {path: "/"})
            window.location.reload(false)
        } else {
            removeDolar()
        }
    }

    return ( 
    <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand text-light" href="/">MusicPro&#127925;</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            {tipoUsuario == undefined ? 
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-light" href="/">Inicio&#127968;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/carrito">Carrito&#128722;</a></li>
                    <li className="nav-item"><a className="nav-link text-light" href="/login">Iniciar sesión</a></li>
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={(e) => {e.preventDefault(); boton()}}>
                            {cookies.get("useDolar") != undefined ? "Convertir a CLP" : "Convertir a USD"}
                        </button>
                    </li>
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