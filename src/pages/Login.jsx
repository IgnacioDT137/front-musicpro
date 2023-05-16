import { Formik, Field, Form } from 'formik';
import { apiRequestNoToken } from "../api/funcionesUsers";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Login = () => {

    const navigate = useNavigate()

    return(
        <div>
            <div className="row mw-100">
                <div className="col col-6 offset-3 mt-5">
                    <div className="card">
                        <div className="card-body">
                        <Formik
                            initialValues={{
                                email: "",
                                pwd: ""
                            }}

                            onSubmit={async(values) => {
                                await apiRequestNoToken('post', 'https://api-musicpro.onrender.com/login', values).then(async (response) => {
                                    cookies.set('usuario', response.data.nombre, {path:"/"})
                                    cookies.set('rut', response.data.rut, {path:"/"})
                                    cookies.set('email', response.data.email, {path:"/"})
                                    cookies.set('tipo', response.data.tipo, {path:"/"})
                                    alert("Bienvenido a MusicPro")
                                    window.location.href = "/"
                                }).catch((error) => {
                                    alert("ERROR, USUARIO NO ENCONTRADO")
                                })
                            }}
                        >
                            <Form>
                                <legend className="text-center mb-3">Bienvenido a MusicPro</legend>
                                <div className="form-group mb-3">
                                    <label htmlFor="lblEmail" className="form-label">Correo electrónico</label>
                                    <Field type="email" className="form-control" name="email" required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lblPwd" className="form-label">Contraseña</label>
                                    <Field type="password" className="form-control" name="pwd" required/>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                    <button type="reset" className="btn btn-danger">Limpiar</button>
                                    <a href="/registro">No tengo cuenta</a>
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

export default Login