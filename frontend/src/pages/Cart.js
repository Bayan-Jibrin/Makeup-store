import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AiOutlineDelete } from "react-icons/ai";
import cartimg from "../assets/cart.png";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const { dispatch, cart } = useContext(CartContext);
  const [price, setPrice] = useState(0);

  const { user } = useContext(AuthContext);

  const totals = () => {
    let price = 0;
    cart.map((e, i) => (price = parseFloat(e.price).toFixed(2) * e.qty + price));
    setPrice(price);
  };

  useEffect(() => {
    totals();
  }, [cart]);

  const removeItem = async (name) => {
    if (!user) return;

    const response = await fetch(`/api/cart/remove/${name}`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "ALL", payload: data });
    }
  };

  return (
    <div className="showCart">
      {cart.length ? (
        <section className="details">
          <div className="details_title">
            <h3>Photo</h3>
            <p>Product Name</p>
          </div>
          {cart.map((e) => (
            <div className="details_content" key={e.name}>
              <div className="details_content_img">
                <img src={e.image} alt="" />
              </div>
              <div className="details_content_detail">
                <div>
                  <p>{e.name.slice(0, 20)}...</p>
                  <p>Price : ${e.price}</p>
                  <p>Quantity : {e.qty}</p>
                </div>
              </div>
              <div>
                <i
                  onClick={() => {
                    removeItem(e.name);
                  }}
                >
                  <AiOutlineDelete />
                </i>
              </div>
            </div>
          ))}
          <div className="details_total">
            <h4>Total : ${price}</h4>
          </div>
        </section>
      ) : (
        <div className="empty">
          <p>Your cart is empty</p>
          <img src={cartimg} alt="" />
        </div>
      )}
    </div>
  );
};

export default Cart;
