import { useEffect, useState } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";
import PedidoV from "../components/PedidoV";

import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Vendedor = () => {

    const [bodega, setBodega] = useState([])
    const [pendientes, setPendientes] = useState([])
    const [bodeguero, setBodeguero] = useState([])
    const [despachar, setDespachar] = useState([])
    const [rechazados, setRechazados] = useState([])

    const getAll = async () => {

        await apiRequestNoToken('get', 'http://localhost:3001/productos', {}).then(async (response) => {
            setBodega(response.data.resultados);
        })

        await apiRequestNoToken('get', 'http://localhost:3001/pedidos-pendientes', {}).then(async (response) => {
            setPendientes(response.data.resultados)
        })

        await apiRequestNoToken('get', 'http://localhost:3001/pedidos-de-bod', {}).then(async (response) => {
            setBodeguero(response.data.resultados)
        })

        await apiRequestNoToken('get', 'http://localhost:3001/pedidos-despachar', {}).then(async (response) => {
            setDespachar(response.data.resultados)
        })

        await apiRequestNoToken('get', 'http://localhost:3001/pedidos-rechazados', {}).then(async (response) => {
            setRechazados(response.data.resultados)
        })
    }

    useEffect(() => {
        getAll()
    }, [])
    
    if (cookies.get('tipo') != 1) {
        return (
            <ErrorUser />
        )
    }

    return (
        <div className="p-3">
            <div className="row row-cols-5">
                <div className="col">
                    <div className="card bg-warning">
                        <div className="card-body">
                            <h3>Productos en la bodega</h3>
                            <ul>
                            {
                                bodega.map(i => {
                                    return <li>{i.nombre} x {i.stock}</li>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-primary">
                        <div className="card-body">
                        <h3>Pedidos pendientes</h3>
                            {pendientes.map(p => {
                                return <PedidoV pedido={p}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-success">
                        <div className="card-body">
                            <h3>Pedidos para aprobación del bodeguero</h3>
                            {bodeguero.map(p => {
                                return <PedidoV pedido={p}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h3 className="text-light">Pedidos por despachar</h3>
                            {despachar.map(p => {
                                return <PedidoV pedido={p} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <h3 className="">Pedidos rechazados</h3>
                            {rechazados.map(p => {
                                return <PedidoV pedido={p} />
                            })}
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Vendedor;