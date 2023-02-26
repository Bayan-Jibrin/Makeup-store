import { BrowserRouter,Routes,Route , Navigate } from "react-router-dom";
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import './style/home.scss'
import Details from "./pages/Details";
import ProductForm from "./pages/ProductForm"
import Edit from "./pages/Edit"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
         <Navbar/>
         
          <Routes>
            <Route path="/" element={  <Home/> }/>
            <Route path="/product/:id" element={<Details />} />
            <Route path="/login" element={ !user ? <Login /> : <Navigate to='/'/>} />
            <Route path="/signup" element={ !user ? <Signup /> :<Navigate to='/'/>} />
            <Route path="/cart" element={user ?<Cart/> : <Navigate to='/login'/>} />
            <Route path="/adminArea" element={<Admin />} />
            <Route path="/adminArea/addProduct" element={<ProductForm />} />
            <Route path="/adminArea/editProduct/:id" element={<Edit />} />

          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
