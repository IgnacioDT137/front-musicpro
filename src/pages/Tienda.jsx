import { useState, useEffect } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";
import { useParams } from "react-router-dom";
import Producto from "../components/Producto";

const Tienda = () => {

    const [productos, setProductos] = useState([])
    const params = useParams()

    const [categoria, setCategoria] = useState("")

    useEffect(() => {
        apiRequestNoToken('get', `http://localhost:3001/productos/${params.id_categoria}`, {}).then(async (response) => {
            switch (params.id_categoria) {
                case "1":
                    setCategoria("Guitarras")
                    break;
                case "2":
                    setCategoria("Baterías")
                    break;
                case "3": 
                    setCategoria("Bajos")
                    break;
                case "4":
                    setCategoria("Amplificadores")
                    break;
                case "5":
                    setCategoria("Accesorios")
                    break;
                case "6": 
                    setCategoria("Estudio")
                    break;
                default:
                    break;
            }
            setProductos(response.data.resultados)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
    <>
        <h2 className="mt-3 text-center">{categoria}</h2>
        <div className="row mw-100 row-cols-3 p-2">
            {productos.map(p => {
                return (
                    <Producto producto={p}/>
                )
            })}
        </div>
    </>
    )
}

export default Tienda