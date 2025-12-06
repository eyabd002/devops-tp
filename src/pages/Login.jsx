import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    alert("Logged in (demo)");
    navigate("/");
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4">Sign In</h2>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn btn-dark w-100">Sign In</button>
      </form>

      <p className="mt-3">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
};

export default Login;
