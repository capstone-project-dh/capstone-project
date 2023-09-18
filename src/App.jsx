import React, { useEffect, useState } from "react";
import "./index.css";
import RenderProducts from "./components/RenderProducts";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./components/SingleProduct";
import Login from "./components/Login";
import NavBar from './components/NavBar';


const App = () => {
  const [product, setProduct] = useState([]);

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path = "/" element = {<RenderProducts />} />
        <Route path = "/products/:productId" element = {<SingleProduct />} /> 
        <Route path = "/login" element = {<Login />} />
        {/* <Route path = "/cart" element = {<Cart />} /> */}
      </Routes>
    </div>
  );
};

export default App;