const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-5 pt-5 pb-3">
      <div className="container">
        
        <div className="row">

          <div className="col-md-4 mb-4">
            <h4 className="footer-title">ProFurniture</h4>
            <p className="footer-text">
              Elegant, modern and high-quality furniture crafted to make your home stand out.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="footer-subtitle">Contact</h5>
            <ul className="footer-links">
              <li><i className="fa-solid fa-location-dot"></i> Monastir, Tunisia</li>
              <li><i className="fa-solid fa-phone"></i> +216 59 585 213</li>
              <li><i className="fa-solid fa-envelope"></i> support@profurniture.com</li>
            </ul>

            <div className="footer-socials">
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

        </div>

        <hr className="footer-line" />

        <p className="text-center footer-copy">
          © {year} ProFurniture — All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
