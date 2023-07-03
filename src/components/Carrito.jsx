import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

import Cookies from "universal-cookie";

const cookies = new Cookies()

const Carrito = () => {

  const { carrito, total, deleteItem, addItem, restarItem, cant_total } = useContext(GlobalContext)

  return (
    <div>
      <div className="col-8 p-3 offset-2">
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(i => {
              return (
                <tr>
                  <td>{i.nombre}</td>
                  <td>${cookies.get("useDolar") == undefined ? i.precio : parseFloat(i.precio / cookies.get("dolar")).toFixed(2)}</td>
                  <td style={{display: "flex"}}>
                    <button type="button" className="btn btn-danger" onClick={() => {restarItem(i)}} disabled={i.cantidad == 1}>-</button>
                    <input className="form-control" type="number" style={{width:"60px"}} value={i.cantidad} onChange={(e) => {i.cantidad = e.target.value}}/>
                    <button type="button" className="btn btn-primary" onClick={() => {addItem(i)}} disabled={i.cantidad == i.stock}>+</button>
                    <p>{i.cantidad == i.stock ? "Stock máximo alcanzado" : ""}</p>
                  </td>
                  <td>${cookies.get("useDolar") == undefined ? i.precio * i.cantidad : (parseFloat(i.precio / cookies.get("dolar")) * i.cantidad).toFixed(2)}</td>
                  <td><button className="btn btn-danger" onClick={() => {deleteItem(i)}}>Eliminar producto</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="card" style={{width: "18rem;", display:"align-items flex-end"}}>
        <div className="card-body">
          <h5 className="card-title">Subtotal: ${cookies.get("useDolar") == undefined ? total : parseFloat(total / cookies.get("dolar")).toFixed(2)}</h5>
          <h5 className="card-title">Productos en el carrito: {cant_total}</h5>
          <h5 className="card-title">Total: ${cookies.get("useDolar") == undefined ? total : parseFloat(total / cookies.get("dolar")).toFixed(2)}</h5>
        </div>
      </div>
      <a href="/" type="button" className="btn btn-primary">Agregar más productos</a>
      <a href="/checkout" type="button" className={carrito.length == 0 ? "btn btn-success disabled" : "btn btn-success"}>{carrito.length == 0 ? "No hay productos en el carro" : "Ir al CheckOut"}</a>
    </div>
  );
};

export default Carrito;