import { useState, useEffect } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";
import EntregasEdit from "../components/EntregasEdit";

import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Entregas = () => {

    const [pedido, setPedido] = useState([])


    useEffect(() => {
        apiRequestNoToken('get', `http://localhost:3001/entregas`, {}).then(async (response) => {
            setPedido(response.data.resultados)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    if (cookies.get('tipo') != 3) {
      return (
          <ErrorUser />
      )
    }

    return (
    <div className="container mt-5">
        <table className="table table-light table-bordered">
          <thead>
            <tr>
                <th scope="col">ID Pedido</th>
                <th scope="col">Rut del cliente</th>
                <th scope="col">Dirección</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedido.map(p => {
              return (
                  <EntregasEdit pedido={p}/>
              )
            })}
          </tbody>
        </table>
    </div>
    )
}
    
    
      
export default Entregas;