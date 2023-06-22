import { useLocation, useParams } from "react-router-dom";

const FormularioPago = () => {

    const location = useLocation()

    return (
        <div>
            <form method="post" action={location.state.url}>
                <input type="hidden" name="token_ws" value={location.state.token} />
                <input type="submit" value="Ir a pagar" />
            </form>
        </div>
    )
}

export default FormularioPago