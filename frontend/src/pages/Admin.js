import React from "react";
import { useEffect, useState ,useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const [name, setname] = useState("");
  const [products, setproducts] = useState([]);
  const { user } = useContext(AuthContext);
  const handleSearch = (e) => {
    setname(e.target.value); 
  };

  const handleClick = async (id) => {
    console.log(id);
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.token}`,
      }
    });

    if (response.ok) {
      await searchProducts()
    }
  };

  const searchProducts = async () => {
    const response = await fetch(`/api/products/search/prods?name=${name}`);
    const data = await response.json();
    if (response.ok) {
      setproducts(data);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [name]);

  return (
    <div className="admin">
      <div className="admin_header">
        <input
          type="text"
          placeholder="Search Product to edit..."
          onChange={handleSearch}
        />

        <Link to={`addProduct`}>
          <button>Add New Product</button>
        </Link>
      </div>

      <div className="grid">
        {products &&
          products.map((product) => {
            const { _id, name, image_link } = product;
            return (
              <div className="card" key={_id}>
                <div className="card__internal">
                  <div className="card__internal-image">
                    <img src={image_link} alt={name} />
                  </div>
                  <div className="card__internal-content">
                    <h1>{name}</h1>
                    <div className="card__internal-content_buttons">
                      <Link to={`editProduct/${_id}`}>
                        <button>Edit</button>
                      </Link>
                      <button onClick={() => handleClick(_id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Admin;
