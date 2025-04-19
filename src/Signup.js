// import React, { useState } from "react";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup Successful!");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup Successful!");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup Successful!");
//       navigate("/home"); // Redirect after successful signup
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Sign Up</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSignup} style={styles.form}>
//         <input
//             type="text"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={styles.input}
//           />
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
//             Sign Up
//           </button>
//         </form>
//         <p style={styles.text}>
//           Already registered? <Link to="/login" style={styles.link}>Login</Link>
//         </p>
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
//     height: "100vh",
//     background: "linear-gradient(to right, #141e30, #243b55)",
//   },
//   card: {
//     width: "400px",
//     height: "450px",
//     padding: "30px",
//     backgroundColor: "#fff",
//     borderRadius: "15px",
//     boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//     textAlign: "center",
//     backgroundImage: "url('https://source.unsplash.com/400x450/?abstract,tech')", // Background Image
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   title: {
//     marginBottom: "20px",
//     color: "#fff",
//     fontSize: "22px",
//     fontWeight: "bold",
//     textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   input: {
//     width: "85%",
//     padding: "12px",
//     margin: "10px 0",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "16px",
//     backgroundColor: "rgba(255,255,255,0.8)",
//     outline: "none",
//   },
//   button: {
//     width: "85%",
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
//   text: {
//     marginTop: "15px",
//     color: "#fff",
//     fontSize: "14px",
//     textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
//   },
//   link: {
//     color: "#00c3ff",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
// };

// export default Signup;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      navigate("/home"); // Redirect after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <div className="signup-text" style={{ marginTop: "10px" }}>
        <p style={{ color: "black" }}>

          Already registered? <Link to="/login" style={{ color: "#007bff", fontWeight: "bold" }}>Login</Link>
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
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    backgroundImage: "url('https://source.unsplash.com/400x500/?abstract,tech')", // Background Image
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
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
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  text: {
    marginTop: "15px",
    color: "#fff",
    fontSize: "14px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  },
  link: {
    color: "#00c3ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
