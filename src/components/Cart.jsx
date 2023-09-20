
export default function Cart({ cart , setCart}) {
    const deleteFromCart = (product) => {
        const newCart = cart.filter((item) => item.id !== product.id)
        setCart(newCart)
    }
    
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />
            <button onClick={() => deleteFromCart(product)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
