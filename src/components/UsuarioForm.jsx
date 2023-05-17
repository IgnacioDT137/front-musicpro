import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { apiRequestNoToken } from '../api/funcionesUsers';

const UsuarioForm = () => {

    const params = useParams()
    const [usuario, setUsuario] = useState({
        rut: "",
        nombre: "",
        apellido: "",
        email: "",
        pwd: "",
        tipo_usuario: "1"
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (params.rut) {
            apiRequestNoToken('get', `https://api-musicpro.onrender.com/CrudUsuarios/filtrar/${params.rut}`, {}).then(async (response) => {
                const resultado = response.data.resultados;
                console.log(resultado);
                setUsuario({
                    rut: resultado.rut,
                    nombre: resultado.nombre,
                    apellido: resultado.apellido,
                    email: resultado.email,
                    pwd: resultado.pwd,
                    tipo_usuario: resultado.tipo_usuario.toString()
                })
            })
        } else {
            return
        }
    }, [])

    return (
        <div>
            <Formik
                initialValues={usuario}
                enableReinitialize={true}
                onSubmit={(values) => {
                    if (params.rut) {
                        apiRequestNoToken('put', `https://api-musicpro.onrender.com/CrudUsuarios/actualizar/${params.rut}`, values).then(async(response) => {
                            const mensaje = response.data.MSG
                            alert(mensaje)
                            navigate("/crud-usuarios")
                        }).catch(error => {
                            const err_mensaje = error.response.data.ERROR
                            alert(err_mensaje)
                        })
                    } else {
                        apiRequestNoToken('post', 'https://api-musicpro.onrender.com/CrudUsuarios/crear', values).then(async(response) => {
                            const mensaje = response.data.MSG
                            alert(mensaje)
                            window.location.reload(false)
                        }).catch(error => {
                            const err_mensaje = error.response.data.ERROR
                            alert(err_mensaje)
                        })
                    }
                }}
            >
                {({handleChange, handleSubmit, values}) => (
                <Form onSubmit={handleSubmit}>
                    <legend>{params.rut ? "Editar Usuario" : "Crear Usuario"}</legend>
                        <div className="mb-3">
                            <label htmlFor="">rut</label>
                            <Field type="text" name="rut" required className="form-control" value={values.rut} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Nombre</label>
                            <Field type="text" name="nombre" required className="form-control" value={values.nombre} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Apellido</label>
                            <Field type="text" name="apellido" required className="form-control" value={values.apellido} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Correo</label>
                            <Field type="email" name="email" required className="form-control" value={values.email} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">{params.rut ? "Contraseña (no modificar)" : "Contraseña"}</label>
                            <Field type="password" name="pwd" required className="form-control" value={values.pwd} onChange={handleChange} disabled={params.rut}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Tipo de usuario</label>
                            <Field as="select" name="tipo_usuario" className='form-select'>
                                <option value="1">Vendedor</option>
                                <option value="2">Bodeguero</option>
                                <option value="3">Contador</option>
                            </Field>   
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">{params.rut ? "Guardar" : "Crear"}</button>
                            <button type="reset" className="btn btn-danger">Limpiar</button>
                        </div>
                </Form>
                )}
            </Formik>
            
        </div>
    )
}

export default UsuarioForm