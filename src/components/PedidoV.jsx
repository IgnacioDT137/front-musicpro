import { useEffect, useState } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";

const PedidoV = ({pedido}) => {

    const [prods, setProds] = useState([])

    useEffect(() => {
        setProds(JSON.parse(pedido.productos))
    }, [])

    const aprobar = (id_pedido) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/pedido-enviar-bod/${id_pedido}`).then(() => {
            window.location.reload(false)
        })
    }

    const rechazar = (id_pedido) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/pedido-rechazar/${id_pedido}`).then(() => {
            window.location.reload(false)
        })
    }

    const despachar = (id_pedido) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/pedido-despachar/${id_pedido}`).then(() => {
            window.location.reload(false)
        })
    }

    return (
        <>
            <div className="card mt-3 bg-dark text-light">
                <div className="card-body">
                    <h4>Pedido Número {pedido.id_pedido}</h4>
                    <h4>RUT Cliente: {pedido.rut_cliente}</h4>
                    <div className="card bg-warning" hidden={pedido.aprobado_v == false || pedido.aprobado_bod == false}>
                        <div className="card-body">
                            <h4>Productos: </h4>
                            <ul>
                            {prods.map(i => {
                                return <li>{i.nombre} x {i.cantidad}</li>
                            })}
                            </ul>
                        </div>
                    </div> 
                    {pedido.aprobado_v == false ? <h5>Pedido rechazado por el vendedor</h5> : ""}
                    {pedido.aprobado_bod == false ? <h5>Pedido rechazado por el bodeguero</h5> : ""}
                    <div className="mt-3">
                        <button className="btn btn-success" onClick={() => {aprobar(pedido.id_pedido)}} hidden={pedido.aprobado_v == true || pedido.aprobado_v == false}>Aprobar pedido</button>   
                        <button className="btn btn-danger" onClick={() => {rechazar(pedido.id_pedido)}} hidden={pedido.aprobado_v == true || pedido.aprobado_v == false }>Rechazar pedido</button> 
                        <button className="btn btn-primary" hidden={ pedido.aprobado_bod == false || pedido.aprobado_bod == null } onClick={() => {despachar(pedido.id_pedido)}}>Despachar al cliente</button>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default PedidoV;