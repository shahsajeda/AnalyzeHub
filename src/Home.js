import React, { useState } from "react";
import axios from "axios";
import { Router, Routes, Route,useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ChatWithCSV from "./ChatWithCSV";
import Dashboard from "./Dashboard";
import "./App.css";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const  Home=()=> {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cleanedFileUrl, setCleanedFileUrl] = useState("");
  const typedRef = useRef(null);
 useEffect(() => {
      if (typedRef.current) {
          const typed = new Typed(typedRef.current, {
              strings: [
                  "welcome!!!!",
                 "✅ Transform raw data into meaningful insights with ease!",
"✅ Upload, visualize, clean, and analyze – All in one place!",
"✅ Interactive dashboards to make data storytelling effortless.",
"✅ AI-powered CSV chat – Ask questions, get smart insights!",
"✅ Detect anomalies, clean your dataset, and improve data quality in seconds.",
"✅ Seamless model training and accuracy comparison for better decision-making."
              ],
              typeSpeed: 50,
              backSpeed: 20,
              loop: true,
          });

          return () => {
              typed.destroy(); // Cleanup on unmount
          };
      }
  }, []);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || file.type !== "text/csv") {
      setMessage("Please select a valid CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setMessage("");
    setReportUrl("");
    setCleanedFileUrl("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);

      if (response.data.report_url) {
        setReportUrl(`http://127.0.0.1:5000${response.data.report_url}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanCSV = async () => {
    if (!file || file.type !== "text/csv") {
      setMessage("Please select a valid CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    setIsLoading(true);
    setMessage("");
    setCleanedFileUrl("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/clean_csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setCleanedFileUrl(url);
    } catch (error) {
      console.error(error);
      setMessage("Failed to clean file.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle report download
  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/download_report",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Quick_Review_Report.html");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download report", error);
      setMessage("Failed to download report.");
    }
  };
  return (
    
    <>
    <Navbar reportUrl={reportUrl} />
      <Routes>
        
        <Route
          path="/"
          element={
            
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "80vh",
                padding: "30px",
                textAlign: "center",
                maxWidth: "2000px",
                margin: "auto",
              }}
              
            >
              
              {/* Left Section - Content */}
              <div style={{ flex: 1 }}>
              <div>
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                  marginleft:"-10px",
                  marginRight:"100px",
                  marginTop: "-50px", // Image ko right shift karne ke liye
                }}
              >
                <img
                  src="/image_right.jpg"
                  alt="img1"
                  style={{
                    width: "180%",
                    maxWidth: "350px",
                    borderRadius: "10px",
                    // transform: "translateX(10px,300px)", // Aur thoda right shift karne ke liye
                  }}
                />
              </div>
              <div 
                style={{
                  flex: 1/2,
                
                  marginleft:"0px",
                  marginRight:"600px",
                  marginTop: "-530px",
               
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "rgb(181, 121, 236)"}}>
                    <span ref={typedRef}></span>
                
                </div>
              </div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#ffffff",
                    alignItems:"center",
                    
                    marginTop: "-200px",
                    marginLeft: "350px", // Yeh line heading ko upar shift karegi
                  }}
                >
                  AnalyzeHub
                </h1>
                
                {/* <div style={{marginLeft:"450px", fontSize:"60px"}}>
                        <input type="file" onChange={handleFileChange} 
                            style={{ marginBottom: "15px", padding: "8px", borderRadius: "5px" ,fontSize:"20px"}} 
                        /></div> */}
                <div style={{ marginLeft: "550px", fontSize: "60px" }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      marginBottom: "15px",
                      padding: "12px",
                      border: "2px solid #4facfe", // Light blue border
                      borderRadius: "8px", // Rounded corners
                      fontSize: "20px",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: "0 2px 6px rgba(79, 172, 254, 0.3)",
                      marginLeft: "-100px",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = "#00f2fe"; // Brighter blue on hover
                      e.target.style.boxShadow =
                        "0 4px 10px rgba(79, 172, 254, 0.5)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = "#4facfe";
                      e.target.style.boxShadow =
                        "0 2px 6px rgba(79, 172, 254, 0.3)";
                    }}
                  />
                </div>

                <div
                  className="btn"
                  style={{
                    width: "400px" /* Set the width */,
                    marginLeft: "480px",
                    height: "70px" /* Set the height */,
                    // backgroundColor: "lightblue" /* Just for visibility */,
                    // border: "2px solid black",
                    display: "flex" /* Optional: for layout inside the div */,
                    justifyContent: " center" /* Center content horizontally */,
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={handleUpload}
                    disabled={isLoading}
                    style={{
                      margin: "10px",
                      padding: "19px 24px",
                      fontSize: "15px",
                      marginLeft: "0px",
                      fontWeight: "bold",
                      color: "#fff",
                      background: isLoading
                        ? "#888"
                        : "linear-gradient(135deg, #4facfe, #00f2fe)",
                      border: "none",
                      borderRadius: "25px", // **More rounded corners**
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: isLoading
                        ? "none"
                        : "0 4px 10px rgba(0, 242, 254, 0.5)",
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "scale(0.8)";
                        e.target.style.boxShadow =
                          "0 6px 15px rgba(0, 242, 254, 0.6)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow =
                          "0 4px 10px rgba(0, 242, 254, 0.5)";
                      }
                    }}
                  >
                    {isLoading ? "Uploading..." : "Upload"}
                  </button>
{/* BUTTON 2 */}
                  <button
                    onClick={handleCleanCSV}
                    disabled={isLoading}
                    style={{
                      margin: "10px",
                      padding: "18px 24px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginLeft: "140px",
                      color: "#fff",
                      background: isLoading
                        ? "#888"
                        : "linear-gradient(135deg, #43e97b, #38f9d7)", // Green Gradient
                      border: "none",
                      borderRadius: "25px", // **Rounded Corners**
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: isLoading
                        ? "none"
                        : "0 4px 100px rgba(56, 249, 215, 0.5)",
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "scale(0.8)";
                        e.target.style.boxShadow =
                          "0 6px 15px rgba(56, 249, 215, 0.6)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow =
                          "0 4px 10px rgba(56, 249, 215, 0.5)";
                      }
                    }}
                  >
                    {isLoading ? "Cleaning..." : "Clean CSV"}
                  </button>
                </div>
                {/* text styling */}

                <div style={{width:"500px",height:"80px",marginLeft:"400px",marginStart:"10px",marginTop:"30px"}}>
                <p style={{ fontSize: "1.2rem", color: "#cccccc" }}>
                  {message}
                </p>

                {isLoading && (
                  <p style={{ 
                    color: "#ffcc00"
                  }}>
                    Processing file, please wait...
                  </p>
                )}

                {reportUrl && (
                  <p>
                    <a
                      href={reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "1.2rem", color: "#66ccff",marginTop:"50px"
                      }}
                    >
                      View Quick Review Report
                    </a>
                    &nbsp;|&nbsp;
                   <button
    onClick={handleDownloadReport}
    style={{
      fontSize: "15px",
      padding: "12px 24px",
      cursor: "pointer",
      marginTop: "30px",
      marginLeft:"80px",
      fontWeight: "bold",
      background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient background
      color: "white",
      border: "none",
      borderRadius: "25px", // Rounded edges
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Shadow for 3D effect
      transition: "0.3s ease-in-out",
    }}
    onMouseOver={(e) =>
      (e.target.style.background = "linear-gradient(to right, #ff512f, #dd2476)")
    } // Hover effect
    onMouseOut={(e) =>
      (e.target.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)")
    }
  >
    Download Report
  </button>
                  </p>
                )}
                {cleanedFileUrl && (
                  <p style={{margin:"30px"}}>
                    <a
                      href={cleanedFileUrl}
                      download="cleaned_file.csv"
                      style={{ fontSize: "1.2rem", color: "#66ff99" }}
                    >
                      Download Cleaned CSV
                    </a>
                  </p>
                )}
              </div>
              </div>

              {/* Right Section - Image */}
              <div
                style={{
                  flex: 1/2,
                  
                  marginRight: "0px",
                  marginTop: "-150px",
                  display:"flex",
                  justifyContent: "center",
                  // Image ko right shift karne ke liye
                }}
              >
                <img
                  src="/img12.png"
                  alt="img1"
                  style={{
                    marginLeft:"300px",
                    width: "180%",
                    maxWidth: "400px",
                    borderRadius: "0px",
                    transform: "translateX(0px,0px)", // Aur thoda right shift karne ke liye
                  }}
                />
              </div>
              <div
              style={{
                  flex: 1/2,
                  
                  marginRight: "0px",
                  marginTop: "-150px",
                  display:"flex",
                  justifyContent: "center",
                  // Image ko right shift karne ke liye
                }}></div>
              
              {/* <div>
      <h2>Welcome to Home</h2>
      <button onClick={handleLogout}>Logout</button>
    </div> */}
            </div>
            
            
          }
          
          
        />

        <Route path="/chat-csv" element={<ChatWithCSV />} />
        <Route path="/visualize" element={<Dashboard />} />
      </Routes>
    </>
  );
}
export default Home;
