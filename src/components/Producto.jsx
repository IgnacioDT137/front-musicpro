import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

const Producto = ({producto}) => {

    const { addItem, verificarStock, getItem} = useContext(GlobalContext)

    const [item, setItem] = useState(getItem(producto))

    const mostrarDetalle = () => {
      mySwal.fire({
        html: 
        <div className="d-flex flex-column">
          <h2>{producto.nombre}</h2>
          <img src={producto.imagen} alt="imagen" />
          <div className="mt-3">
            <p>{producto.descripcion}</p>
            <h3>Precio: ${producto.precio}</h3>
            <h3>Stock: {item ? `${producto.stock - item.cantidad}`: `${producto.stock}`}</h3>
          </div>
        </div>,
        showCancelButton: true,
        confirmButtonText: "Añadir al Carrito",
        confirmButtonColor: "green",
        cancelButtonText: "Cerrar",
        cancelButtonColor: "red",
      }).then(r => {
        if (r.isConfirmed) {
          addItem(producto)
          mySwal.fire({
            html: <h3>Producto añadido al carrito!</h3>,
            icon: 'success',
            confirmButtonColor: "green"
          }).then(() => {
            window.location.reload(false)
          })
        } 
      })
    }

    return (
      <div className="col">
        <div className="card h-100" onClick={() => {
          if (!verificarStock(producto)) {
            mostrarDetalle()
          }
        }}>
          <div className="card-body">
            <div className="text-center">
              <img src={producto.imagen} alt="imagen" className="card-img-top" />
              <div>
                <h3>{producto.nombre}</h3>
                <div>
                  <h5 className={!verificarStock(producto) ? "text-success" : "text-danger"}>{!verificarStock(producto) ? "Disponible" : "Sin Stock"}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default Producto