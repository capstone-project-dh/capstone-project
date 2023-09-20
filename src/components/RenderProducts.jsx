import { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import { useNavigate } from "react-router-dom"

export default function RenderProducts({addToCart}) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    async function products() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    products();
  }, []);
 
  const handleClick=(id) => {
    navigate(`/products/${id}`)
  }

  const filterProducts = () => {
    return products.filter((product) => {
      const { title, image, description, category, price } = product;
      return (
        title.toLowerCase().includes(filter.title.toLowerCase()) &&
        image.toLowerCase().includes(filter.image.toLowerCase()) &&
        description.toLowerCase().includes(filter.description.toLowerCase()) &&
        category.toLowerCase().includes(filter.category.toLowerCase()) &&
        (filter.price === "" || price <= parseFloat(filter.price))
      );
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };
  
  return (
    <div>
      <h1>Storefront</h1>

      <div>
        <input
          title="text"
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
          title="description"
          name="description"
          placeholder="Description"
          value={filter.description}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={filter.price}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        {filterProducts().map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() =>handleClick(product.id)}>See Details</button>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    
  )
}


