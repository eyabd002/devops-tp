import { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products";

const ProductsPage = () => {
  const [sort, setSort] = useState("default");

  // No search — just use all products
  let list = [...productsData];

  // Sorting logic
  if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);

  return (
    <section className="container py-5">

      {/* SORT ONLY (NO SEARCH BAR) */}
      <div className="d-flex justify-content-end mb-4">
        <select
          className="form-select"
          style={{ width: 150 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="row g-4">
        {list.map((p) => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
            <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="text-muted">{p.price} DT</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ProductsPage;
