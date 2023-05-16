import { useEffect, useState } from "react";
import PedidoB from "../components/PedidoB";
import { apiRequestNoToken } from "../api/funcionesUsers";

import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const OrdenesPedidos = () => {

    const [pedidos, setPedidos] = useState([])

    const getPedidos = async () => {
      await apiRequestNoToken('get', 'https://api-musicpro.onrender.com/pedidos-de-bod', {}).then(async (response) => {
            setPedidos(response.data.resultados)
      })
    }

    useEffect(() => {
      getPedidos()
    })

    if (cookies.get('tipo') != 2) {
      return (
          <ErrorUser />
      )
    }

    return(
    <div className="row mw-100">
      <div className="col-8 p-3 offset-2">
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th scope="col">Id de Pedido</th>
              <th scope="col">Rut del Cliente</th>
              <th scope="col">Productos</th>
              <th scope="col">Fecha</th>                            
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(i => {
              return <PedidoB pedido={i}/>
            })}
          </tbody>
        </table>
      </div>            
    </div>)

}

export default OrdenesPedidos