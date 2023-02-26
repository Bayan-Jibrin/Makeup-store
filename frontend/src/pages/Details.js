import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AiOutlineMinus, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";
import { useAlert } from "../hooks/useAlert";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { dispatch, cart } = useContext(CartContext);
  const { alert, showAlert } = useAlert();

  const { user } = useContext(AuthContext);

  const [toggle, setToggle] = useState(false);

  let qty = 1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name) {
      qty = cart[i].qty;
    }
  }
  const actToCart = async (action) => {
    if (!user) {
      showAlert(true, "danger", "You must be logged in");
      return;
    }
    const response = await fetch(`/api/cart/${action}/${product.name}`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "ALL", payload: data });
    }
  };

  const fetchProductDetails = async () => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    if (response.ok) {
      setProduct(data);
    }
  };

  useEffect(() => {
    if (id && product !== "") {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <div className="container">
      {Object.keys(product).length === 0 ? (
        <div className="">Loading...</div>
      ) : (
        <div className="container__internal">
          <div className="container__internal-image">
            <img src={product.image_link} alt={product.name} />
          </div>
          <div className="container__internal-content">
            <h1>{product.name}</h1>
            <div className="container__internal-content_fragment">
              <h2>${product.price}</h2>
            </div>
            <h3>{product.productType}</h3>
            <p>{product.description}</p>
            <div>
              {toggle ? (
                <div className="container__internal-content_icons">
                  {qty <= 1 ? (
                    <i
                      onClick={() => {
                        actToCart("remove");
                        setToggle((toggle) => !toggle);
                      }}
                    >
                      <AiOutlineDelete />
                    </i>
                  ) : (
                    <i
                      onClick={() => {
                        actToCart("dec");
                      }}
                    >
                      <AiOutlineMinus />
                    </i>
                  )}
                  <div>{qty}</div>
                  <i
                    onClick={() => {
                      actToCart("add");
                    }}
                  >
                    <AiOutlinePlus />
                  </i>
                </div>
              ) : (
                <div className="container__internal-content_add">
                  {qty > 1 ? (
                    <div onClick={() => setToggle((toggle) => !toggle)}>
                      {qty}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        actToCart("add");
                        if (!toggle && user) {
                          setToggle((toggle) => !toggle);
                        }
                      }}
                    >
                      Add to Cart
                    </div>
                  )}
                  <div></div>
                </div>
              )}
            </div>
            {alert && <Alert {...alert} removeAlert={showAlert} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
