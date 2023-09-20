import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Cart({ cart , setCart}) {

    const [products, setProducts] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [summary, setSummary] = useState([]);
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);
    

    const handleShow = () => setShow(true);
    const handleAnswer = () => setShow(true);

    const deleteFromCart = (product) => {
        const newCart = cart.filter((item) => item.id !== product.id)
        setCart(newCart)
    }

    

    function changeQuantity(p, quantity) {

        let cartProduct = [];
    
    
        products.map((product) => {
          if (product.id === p.id) {
            product.quantity = quantity;
          }
          cartProduct.push(product);
        });
    
        setTotalOrder(calculateTotal());
    
        setProducts(cartProduct);
    
        cartProduct = cartProduct.map((cart)=>{
          return {
            productId: cart.productId,
            quantity: cart.quantity
          };
        });
    
    
    
       localStorage.setItem("cart", JSON.stringify(cartProduct));
       
      }

    function calculateTotal(){

        let totalPrice = 0;
        products.map((product) => {
          totalPrice += product.price * product.quantity;
        });
    
        return totalPrice;
    }
    
  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart.map((product, index) => (
          <div key={index}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img src={product.image} alt={product.title} style={{width: "120px", height: "120px"}} />
            <button onClick={() => deleteFromCart(product)}>Remove</button>
            <div>
                
                <Button onClick={() => {
                    if( product.quantity - 1 === 0){
                        handleShow();
                    }
                    if(answer){
                        changeQuantity(product, product.quantity - 1);
                    }
                    setAnswer(false);
                                
                    }}
                    variant="outline-danger"
                >
                    -
                </Button>
                <Button variant="light" disabled="true">
                    {product.quantity}
                </Button>
                <Button onClick={() => {
                    product.quantity + 1;
                    changeQuantity(product, product.quantity + 1);
                    }}
                    variant="outline-success"
                >
                  +
                </Button>

                </div>
                <div>
                <div className="col-sm-4 col-lg-3">
              <div className="p-5 text-left ">
                
              </div>
            </div>
          </div>
        </div>
                
            
        ))}
        <ListGroup variant="flush">
                  <ListGroup.Item active>Order Summary </ListGroup.Item>

                  <ListGroup.Item>
                    Order Total $
                    <b>
                      {new Intl.NumberFormat().format(
                        totalOrder + totalOrder
                      )}
                    </b>
                  </ListGroup.Item>
                </ListGroup>
        <Button><Link to="/confirmation">Pay</Link></Button>

      </div>
    </div>
  );
}
