import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../api";
import { useParams, Link } from "react-router-dom";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function singleProduct() {
      try {
        const data = await fetchSingleProduct(params.productId); 
        setSingleProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    singleProduct();
  }, );


  return (
    <div>
      <h1>Storefront</h1>
      <img src={singleProduct.image} />
      <div>{singleProduct.title}</div>
      <div>{singleProduct.price}</div>
      <div>{singleProduct.description}</div>
      <div>{singleProduct.category}</div>
      <Link to="/">Go Back </Link>
    </div>
  );
}