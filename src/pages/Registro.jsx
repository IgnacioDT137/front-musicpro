import { Formik, Field, Form } from 'formik';
import { apiRequestNoToken } from '../api/funcionesUsers';

const Registro = () =>{
    return(
        <div>
            <div className="row mw-100">
                <div className="col col-6 offset-3 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <Formik
                             initialValues={{
                                rut: "",
                                nombre: "",
                                apellido:"",
                                email:"",
                                pwd:"",
                                
                            }}

                            onSubmit={async(values) => {
                                await apiRequestNoToken('post', 'http://localhost:3001/registro', values).then((response) => {
                                    alert("Usuario registrado correctamente")
                                    window.location.href = "/login"
                                }).catch((error) => {
                                    alert("ERROR AL REGISTRAR USUARIO")
                                })
                            }}
                           
                           
                            >
                            <Form action="">
                                <h1>Registro</h1>
                                <div className="form-group mb-3">
                                    <label htmlFor="lblRut" className="form-label">Rut</label>
                                    <Field type="text" className="form-control"  name="rut" required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lblNombre" className="form-label">Nombre</label>
                                    <Field type="text" className="form-control"  name="nombre" required/>
                                </div>
                                    
                                <div className="form-group mb-3">
                                    <label htmlFor="lblApellido" className="form-label">Apellido</label>
                                    <Field type="text" className="form-control" name="apellido" required/>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="lblcorreo" className="form-label">Correo electrónico</label>
                                    <Field type="email" className="form-control"  name="email" id="correo" required/>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="lblpassword">Contraseña</label>
                                    <Field type="password" className="form-control"  name="pwd" id="password" required/>
                                </div>

                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Registrar</button>
                                    <button type="reset" className="btn btn-danger">Limpiar</button>
                                </div>
                            </Form>
                            </Formik>

                            
                        </div>  
                    </div>
                </div>  
            </div>
    </div> 
        
    )
}

export default Registro