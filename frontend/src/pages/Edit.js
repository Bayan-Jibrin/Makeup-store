import { useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import Alert from "../components/Alert";
import { useAlert } from "../hooks/useAlert";
import { AuthContext } from "../context/AuthContext";

const Edit = () => {
  const { id } = useParams();
  const { alert, showAlert } = useAlert();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    productType: "",
    image_link: "",
  });


  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    
    if (!response.ok) {
      let Error=json.error;
      
      if(Array.isArray(json.error)) {
        
        const arr = json.error.map((element, i) => (
          <span key={i}>
            * {element}
            <br />
          </span>
        ));
        Error=arr;
      }
      showAlert(true, "danger",Error);
    }
    if (response.ok) {
      setFormData({
        name: "",
        brand: "",
        price: "",
        description: "",
        productType: "",
        image_link: "",
      });
      showAlert(true, "success", "Product Modified ..");
    }
  };

  const fetchProductDetails = async () => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    if (response.ok) {
      const { name, brand, price, description, productType, image_link } = data;
      setFormData({
        name,
        brand,
        price,
        description,
        productType,
        image_link,
      });
    }
  };
  useEffect(() => {
    if (id && formData !== "") {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Product</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={handleChange}
        name="name"
        value={formData.name}
      />

      <label>Brand:</label>
      <input
        type="text"
        onChange={handleChange}
        name="brand"
        value={formData.brand}
      />

      <label>Price:</label>
      <input
        type="text"
        onChange={handleChange}
        name="price"
        value={formData.price}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={handleChange}
        name="description"
        value={formData.description}
      />

      <label>Product Type:</label>
      <input
        type="text"
        onChange={handleChange}
        name="productType"
        value={formData.productType}
      />

      <label>Image Link:</label>

      <input
        type="text"
        onChange={handleChange}
        name="image_link"
        value={formData.image_link}
      />

      <button className="add_button">Edit</button>

      {alert && <Alert {...alert} removeAlert={showAlert} />}
    </form>
  );
};

export default Edit;
