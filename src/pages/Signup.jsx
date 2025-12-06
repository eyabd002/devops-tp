import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();


    if (pass !== confirmPass) {
      setError("Passwords do not match!");
      return;
    }

    alert("Account created successfully (demo).");
    navigate("/");
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4 text-center">Create Your Account</h2>
      
      <form onSubmit={submit} className="mx-auto p-4 shadow rounded" style={{ maxWidth: 450, background: "white" }}>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <label className="form-label">Full Name</label>
        <input 
          className="form-control mb-3"
          placeholder="Flen fleni"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label className="form-label">Email</label>
        <input 
          type="email"
          className="form-control mb-3"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Phone Number</label>
        <input 
          type="tel"
          className="form-control mb-3"
          placeholder="+216 50 000 000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="form-label">Password</label>
        <input 
          type="password"
          className="form-control mb-3"
          placeholder="Minimum 6 characters"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          minLength={6}
        />

        <label className="form-label">Confirm Password</label>
        <input 
          type="password"
          className="form-control mb-3"
          placeholder="Confirm password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100 py-2 mt-2">Create Account</button>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">Sign in</a>
        </p>
      </form>
    </section>
  );
};

export default Signup;
