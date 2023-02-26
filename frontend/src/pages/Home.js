import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Types from "../components/Types";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [types, setTypes] = useState([]);

  const [buttonState, setButtonState] = useState("Hi");
  const [home, sethome] = useState(true);

  function toggleHome(Value) {
    sethome(Value);
  }

  function toggleActive(ProdType) {
    setButtonState(ProdType);
    sethome(false);
  }

  const fetchOneType = async () => {
    const response = await fetch(
      `/api/products/P/type?productType=${buttonState}`
    );
    const data = await response.json();
    if (response.ok) {
      setProducts(data);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    if (response.ok) {
      setProducts(data);
    }
  };

  const fetchTypes = async () => {
    const response = await fetch("/api/products/Ps/types");
    const data = await response.json();
    if (response.ok) {
      setTypes(data);
    }
  };

  useEffect(() => {
    if (home) {
      fetchProducts();
    } else {
      fetchOneType();
    }
    fetchTypes();
  }, [home, buttonState]);

  return (
    <>
      <Types
        types={types}
        toggleActive={toggleActive}
        toggleHome={toggleHome}
      />
      <div className="grid">
        {products &&
          products.map((product) => {
            const { _id, name, image_link, price, productType } = product;
            return (
              <div className="card" key={_id}>
                <Link to={`product/${_id}`}>
                  <div className="card__internal">
                    <div className="card__internal-image">
                      <img src={image_link} alt={name} />
                    </div>
                    <div className="card__internal-content">
                      <h1>{name}</h1>
                      <p>${price}</p>
                      <p>{productType}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
