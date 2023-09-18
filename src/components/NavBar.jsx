import { Link } from 'react-router-dom';
import { useState } from "react";

export default function NavBar() {


 

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>


          <li><Link to="/login">Login</Link></li>
        
        <li>
          <Link to ="/carts">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
 