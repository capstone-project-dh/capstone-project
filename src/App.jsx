import { useEffect, useState } from "react";
import "./index.css";
import RenderProducts from "./components/RenderProducts";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./components/SingleProduct";
import Login from "./components/Login";
import NavBar from './components/NavBar';
import Logout from "./components/Logout";
import { useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import { fetchProducts } from "./api";
import Confirmation from "./components/Confirmation";

const App = () => {

  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts () {
      try {
        const productsData = await fetchProducts()
        
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    getProducts()
  }, [])


    useEffect(() => {
        setToken(localStorage.getItem("userToken"))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("userToken")

        if (token) {
        setIsLoggedIn(true)
        } else {
        setIsLoggedIn(false);
    }
    }, [token]);

    const handleLogout = () => {
        setToken("");
        localStorage.clear();
    };

    const addToCart = product => {
      setCart([...cart, {...product, quantity: 1}])
    }

  return (
    <div>
      <NavBar setToken={setToken} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      
      <Routes>
        <Route path = "/" element = {<RenderProducts products={products} cart={cart} addToCart={addToCart} />} />
        <Route path = "/products/:productId" element = {<SingleProduct />} /> 
        <Route path = "/login" element = {<Login setToken = {setToken}/>} />
        <Route path = "/logout" element = {<Logout setToken = {setToken} />} />
        <Route path = "/cart" element = {<Cart cart={cart} setCart={setCart} />} />
        <Route path = "/confirmation" element = {<Confirmation/>} />
      </Routes>
    </div>
  );
};

export default App;

