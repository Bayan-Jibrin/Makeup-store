import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { cart } = useContext(CartContext);
  const { user , admin } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };

  return (
    <div className="Navbar_container">
      <p>SEPHORA</p>
      <div className="Navbar_content">
        <p>
          <Link to={`cart`}>My Cart({cart.length})</Link>
        </p>
        {user ? (
          <p onClick={handleClick}>Log Out</p>
        ) : (
          <div className="Navbar_content-inner">
            <p>
              <Link to={`login`}>Login</Link>
            </p>

            <p>
              <Link to={`signup`}>Signup</Link>
            </p>
          </div>
        )}

        {admin && <p>
          <Link to={`adminArea`}>Admin Area</Link>
        </p>}
      </div>
    </div>
  );
};

export default Navbar;
