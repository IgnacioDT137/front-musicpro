import UsuarioForm from "../components/UsuarioForm";
import UsuarioEdit from "../components/UsuarioEdit";
import ErrorUser from "../components/ErrorUser";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const CrudUsuario = () => {

    if (cookies.get('tipo') != 4) {
        return (
            <ErrorUser />
        )
    }

    return(
        <div>
            <div className="container-fluid bg-light mt-5 mb-5">
                <div className="row">
                    <div className="col-3 text-dark p-3">
                        <div className="card">
                            <div className="card-body">
                                <UsuarioForm />
                            </div>
                        </div>
                    </div>
                    <div className="container col-9 p-3">
                        <UsuarioEdit />
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}
export default CrudUsuario