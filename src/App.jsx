import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrudUsuario from './pages/CrudUsuarios';
import Login from './pages/Login'
import Registro from "./pages/Registro";
import EditarUsuario from "./pages/EditarUsuario";
import Carrito from "./components/Carrito";
import Catalogo from "./pages/Catalogo";
import Tienda from "./pages/Tienda"
import OrdenesPedidos from "./pages/OrdenesPedidos"
import RegistroPagos from "./pages/RegistroPagos";
import { GlobalProvider } from "./context/GlobalContext";
import CheckOut from "./pages/CheckOut";
import Transbank from "./components/Transbank";
import DatosBanco from "./components/DatosBanco";
import Pagos from "./pages/RegistroPagos";
import Entregas from "./pages/RegistroEntregas";
import Vendedor from "./pages/Vendedor";


function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/registro" element={<Registro />} />
          <Route exact path="/crud-usuarios" element={<CrudUsuario />} />
          <Route exact path="/crud-usuarios/editar/:rut" element={<EditarUsuario />} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/" element={<Catalogo />} />
          <Route exact path="/tienda/:id_categoria" element={<Tienda />}/>
          <Route exact path="/OrdenesPedidos" element={<OrdenesPedidos/>}/>
          <Route exact path="/RegistroPagos" element={<RegistroPagos/>}/>
          <Route exact path="/checkout" element={<CheckOut/>}/>
          <Route exact path="/transbank" element={<Transbank/>}/>
          <Route exact path="/datos-banco" element={<DatosBanco/>}/>
          <Route exact path="/pagos" element={<Pagos/>}/>
          <Route exact path="/entregas" element={<Entregas/>}/>
          <Route exact path="/vendedor" element={<Vendedor/>}/>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
