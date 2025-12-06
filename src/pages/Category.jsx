import { useParams, Link } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  // Prevent crash if category is undefined
  const normalizedCategory = category
    ? category.replace(/-/g, "").toLowerCase()
    : "";

  const categoryProducts = {
    bedrooms: {
      regular: [
        { id: 1001, name: "Cozy Bed", price: 350, img: "bed.jpg" },
        { id: 1002, name: "Modern Platform Bed", price: 499, img: "bed2.jpg" },
        { id: 1003, name: "Luxury King Bed", price: 899, img: "bed3.jpg" },
        { id: 1004, name: "Minimalist Grey Bed", price: 599, img: "bed9.jpg" },
        { id: 1005, name: "Cozy Bed", price: 350, img: "bed5.jpg" },
        { id: 1006, name: "Modern Platform Bed", price: 499, img: "bed6.jpg" },
        { id: 1007, name: "Luxury King Bed", price: 899, img: "bed7.jpg" },
        { id: 1008, name: "Minimalist Grey Bed", price: 599, img: "bed8.jpg" },
      ],

      kids: [
        { id: 1101, name: "Kids Bunk Bed", price: 350, img: "kids.jpg" },
        { id: 1102, name: "Kids Study Desk", price: 120, img: "kids1.jpg" },
        { id: 1103, name: "Kids Wardrobe", price: 180, img: "kids2.jpg" },
        { id: 1104, name: "Pink Fairy Bed", price: 299, img: "kids3.jpg" },
        { id: 1105, name: "Car-Shaped Bed", price: 399, img: "kids4.jpg" },
        { id: 1106, name: "Kids Bunk Bed", price: 350, img: "kids5.jpg" },
        { id: 1107, name: "Kids Study Desk", price: 120, img: "kids6.jpg" },
        { id: 1108, name: "Kids Wardrobe", price: 180, img: "kids7.jpg" },
        { id: 1109, name: "Pink Fairy Bed", price: 299, img: "kids8.jpg" },
        { id: 1110, name: "Car-Shaped Bed", price: 399, img: "kids9.jpg" },
      ],
    },

    livingroom: [
      { id: 201, name: "Living Room Sofas", price: 600, img: "living1.jpg" },
      { id: 202, name: "Modern Terquase Living", price: 300, img: "living2.jpg" },
      { id: 203, name: "Nature Living", price: 120, img: "living3.jpg" },
      { id: 204, name: "Modern", price: 120, img: "living6.jpg" },
      { id: 205, name: "Modern Terquase Living", price: 300, img: "living4.jpg" },
      { id: 206, name: "Nature Living", price: 120, img: "living5.jpg" },
      { id: 207, name: "Modern", price: 120, img: "living7.jpg" },
    ],

    diningroom: [
      { id: 301, name: "Dining Table Set", price: 500, img: "dining.jpg" },
      { id: 302, name: "Marble Dining Table", price: 900, img: "dining2.jpg" },
      { id: 303, name: "6 Chair Dining Set", price: 700, img: "dining3.jpg" },
      { id: 304, name: "Dining Table Set", price: 500, img: "dining1.jpg" },
      { id: 305, name: "Marble Dining Table", price: 900, img: "dining5.jpg" },
      { id: 306, name: "Marble Dining Table", price: 900, img: "dining6.jpg" },
      { id: 307, name: "6 Chair Dining Set", price: 700, img: "dining7.jpg" },
    ],

    sofas: [
      { id: 401, name: "Luxury Couch", price: 200, img: "sofa1.jpg" },
      { id: 402, name: "Luxury Couch", price: 200, img: "sofa2.jpg" },
      { id: 403, name: "Leather Sofa", price: 750, img: "sofa3.jpg" },
      { id: 404, name: "Luxury Couch", price: 200, img: "sofa4.jpg" },
      { id: 405, name: "Leather Sofa", price: 750, img: "sofa6.jpg" },
      { id: 406, name: "Leather Sofa", price: 750, img: "sofa7.jpg" },
      { id: 407, name: "Luxury Couch", price: 200, img: "sofa8.jpg" },
      { id: 408, name: "Leather Sofa", price: 750, img: "sofa9.jpg" },
    ],
  };

  const data = categoryProducts[normalizedCategory] || [];

  return (
    <div className="container text-center py-5">
      <h2 className="fw-bold mb-4 text-capitalize">
        {category?.replace("-", " ")}
      </h2>

      {/* Bedrooms special layout */}
      {normalizedCategory === "bedrooms" && (
        <>
          <h3 className="fw-bold mb-3">Bedroom Sets</h3>
          <div className="row g-4 mb-5">
            {data.regular.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                <div className="card p-3">
                  <img src={`/image/${p.img}`} className="card-img-top rounded" />
                  <h5 className="mt-2">{p.name}</h5>
                  <p>{p.price} DT</p>

                  <Link to={`/product/${p.id}`} className="btn btn-dark w-100 mt-2">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <h3 className="fw-bold mb-3">Kids Bedroom</h3>
          <div className="row g-4">
            {data.kids.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                <div className="card p-3">
                  <img src={`/image/${p.img}`} className="card-img-top rounded" />
                  <h5 className="mt-2">{p.name}</h5>
                  <p>{p.price} DT</p>

                  <Link to={`/product/${p.id}`} className="btn btn-dark w-100 mt-2">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* All other categories */}
      {normalizedCategory !== "bedrooms" && (
        <div className="row g-4">
          {data.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <div className="card p-3">
                <img src={`/image/${p.img}`} className="card-img-top rounded" />
                <h5 className="mt-2">{p.name}</h5>
                <p>{p.price} DT</p>

                <Link to={`/product/${p.id}`} className="btn btn-dark w-100 mt-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
