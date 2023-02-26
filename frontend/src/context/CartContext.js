import { createContext, useReducer, useLayoutEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return { cart: action.payload };
    case "DEL":
        return { cart: [] };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  const { user } = useContext(AuthContext);
  
  
  const fetchCart = async () => {
    const response = await fetch(`/api/cart`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "ALL", payload: data });
    }else{
      console.log(data);
    }
  };

  useLayoutEffect(() => {
    if (user) fetchCart();
  }, [user]);

 // console.log("Cart state :", state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
