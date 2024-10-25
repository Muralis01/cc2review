import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
// import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Log the response to ensure you're getting user data
      console.log("User Credential:", userCredential);

      // If userCredential exists, proceed with the login
      if (userCredential.user) {
        console.log("User logged in successfully:", userCredential.user);
        window.location.href = "/";
        toast.success("User logged in  successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("LOGIN ERROR: ", error.message);
      toast.error("Invalid email or password", {
        position: "bottom-center",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
            submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/signup">Register Here</a>
      </p>
      {/* <SignInwithGoogle /> */}
    </form>
  );
}

export default Login;