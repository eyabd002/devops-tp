const Showroom = () => {
  return (
    <section className="container py-5 text-center">
      <h2 className="fw-bold mb-4">Showroom</h2>

      <div className="row g-4 justify-content-center">


        <div className="col-6 col-md-4 col-lg-3">
          <div className="card shadow-sm showroom-card p-3">
            <img
              src="/image/sofa9.jpg"
              className="card-img-top rounded"
              alt="Premium Sofa"
              style={{ height: 220, objectFit: "cover" }}
            />
            <h5 className="mt-3">Premium Sofa</h5>
            <p className="text-muted">250 DT</p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card shadow-sm showroom-card p-3">
            <img
              src="/image/wardrobe.jpg"
              className="card-img-top rounded"
              alt="Modern Wardrobe"
              style={{ height: 220, objectFit: "cover" }}
            />
            <h5 className="mt-3">Modern Wardrobe</h5>
            <p className="text-muted">300 DT</p>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card shadow-sm showroom-card p-3">
            <img
              src="/image/bed.jpg"
              className="card-img-top rounded"
              alt="Luxury Bed"
              style={{ height: 220, objectFit: "cover" }}
            />
            <h5 className="mt-3">Luxury Bed</h5>
            <p className="text-muted">450 DT</p>
          </div>
        </div>

      </div>

      <style>
        {`
          .showroom-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .showroom-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </section>
  );
};

export default Showroom;
