import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: dispatchCart } = useContext(CartContext);

  const deleteCart = async () => {
    const response = await fetch(`/api/cart/deleteCart`);
    if (response.ok) {
      dispatchCart({ type: "DEL" });
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SETADMIN", payload: false });
    await deleteCart();
  };
  return { logout };
};
