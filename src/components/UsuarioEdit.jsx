import { useEffect, useState } from "react";
import { apiRequestNoToken } from "../api/funcionesUsers";

const UsuarioEdit = () => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        apiRequestNoToken('get', 'https://api-musicpro.onrender.com/CrudUsuarios/usuarios', {}).then(async (response) => {
            setUsuarios(response.data.resultados)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        
            <table className="table table-light table-bordered">
                <thead>
                    <tr>                                
                        <th scope="col">Rut</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Tipo de usuario</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => {
                        return (
                            <tr key={user.rut}>
                                <td>{user.rut}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.email}</td>
                                <td>{user.pwd}</td>
                                <td>{user.tipo_usuario}</td>
                                <td>
                                    <div className="btn-group">
                                        <a href={"/crud-usuarios/editar/" + user.rut} className="btn btn-success">Editar</a>
                                        <button className="btn btn-danger" onClick={() => {
                                            apiRequestNoToken('delete', `http://localhost:3001/CrudUsuarios/eliminar/${user.rut}`, {}).then(async(response) => {
                                                const mensaje = response.data.MSG
                                                alert(mensaje)
                                                window.location.reload(false)
                                            })
                                        }}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>          
    )
}

export default UsuarioEdit