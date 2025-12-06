const Products = () => {
  const items = [
    { img: "bed.jpg", label: "Bedrooms", link: "/category/bedrooms" },
    { img: "living.jpg", label: "Living Room", link: "/category/livingroom" },
    { img: "dining.jpg", label: "Dining Room", link: "/category/diningroom" },
    { img: "sofa.jpg", label: "Sofas", link: "/category/sofas" },
    { img: "chair.jpg", label: "Chairs", link: "/category/chairs" },
    { img: "table.jpg", label: "Tables", link: "/category/tables" },
    { img: "wardrobe.jpg", label: "Wardrobes", link: "/category/wardrobes" },
    { img: "light.jpg", label: "Lighting", link: "/category/lighting" },
  ];

  return (
    <section id="products" className="container text-center py-5">
      <h2 className="fw-bold mb-4">Products</h2>

      <div className="row g-4 justify-content-center">
        {items.map((item, i) => (
          <div className="col-6 col-md-3" key={i}>
            <a href={item.link} className="text-decoration-none text-dark">
              <div className="product-box">

                <div className="product-img">
                  <img
                    src={`/image/${item.img}`}  
                    className="img-fluid rounded"
                    alt={item.label}
                    onError={(e) => (e.target.src = "/image/placeholder.png")}
                  />
                </div>

                <p className="mt-2 fw-semibold">{item.label}</p>

              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
