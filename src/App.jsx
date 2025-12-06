<p>TP PR test</p>

import { Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav.jsx";
import Footer from "./Components/Footer.jsx";

import Landing from "./Components/Landing.jsx";
import Showroom from "./Components/Showroom.jsx";
import New from "./Components/New.jsx";
import Test from "./Components/Test.jsx";

import ProductsPage from "./pages/ProductsPage.jsx";
import Category from "./pages/Category.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import Contact from "./Components/Contact.jsx";
import Blog from "./Components/Blog.jsx";

function App() {
  return (
    <>
      <Nav />

      <main>
        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Landing />
                <Showroom />
                <New />
                <Test />
              </>
            }
          />

          {/* PRODUCT SYSTEM */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* OTHER */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* FALLBACK */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;

