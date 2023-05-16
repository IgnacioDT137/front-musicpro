import { Formik, Field, Form } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Cookies from "universal-cookie";
import { apiRequestNoToken } from '../api/funcionesUsers';

const cookies = new Cookies()

const CheckOut = () => {

    const { total, carrito, setCarrito, cant_total } = useContext(GlobalContext)
    const navigate = useNavigate();

    return (
        <div className='container d-flex mt-5'>
            <div className='w-75'>
                <Formik
                    initialValues={{
                        nombre: cookies.get('usuario') ? cookies.get('usuario') : "",
                        correo: cookies.get('email') ? cookies.get('email') : "",
                        rut: cookies.get('rut') ? cookies.get('rut') : "",
                        celular: "",
                        despacho: "Retiro en local",
                        direccion: "",
                        seleccionado: ""
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        if (values.despacho == "Retiro en local") {
                            values.direccion = "Tienda de MusicPro";
                        }
                        
                        const data = {
                            metodo: values.seleccionado,
                            total: total,
                            rut: values.rut,
                            prods: carrito,
                            direccion: values.direccion
                        }

                        await apiRequestNoToken('post', 'http://localhost:3001/pagar', data).then(async(response) => {
                            setCarrito([])
                            const msg = response.data.MSG
                            alert(msg)
                            if (data.metodo == "Transferencia") {
                                navigate("/datos-banco")
                            } else {
                                navigate("/transbank")
                            }
                        })
                    }}
                >
                    {({handleSubmit, handleChange, values}) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-body">
                                    <legend>Datos del cliente</legend>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Nombre y Apellido</label>
                                        <Field type="text" className="form-control" onChange={handleChange} value={values.nombre} name="nombre" disabled={cookies.get('usuario')} required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Correo electrónico</label>
                                        <Field type="email" className="form-control" onChange={handleChange} value={values.correo} name="correo" disabled={cookies.get('email')} required/>
                                    </div>
                                    <div className="d-flex w-100 mb-3">
                                        <div className="form-group w-50">
                                            <label className="form-label">RUT</label>
                                            <Field type="text" className="form-control" placeholder="Ej: 123456789-0" onChange={handleChange} value={values.rut} name="rut" disabled={cookies.get('email')} required/>
                                        </div>
                                        <div className="form-group w-50">
                                            <label className="form-label">Celular</label>
                                            <Field type="text" className="form-control" placeholder="Ej: +56 9 0000 0000" onChange={handleChange} value={values.celular} name="celular" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <legend>Seleccione tipo de despacho</legend>
                                    <Field as="select" className="form-select" value={values.despacho} onChange={handleChange} name="despacho" required>
                                        <option value="Retiro en local">Retiro en local</option>
                                        <option value="A domicilio">Despacho a domicilio</option>
                                    </Field>
                                    <div>
                                        {values.despacho == "A domicilio" ? <div className='mt-3'><label>Ingrese su dirección</label><Field value={values.direccion} onChange={handleChange} type="text" placeholder="Ej: Avenida El Cerro 1304, Melipilla" className="form-control" name="direccion"></Field></div> : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <legend>Seleccione un método de pago</legend>
                                    <div className="form-check">
                                        <label className="form-check-label" >
                                            <Field className="form-check-input" type="radio" name="seleccionado" value="WebPAY" required/>
                                            WebPayPLUS
                                        </label>
                                    </div>  
                                    <div className="form-check">
                                        <label className="form-check-label" >
                                            <Field className="form-check-input" type="radio" name="seleccionado" value="Tarjeta de crédito" required />
                                            Tarjeta de crédito
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <label className="form-check-label" >
                                            <Field className="form-check-input" type="radio" name="seleccionado" value="Transferencia"  required/>
                                            Transferencia bancaria
                                        </label>
                                    </div>
                                    <button className={carrito.length == 0 ? "btn btn-primary disabled" : "btn btn-primary"} type='submit' >Completar compra</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="card">
                <div className="card-body">
                    <h3>Productos:</h3>
                    <ul>
                        {carrito.map(i => {
                            return <li>{i.nombre} x {i.cantidad}</li>
                        })}
                    </ul>
                    <hr />
                    <p>{cookies.get('tipo') == 0 && cant_total > 4 ? "Usted tiene un descuento de un 10% por ser miembro y llevar mas de 4 artículos" : ""}</p>   
                    <h3>TOTAL: ${cookies.get('tipo') == 0 && cant_total > 4 ? (total * 0.9) : total}</h3>
                </div>
            </div>
        </div>
    )
}

export default CheckOut