// // import React from 'react';
// // import Home from './Home';
// // import Signup from "./Signup";
// // import Login from "./Login";
// // import ProtectedRoute from "./PrivateRoute";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// // function App() {
// //   return (
// //       <Routes>
// //         <Route path='/' element={<Login/>}/>
// //         <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
// //       </Routes>
// //   );
// // }

// // export default App;

// // // import React, { useEffect, useState } from "react";
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // // import { auth, onAuthStateChanged } from "./firebaseConfig";
// // // import Home from "./Home";
// // // import Login from "./Login";

// // // function App() {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// // //       setUser(user);
// // //     });

// // //     return () => unsubscribe();
// // //   }, []);

// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
// // //         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;
// import React from "react";
// import Home from "./Home";
// import Signup from "./Signup";
// import Login from "./Login";
// import ProtectedRoute from "./PrivateRoute";
// import { Routes, Route, Navigate } from "react-router-dom"; // ❌ No BrowserRouter here

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//     </Routes>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No BrowserRouter here
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./PrivateRoute";
import ChatWithCSV from "./ChatWithCSV";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

function App() {
  <div>hello</div>
  return (
  
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/home/*" element={<Home />} />
      
      <Route path="/chat-csv" element={<ChatWithCSV />} />
        <Route path="/visualize" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

