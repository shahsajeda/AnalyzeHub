// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "./firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Login Successful!");
//       navigate("/home");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleLogin} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <button type="submit" style={styles.button}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Internal CSS Styles
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "300vh",
//     // background: "linear-gradient(to right, #141e30, #243b55)",
//   },
//   card: {
//     width: "350px",
//     padding: "25px",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "20px",
//     color: "#333",
//     fontSize: "22px",
//     fontWeight: "bold",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center", // Center inputs in the card
//   },
//   input: {
//     width: "80%", // Fixed width to prevent stretching
//     padding: "12px",
//     margin: "10px 0",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "16px",
//     backgroundColor: "#f5f5f5",
//     outline: "none",
//   },
//   button: {
//     width: "85%", // Match width of inputs
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "16px",
//     transition: "background 0.3s ease",
//     marginTop: "10px",
//   },
//   buttonHover: {
//     backgroundColor: "#0056b3",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button 
            type="submit" 
            style={loading ? styles.buttonLoading : styles.button} 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-text" style={{ marginTop: "10px" }}>
          <p style={{ color: "black" }}>
            Didn't register? <Link to="/" style={{ color: "#007bff", fontWeight: "bold" }}>SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
  },
  card: {
    width: "400px",
    height: "350px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#007bff",
    fontSize: "22px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "85%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    backgroundColor: "rgba(255,255,255,0.8)",
    outline: "none",
  },
  button: {
    width: "85%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease",
    marginTop: "10px",
  },
  buttonLoading: {
    width: "85%",
    padding: "12px",
    backgroundColor: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "not-allowed",
    fontSize: "16px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Login;
