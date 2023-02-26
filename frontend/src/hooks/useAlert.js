import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return { alert, showAlert };
};
