import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../api";
import { useParams, Link } from "react-router-dom";
import "../index.css";

export default function SingleProduct({ addToCart }) {
  const [singleProduct, setSingleProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function loadSingleProduct() {
      try {
        const data = await fetchSingleProduct(params.productId);
        setSingleProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadSingleProduct();
  }, [params.productId]);

  const handleAddToCart = () => {
    addToCart(singleProduct);
  };

  return (
    <div className="confirm">
    <div className="single-product">
      <div className="image">
        <img src={singleProduct.image} alt={singleProduct.title} />
      </div>
      <div className="details">
        <h1>{singleProduct.title}</h1>
        <div className="info">
          <div className="descriptor">
            <h6>Price:</h6>
            <p>${singleProduct.price}</p>
          </div>
          <div className="descriptor">
            <h6>Description:</h6>
            <p>{singleProduct.description}</p>
          </div>
          <div className="descriptor">
            <h6>Category:</h6>
            <p>{singleProduct.category}</p>
          </div>
        </div>
        <Link to="/">Go Back</Link>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
    </div>
  );
}