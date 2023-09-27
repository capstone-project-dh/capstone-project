import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const [products, setProducts] = useState(cart);
  const [totalOrder, setTotalOrder] = useState(0);
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    setProducts(cart);
    setTotalOrder(calculateTotal(cart));
  }, [cart]);

  function calculateTotal(cart) {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  }

  function deleteFromCart(product) {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  }

  function changeQuantity(product, quantity) {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity };
      }
      return p;
    });

    setProducts(updatedProducts);
    setCart(updatedProducts);
    setTotalOrder(calculateTotal(updatedProducts));

    
    const cartProduct = updatedProducts.map((cart) => {
      return {
        productId: cart.productId,
        quantity: cart.quantity,
      };
    });

    localStorage.setItem("cart", JSON.stringify(cartProduct));
  }

  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart.map((product, index) => (
          <div key={index}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "120px", height: "120px" }}
            />
            <button onClick={() => deleteFromCart(product)}>Remove</button>
            <div>
              <Button
                onClick={() => {
                  if (product.quantity - 1 === 0) {
                    handleShow();
                  } else {
                    changeQuantity(product, product.quantity - 1);
                  }
                  setAnswer(false);
                }}
                variant="outline-danger"
              >
                -
              </Button>
              <Button variant="light" disabled={true}>
                {product.quantity}
              </Button>
              <Button
                onClick={() => {
                  changeQuantity(product, product.quantity + 1);
                }}
                variant="outline-success"
              >
                +
              </Button>
            </div>
          </div>
        ))}
        <ListGroup variant="flush">
          <ListGroup.Item active>Order Summary </ListGroup.Item>
          <ListGroup.Item>
            Order Total $
            <b>
              {new Intl.NumberFormat().format(totalOrder + totalOrder)}
            </b>
          </ListGroup.Item>
        </ListGroup>
        <Button>
          <Link to="/confirmation">Pay</Link>
        </Button>
      </div>
    </div>
  );
}