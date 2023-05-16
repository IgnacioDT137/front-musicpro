import { useEffect, useState} from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";

const PedidoB = ({pedido}) => {

    const [prods, setProds] = useState([])

    useEffect(() => {
        setProds(JSON.parse(pedido.productos))
    }, [])

    const aprobar = (id_pedido) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/pedido-aceptar-bod/${id_pedido}`, {ped: JSON.parse(pedido.productos)}).then((response) => {
            window.location.reload(false)
        })
    }
    const rechazar = (id_pedido) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/pedido-rechazar-bod/${id_pedido}`).then(() => {
            window.location.reload(false)
        })
    }

    return (
        <tr>
            <td>{pedido.id_pedido}</td>
            <td>{pedido.rut_cliente}</td>
            <td>{prods.map(i => {
                return (
                    <p>{i.nombre} x {i.cantidad}</p>
                )
            })}</td>
            <td>{pedido.fecha.slice(0, 10)}</td>
            <td>
                <button className="btn btn-success" onClick={() => {aprobar(pedido.id_pedido)}}  hidden={pedido.aprobado_bod == true || pedido.aprobado_bod == false}> Aprobar</button>
                <button className="btn btn-danger" onClick={() => {rechazar(pedido.id_pedido)}}  hidden={pedido.aprobado_bod == true || pedido.aprobado_bod == false}>Rechazar</button>
            </td>
                  
        </tr>
    )
}

export default PedidoB