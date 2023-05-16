import { useNavigate } from "react-router-dom"
import { apiRequestNoToken } from "../api/funcionesUsers"

const EntregasEdit = ({pedido}) => {

    const navigate = useNavigate()

    const confirmar = (id) => {
        apiRequestNoToken('put', `https://api-musicpro.onrender.com/confirmar-entrega/${id}`, {}).then(() => {
            window.location.reload(false)
        }) 
    }

    return (
        <tr key={pedido.id_pedido}>
            <td>{pedido.id_pedido}</td>
            <td>{pedido.rut_cliente}</td>
            <td>{pedido.direccion}</td>
            <td>{pedido.fecha.slice(0, 10)}</td>
            <td>{pedido.entregado == 1 ? "Entregado" : "Pendiente"}</td>
            <td>
                <div className="btn-group">
                    <button onClick={() => confirmar(pedido.id_pedido)} className={pedido.entregado == 1 ? "btn btn-success disabled" : "btn btn-success"}>Confirmar entrega</button>
                </div>
            </td>
        </tr>              
    )
}

export default EntregasEdit