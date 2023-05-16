import UsuarioForm from "../components/UsuarioForm";
import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const EditarUsuario = () => {

    if (cookies.get('tipo') != 4) {
        return (
            <ErrorUser />
        )
    }

    return (
        <div className="row mw-100">
            <div className="col col-6 offset-3 mt-5">
                <div className="card">
                    <div className="card-body">
                        <UsuarioForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarUsuario