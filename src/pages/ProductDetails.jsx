import { useParams } from "react-router-dom";
import productsData from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const numericId = Number(id);

  // CATEGORY DATABASE
  const categoryProducts = {
    bedrooms: [
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

  // MERGE ALL PRODUCTS INTO ONE LIST
  const mergedProducts = [
    ...productsData.map((p) => ({
      id: Number(p.id),
      title: p.title,
      price: p.price,
      description: p.description || "High-quality furniture.",
      image: p.image,
    })),

    ...Object.values(categoryProducts)
      .flat()
      .map((p) => ({
        id: p.id,
        title: p.name,
        price: p.price,
        description: "High-quality furniture.",
        image: `/image/${p.img}`,
      })),
  ];

  const product = mergedProducts.find((p) => p.id === numericId);

  if (!product)
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <h4 className="text-muted">{product.price} DT</h4>

          <p className="mt-3">{product.description}</p>

          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Color:</strong> Various colors available
            </li>
            <li className="list-group-item">
              <strong>Height:</strong> Standard height
            </li>
            <li className="list-group-item">
              <strong>Width:</strong> Standard width
            </li>
            <li className="list-group-item">
              <strong>Material:</strong> Wood / Fabric
            </li>
            <li className="list-group-item">
              <strong>Fabric Quality:</strong> Premium Soft Touch
            </li>
            <li className="list-group-item">
              <strong>Available Colors:</strong> White • Grey • Brown • Beige
            </li>
            <li className="list-group-item">
              <strong>Warranty:</strong> 2 Years
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

