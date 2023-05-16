import { useNavigate } from "react-router-dom"
import { apiRequestNoToken } from "../api/funcionesUsers"

const PagoEdit = ({pago}) => {

    const navigate = useNavigate()

    const aprobar = (id) => {
        apiRequestNoToken('put', `http://localhost:3001/aprobar-pago/${id}`, {}).then(() => {
            window.location.reload(false)
        }) 
    }

    return (
        <tr key={pago.id_pago}>
            <td>{pago.id_pago}</td>
            <td>{pago.metodo}</td>
            <td>${pago.total}</td>
            <td>{pago.aprobado == 1 ? "Aprobado" : "Pendiente"}</td>
            <td>
                <div className="btn-group">
                    <button onClick={() => aprobar(pago.id_pago)} className={pago.aprobado == 1 ? "btn btn-success disabled" : "btn btn-success"}>Aprobar</button>
                </div>
            </td>
        </tr>              
    )
}

export default PagoEdit