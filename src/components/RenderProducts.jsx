import { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function RenderProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });

  const [sortBy, setSortBy] = useState(""); 

  useEffect(() => {
    async function fetchProductData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductData();
  }, []);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const filterProducts = () => {
    
    let filteredProducts = products.filter((product) => {
      const { title, image, description, category, price } = product;
      return (
        title.toLowerCase().includes(filter.title.toLowerCase()) &&
        image.toLowerCase().includes(filter.image.toLowerCase()) &&
        description.toLowerCase().includes(filter.description.toLowerCase()) &&
        category.toLowerCase().includes(filter.category.toLowerCase()) &&
        (filter.price === "" || price <= parseFloat(filter.price))
      );
    });

    
    if (sortBy === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  return (
    <div className="confirm">
      <h1>Storefront</h1>

      <div className="filters">
      <select name="sortBy" onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={filter.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filter.category}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={filter.description}
          onChange={handleFilterChange}
        />
        <input className="bold"
          type="number"
          name="price"
          placeholder="Price"
          value={filter.price}
          onChange={handleFilterChange}
        />
      </div>
      <div className="product-container">
        {filterProducts().map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleClick(product.id)}>See Details</button>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}