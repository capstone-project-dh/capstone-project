import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function NavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("userToken")

        if (token) { setIsLoggedIn(true)}
    }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <div>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          </div>
        ) : (
          
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        
        
      </ul>
    </nav>
  );
}
 