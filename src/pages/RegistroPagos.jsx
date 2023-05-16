import { useState, useEffect } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";
import PagoEdit from "../components/PagosEdit";

import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Pagos = () => {

    const [pago, setPago] = useState([])


    useEffect(() => {
        apiRequestNoToken('get', `https://api-musicpro.onrender.com/pagos`, {}).then(async (response) => {
            setPago(response.data.resultados)
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
                <th scope="col">ID Pago</th>
                <th scope="col">Método de pago</th>
                <th scope="col">Monto pagado</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pago.map(p => {
              return (
                  <PagoEdit pago={p}/>
              )
            })}
          </tbody>
        </table>
    </div>
    )
}
    
    
      
export default Pagos;